import { NextResponse } from "next/server";
import { registerUserSchema } from "@/lib/user-validation";
import { randomBytes } from "crypto";
import prisma from "@/lib/prisma";
import { addMinutes } from "date-fns";
import { sendActivationEmail } from "@/lib/notification-service";
import { hashPassword } from "@/lib/validation-utils";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const parseResult = registerUserSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json({ message: parseResult.error.errors.map((e: { message: string }) => e.message).join(", ") }, { status: 400 });
    }
    const { name, email, password, isCreator } = parseResult.data;
    
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ message: "Esse email já está cadastrado." }, { status: 400 });
    }
    
    // Cria o usuário imediatamente
    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        isCreator: !!isCreator,
        // Se estiver em desenvolvimento, já marca o email como verificado
        emailVerified: process.env.NODE_ENV === "development" ? new Date() : null,
        accounts: {
          create: {
            type: "credentials",
            provider: "credentials",
            providerAccountId: email,
          },
        },
      },
    });

    // Se estiver em desenvolvimento, retorna sucesso imediatamente
    if (process.env.NODE_ENV === "development") {
      return NextResponse.json({ 
        message: "Conta criada com sucesso! Em ambiente de desenvolvimento, a ativação é automática.",
        redirectTo: "/login"
      }, { status: 200 });
    }

    // Em produção, continua com o fluxo normal de ativação
    const token = randomBytes(32).toString("hex");
    const expires = addMinutes(new Date(), 30); // 30 minutos de validade
    await prisma.verificationToken.create({
      data: {
        identifier: email,
        token,
        expires,
      },
    });
    
    await sendActivationEmail({
      email,
      name,
      token,
    });
    
    return NextResponse.json({ message: "Enviamos um link de ativação para sua caixa de entrada." }, { status: 200 });
  } catch (error) {
    console.error("Erro ao solicitar ativação:", error);
    return NextResponse.json({ message: "Erro interno do servidor." }, { status: 500 });
  }
}

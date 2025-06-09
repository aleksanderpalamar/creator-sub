import { NextResponse } from "next/server";
import { registerUserSchema } from "@/lib/user-validation";
import { randomBytes } from "crypto";
import prisma from "@/lib/prisma";
import { addMinutes } from "date-fns";
import { sendActivationEmail } from "@/lib/notification-service";

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

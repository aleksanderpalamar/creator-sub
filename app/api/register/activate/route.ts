import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hashPassword } from "@/lib/validation-utils";

export async function POST(request: Request) {
  try {
    const { token, password, name, isCreator } = await request.json();
    
    const verification = await prisma.verificationToken.findUnique({ where: { token } });
    if (!verification || verification.expires < new Date()) {
      return NextResponse.json({ message: "Token inválido ou expirado." }, { status: 400 });
    }
    
    const existingUser = await prisma.user.findUnique({ where: { email: verification.identifier } });
    if (existingUser) {
      return NextResponse.json({ message: "Esse email já está cadastrado." }, { status: 400 });
    }
    
    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        name,
        email: verification.identifier,
        password: hashedPassword,
        isCreator: !!isCreator,
        emailVerified: new Date(),
        accounts: {
          create: {
            type: "credentials",
            provider: "credentials",
            providerAccountId: verification.identifier,
          },
        },
      },
    });
    // Remove o token
    await prisma.verificationToken.delete({ where: { token } });
    return NextResponse.json({ message: "Conta ativada com sucesso.", userId: user.id }, { status: 201 });
  } catch (error) {
    console.error("Erro ao ativar conta:", error);
    return NextResponse.json({ message: "Erro interno do servidor." }, { status: 500 });
  }
}

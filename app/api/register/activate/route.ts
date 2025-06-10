import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { token } = await request.json();
    
    const verification = await prisma.verificationToken.findUnique({ where: { token } });
    if (!verification || verification.expires < new Date()) {
      return NextResponse.json({ message: "Token inválido ou expirado." }, { status: 400 });
    }
    
    const existingUser = await prisma.user.findUnique({ where: { email: verification.identifier } });
    if (!existingUser) {
      return NextResponse.json({ message: "Usuário não encontrado." }, { status: 400 });
    }

    // Atualiza o usuário como verificado
    await prisma.user.update({
      where: { email: verification.identifier },
      data: { emailVerified: new Date() },
    });

    // Remove o token
    await prisma.verificationToken.delete({ where: { token } });
    
    return NextResponse.json({ message: "Conta ativada com sucesso." }, { status: 200 });
  } catch (error) {
    console.error("Erro ao ativar conta:", error);
    return NextResponse.json({ message: "Erro interno do servidor." }, { status: 500 });
  }
}

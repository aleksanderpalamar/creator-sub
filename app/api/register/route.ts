import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, password, isCreator } = body;

        if (!name || !email || !password) {
            return NextResponse.json({ message: "Por favor preencha todos os campos." }, { status: 400 });
        }

        const existingUser = await prisma.user.findUnique({
            where: {
                email,
            },
        })

        if (existingUser) {
            return NextResponse.json({ message: "Esse email já está cadastrado." }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                isCreator: isCreator || false,
            },
        })

        const { password: _, ...userWithoutPassword } = user;

        return NextResponse.json(
        {
            user: userWithoutPassword,
            message: "Usuário criado com sucesso.",
        },
        { status: 201 }
    )
    } catch (error) {
        console.error("Erro ao registrar usuário:", error);
        return NextResponse.json({ message: "Erro interno do servidor." }, { status: 500 });
    }
}
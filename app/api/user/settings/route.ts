import prisma from "@/lib/prisma";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
    try {
        const session = await getServerSession(authOptions)

        if (!session || !session.user) {
            return NextResponse.json({ message: "Nao autorizado" }, { status: 401 });
        }

        const body = await request.json()
        const { pixKey, pixKeytype, isCreator } = body

        const updatedUser = await prisma.user.update({
            where: {
                id: session.user.id
            },
            data: {
                pixKey,
                pixKeyType: pixKeytype,
                isCreator
            },
        })

        const { password: _, ...userWithoutPassword } = updatedUser

        return NextResponse.json(
            {
                user: userWithoutPassword,
                message: "Configurações atualizadas com sucesso.",
            },
            { status: 200 }
        )
    } catch (error) {
        console.error("Erro ao atualizar configurações:", error)
        return NextResponse.json({ message: "Erro interno do servidor" }, { status: 500 })
    }
}
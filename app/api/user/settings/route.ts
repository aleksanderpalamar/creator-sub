import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { validatePixKey } from "@/lib/pix"
import type { PixKeyType } from "@/lib/pix"
import { authOptions } from "@/utils/authOptions"
import prisma from "@/lib/prisma"

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json({ message: "Não autorizado" }, { status: 401 })
    }

    const body = await request.json()
    const { pixKey, pixKeyType, isCreator } = body

    // Validar dados do Pix quando o usuário é criador
    if (isCreator) {
      if (!pixKey || !pixKeyType) {
        return NextResponse.json(
          {
            message: "Chave Pix e tipo são obrigatórios para criadores",
          },
          { status: 400 },
        )
      }

      // Validar a chave Pix com base no tipo
      if (!validatePixKey(pixKey, pixKeyType as PixKeyType)) {
        return NextResponse.json(
          {
            message: `Chave Pix inválida para o tipo ${pixKeyType}`,
          },
          { status: 400 },
        )
      }
    }

    // Atualizar o usuário
    const updatedUser = await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        pixKey,
        pixKeyType,
        isCreator,
      },
    })

    // Remover a senha do objeto retornado
    const { password: _, ...userWithoutPassword } = updatedUser

    return NextResponse.json(
      {
        user: userWithoutPassword,
        message: "Configurações atualizadas com sucesso",
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Erro ao atualizar configurações:", error)
    return NextResponse.json({ message: "Erro interno do servidor" }, { status: 500 })
  }
}
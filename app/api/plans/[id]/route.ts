import prisma from "@/lib/prisma";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
      const session = await getServerSession(authOptions)
  
      if (!session || !session.user) {
        return NextResponse.json({ message: "Não autorizado" }, { status: 401 })
      }
  
      const plan = await prisma.subscriptionPlan.findUnique({
        where: {
          id: params.id,
        },
      })
  
      if (!plan) {
        return NextResponse.json({ message: "Assinatura não encontrado" }, { status: 404 })
      }
  
      return NextResponse.json({ plan }, { status: 200 })
    } catch (error) {
      console.error("Erro ao buscar plano:", error)
      return NextResponse.json({ message: "Erro interno do servidor" }, { status: 500 })
    }
  }

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return NextResponse.json({ message: "Nao autorizado" }, { status: 401 });
        }

        const plan = await prisma.subscriptionPlan.findUnique({
            where: {
                id: params.id,
            },
        })

        if (!plan) {
            return NextResponse.json({ message: "Assinatura nao encontrado" }, { status: 404 });
        }

        if (plan.creatorId !== session.user.id) {
            return NextResponse.json({ message: "Você não tem permissão para editar essa assinatura" }, { status: 403 });
        }

        const body = await request.json()
        const { name, description, price, benefits } = body

        if (!name || price) {
            return NextResponse.json({ message: "Nome e preco sao obrigatorios." }, { status: 400 });
        }

        const updatePlan = await prisma.subscriptionPlan.update({
            where: {
                id: params.id,
            },
            data: {
                name,
                description,
                price,
                benefits
            },
        })

        return NextResponse.json(
            {
                plan: updatePlan,
                message: "Assinatura atualizada com sucesso",
            },
            { status: 200 }
        )
    } catch (error) {
        console.error("Erro ao atualizar plano:", error)
        return NextResponse.json({ message: "Erro interno do servidor" }, { status: 500 })
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        const session = await getServerSession(authOptions)

        if (!session || !session.user) {
            return NextResponse.json({ message: "Nao autorizado" }, { status: 401 });
        }

        const plan = await prisma.subscriptionPlan.findUnique({
            where: {
                id: params.id,
            },
        })

        if (!plan) {
            return NextResponse.json({ message: "Assinatura nao encontrada" }, { status: 404 });
        }

        if (plan.creatorId !== session.user.id) {
            return NextResponse.json({ message: "Voce nao tem permissao para deletar essa assinatura" }, { status: 403 });
        }

        await prisma.subscriptionPlan.delete({
            where: {
                id: params.id
            },
        })

        return NextResponse.json(
            {
                message: "Assinatura deletada com sucesso",
            },
            { status: 200 }
        )
    } catch (error) {
        console.error("Erro ao deletar plano:", error)
        return NextResponse.json({ message: "Erro interno do servidor" }, { status: 500 })
    }
}

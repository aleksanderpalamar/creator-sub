import prisma from "@/lib/prisma";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request: Request, { params }: { params: { id: string }}) {
    try {
        const session = await getServerSession(authOptions)

        if (!session || !session.user) {
            return NextResponse.json({ message: "Nao autorizado" }, { status: 401 });
        }

        const subscription = await prisma.subscription.findUnique({
            where: {
                id: params.id
            },
        })

        if (!subscription) {
            return NextResponse.json({ message: "Assinatura nao encontrada" }, { status: 404 });
        }

        if (subscription.creatorId !== session.user.id) {
            return NextResponse.json({ message: "Voce nao tem permissão para cancelar essa assinatura" }, { status: 403 });
        }

        const updatedSubscription = await prisma.subscription.update({
            where: {
                id: params.id
            },
            data: {
                status: "cancelled",
                endDate: new Date()
            },
        })

        return NextResponse.json(
            {
                subscription: updatedSubscription,
                message: "Assinatura cancelada com sucesso"
            },
            { status: 200 }
        )
    } catch (error) {
        console.error("Erro ao cancelar assinatura:", error)
        return NextResponse.json({ message: "Erro interno do servidor" }, { status: 500 });
    }
}
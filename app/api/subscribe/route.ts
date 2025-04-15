import { generatePixCode } from "@/lib/pix";
import prisma from "@/lib/prisma";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions)

        if (!session || !session.user) {
            return NextResponse.json({ message: "Nao autorizado" }, { status: 401 });
        }

        const body = await request.json()
        const { creatorId, planId } = body

        if (!creatorId || !planId) {
            return NextResponse.json({ message: "Dados incompletos" }, { status: 400 });
        }

        const plan = await prisma.subscriptionPlan.findUnique({
            where: {
                id: planId,
                creatorId,
            }
        })

        if (!plan) {
            return NextResponse.json({ message: "Assinatura nao encontrada" }, { status: 404 });
        }

        const existingSubscription = await prisma.subscription.findFirst({
            where: {
                subscriberId: session.user.id,
                creatorId,
                status: "active",
            }
        })

        if (existingSubscription) {
            return NextResponse.json({ message: "Você já tem uma assinatura ativa para este criador"}, { status: 400 });
        }

        const pixExpiration = new Date()
        pixExpiration.setMonth(pixExpiration.getMonth() + 1)

        const pixCode = generatePixCode(plan.price)

        const subscription = await prisma.subscription.create({
            data: {
                subscriberId: session.user.id,
                creatorId,
                subscriptionPlanId: planId,
                status: "pending",
                nextPaymentDate: new Date(new Date().setMonth(new Date().getMonth() + 1))
            },
        })

        const payment = await prisma.payment.create({
            data: {
                subscriptionId: subscription.id,
                amount: plan.price,
                status: "pending",
                paymentMethod: "pix",
                pixCode,
                pixExpiration,
            },
        })

        return NextResponse.json(
            {
                subscription,
                payment,
                message: "Assinatura criada com sucesso"
            }
        )
    } catch (error) {
        console.error("Erro ao criar assinatura:", error)
        return NextResponse.json({ message: "Erro interno do servidor" }, { status: 500 })
    }
}
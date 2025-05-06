import { notifySubscription } from "@/lib/notification-service";
import { checkPixPaymentStatus } from "@/lib/pix";
import prisma from "@/lib/prisma";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ message: "Nao autorizado" }, { status: 401 });
    }

    const body = await request.json();
    const { paymentId } = body;

    if (!paymentId) {
      return NextResponse.json(
        { message: "ID do pagamento é obrigatório" },
        { status: 400 }
      );
    }

    // Buscar o pagamento
    const payment = await prisma.payment.findUnique({
      where: {
        id: paymentId,
      },
      include: {
        subscription: {
          include: {
            subscriber: true,
            subscriptionPlan: true,
          },
        },
      },
    });

    if (!payment) {
      return NextResponse.json(
        { message: "Pagamento nao encontrado" },
        { status: 404 }
      );
    }

    if (payment.subscription.subscriberId !== session.user.id) {
      return NextResponse.json({ message: "Nao autorizado" }, { status: 401 });
    }

    const paymentStatus = await checkPixPaymentStatus(payment.externalId || "");

    let newPaymentStatus = payment.status;
    let newSubscriptionStatus = payment.subscription.status;

    if (paymentStatus === "approved") {
      newPaymentStatus = "completed";
      newSubscriptionStatus = "active";
    } else if (paymentStatus === "rejected") {
      newPaymentStatus = "failed";
      newSubscriptionStatus = "cancelled";
    }

    const updatedPayment = await prisma.payment.update({
      where: {
        id: payment.id,
      },
      data: {
        status: newPaymentStatus,
      },
    });

    // Atualizar a assinatura se o status mudou
    if (newSubscriptionStatus !== payment.subscription.status) {
      await prisma.subscription.update({
        where: {
          id: payment.subscription.id,
        },
        data: {
          status: newSubscriptionStatus,
          ...(newSubscriptionStatus === "active" && {
            startDate: new Date(),
            lastPaymentDate: new Date(),
          }),
        },
      });

      // Se o pagamento foi aprovado, enviar notificação para o overlay
      if (paymentStatus === "approved") {
        await notifySubscription(payment.subscription.creatorId, {
          subscribe: {
            name: payment.subscription.subscriber.name,
          },
        });
      }
    }

    return NextResponse.json(
      {
        status: paymentStatus,
        payment: updatedPayment,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao verificar status do pagamento:", error);
    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

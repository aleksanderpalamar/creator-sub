import prisma from "@/lib/prisma";
import MercadoPagoConfig, { Payment } from "mercadopago";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (body.type === "payment") {
      return NextResponse.json({ message: "Evento ignorado" }, { status: 200 });
    }

    const paymentId = body.data.id;

    const client = new MercadoPagoConfig({
      accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN as string,
    });

    const paymentApi = new Payment(client);
    const paymentDetails = await paymentApi.get({ id: paymentId });

    const payment = await prisma.payment.findFirst({
      where: {
        externalId: paymentId.toString(),
      },
      include: {
        subscription: true,
      },
    });

    if (!payment) {
      return NextResponse.json(
        { message: "Pagamento nao encontrado" },
        { status: 404 }
      );
    }

    let newPaymentStatus = paymentDetails.status;
    let newSubscriptionStatus = payment.subscription.status;

    if (paymentDetails.status === "approved") {
      newPaymentStatus = "completed";
      newSubscriptionStatus = "active";
    } else if (
      paymentDetails.status === "rejected" ||
      paymentDetails.status === "cancelled"
    ) {
      newPaymentStatus = "failed";
      newSubscriptionStatus = "cancelled";
    }

    await prisma.payment.update({
      where: {
        id: payment.id,
      },
      data: {
        status: newPaymentStatus,
      },
    });

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
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Erro ao verificar status do pagamento:", error);
    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

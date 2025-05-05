import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import prisma from "@/lib/prisma";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
    }

    // Aguardar explicitamente os parâmetros antes de acessá-los
    const resolvedParams = await params;
    const id = resolvedParams.id;

    const subscription = await prisma.subscription.findUnique({
      where: {
        id,
      },
    });

    if (!subscription) {
      return NextResponse.json(
        { message: "Assinatura não encontrada" },
        { status: 404 }
      );
    }

    if (subscription.subscriberId !== session.user.id) {
      return NextResponse.json(
        { message: "Você não tem permissão para cancelar esta assinatura" },
        { status: 403 }
      );
    }

    // Atualizar a assinatura para cancelada
    const updatedSubscription = await prisma.subscription.update({
      where: {
        id,
      },
      data: {
        status: "cancelled",
        endDate: new Date(),
      },
    });

    return NextResponse.json(
      {
        subscription: updatedSubscription,
        message: "Assinatura cancelada com sucesso",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao cancelar assinatura:", error);
    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

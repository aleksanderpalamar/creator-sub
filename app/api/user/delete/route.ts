import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import prisma from "@/lib/prisma";

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
    }

    // Excluir todas as informações relacionadas ao usuário
    await prisma.$transaction([
      // Excluir assinaturas
      prisma.subscription.deleteMany({
        where: {
          OR: [
            { subscriberId: session.user.id },
            { creatorId: session.user.id },
          ],
        },
      }),
      // Excluir planos
      prisma.subscriptionPlan.deleteMany({
        where: { creatorId: session.user.id },
      }),
      // Excluir configurações de overlay
      prisma.overlayConfig.deleteMany({
        where: { creatorId: session.user.id },
      }),
      // Excluir contas vinculadas
      prisma.account.deleteMany({
        where: { userId: session.user.id },
      }),
      // Excluir sessões
      prisma.session.deleteMany({
        where: { userId: session.user.id },
      }),
      // Excluir tokens de verificação
      prisma.verificationToken.deleteMany({
        where: { 
          identifier: session.user.email || '' 
        },
      }),
      // Por fim, excluir o usuário
      prisma.user.delete({
        where: { id: session.user.id },
      }),
    ]);

    return NextResponse.json(
      { message: "Conta excluída com sucesso" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao excluir conta:", error);
    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

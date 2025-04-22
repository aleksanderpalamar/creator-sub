import prisma from "@/lib/prisma";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return new Response("Não autorizado", { status: 401 });
    }

    if (!session.user.isCreator) {
      return NextResponse.json(
        { message: "Apenas criadores podem criar assinaturas." },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { name, description, price, benefits } = body;

    if (!name || !price) {
      return NextResponse.json(
        { message: "Nome e preço são obrigatórios." },
        { status: 400 }
      );
    }

    const plan = await prisma.subscriptionPlan.create({
      data: {
        name,
        description,
        price,
        benefits,
        creatorId: session.user.id,
      },
    });

    return NextResponse.json(
      {
        plan,
        message: "Assinatura criada com sucesso.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("Erro ao criar assinatura:", error);
    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

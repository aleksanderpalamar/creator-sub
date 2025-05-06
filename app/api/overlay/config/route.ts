import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "@/utils/authOptions";

// Endpoint para obter configurações do overlay
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const creatorId = searchParams.get("creatorId");

    if (!creatorId) {
      return NextResponse.json(
        { message: "ID do criador é obrigatório" },
        { status: 400 }
      );
    }

    // Buscar configurações do overlay
    const overlayConfig = await prisma.overlayConfig.findUnique({
      where: {
        creatorId,
      },
    });

    if (!overlayConfig) {
      return NextResponse.json({ config: null }, { status: 200 });
    }

    return NextResponse.json({ config: overlayConfig.config }, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar configurações do overlay:", error);
    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

// Endpoint para salvar configurações do overlay
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
    }

    const body = await request.json();
    const { creatorId, config } = body;

    if (creatorId !== session.user.id) {
      return NextResponse.json({ message: "Não autorizado" }, { status: 403 });
    }

    // Atualizar ou criar configurações do overlay
    const overlayConfig = await prisma.overlayConfig.upsert({
      where: {
        creatorId,
      },
      update: {
        config,
      },
      create: {
        creatorId,
        config,
      },
    });

    return NextResponse.json({ config: overlayConfig.config }, { status: 200 });
  } catch (error) {
    console.error("Erro ao salvar configurações do overlay:", error);
    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

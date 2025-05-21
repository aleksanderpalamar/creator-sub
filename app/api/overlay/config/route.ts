import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { overlayConfigSchema } from "@/lib/overlay-config-validation";
import { OverlayConfigRepository } from "@/lib/overlay-config-repository";
import { OverlayConfigService } from "@/lib/overlay-config-service";
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
    const overlayConfigRepository = new OverlayConfigRepository();
    const overlayConfigService = new OverlayConfigService(overlayConfigRepository);
    const overlayConfig = await overlayConfigService.getConfig(creatorId);
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
    // Validação com Zod
    const parseResult = overlayConfigSchema.safeParse({ ...body, creatorId: session.user.id });
    if (!parseResult.success) {
      return NextResponse.json({ message: parseResult.error.errors.map((e: { message: string }) => e.message).join(", ") }, { status: 400 });
    }
    if (parseResult.data.creatorId !== session.user.id) {
      return NextResponse.json({ message: "Não autorizado" }, { status: 403 });
    }
    const overlayConfigRepository = new OverlayConfigRepository();
    const overlayConfigService = new OverlayConfigService(overlayConfigRepository);
    const overlayConfig = await overlayConfigService.saveConfig(
      parseResult.data.creatorId,
      parseResult.data.config
    );
    return NextResponse.json({ config: overlayConfig.config }, { status: 200 });
  } catch (error) {
    console.error("Erro ao salvar configurações do overlay:", error);
    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

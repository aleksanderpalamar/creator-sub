import { createPlanSchema } from "@/lib/plan-validation";
import { PlanRepository } from "@/lib/plan-repository";
import { PlanService } from "@/lib/plan-service";
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

    // Validação com Zod
    const parseResult = createPlanSchema.safeParse({
      ...body,
      price: Number(body.price), // Garante que price é number
    });

    if (!parseResult.success) {
      return NextResponse.json(
        { message: parseResult.error.errors.map((e: { message: string }) => e.message).join(", ") },
        { status: 400 }
      );
    }

    // Injeção de dependência
    const planRepository = new PlanRepository();
    const planService = new PlanService(planRepository);
    const plan = await planService.createPlan({
      ...parseResult.data,
      creatorId: session.user.id,
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

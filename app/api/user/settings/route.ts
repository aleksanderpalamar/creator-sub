import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { userSettingsSchema } from "@/lib/user-settings-validation";
import { UserSettingsRepository } from "@/lib/user-settings-repository";
import { UserSettingsService } from "@/lib/user-settings-service";

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
    }

    const body = await request.json();

    // Validação com Zod
    const parseResult = userSettingsSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        {
          message: parseResult.error.errors
            .map((e: { message: string }) => e.message)
            .join(", "),
        },
        { status: 400 }
      );
    }

    const userSettingsRepository = new UserSettingsRepository();
    const userSettingsService = new UserSettingsService(userSettingsRepository);

    // Atualizar configurações do usuário
    const updatedUser = await userSettingsService.updateUserSettings(
      session.user.id,
      parseResult.data
    );

    // Remover a senha do objeto retornado
    const { password: _, ...userWithoutPassword } = updatedUser;

    return NextResponse.json(
      {
        user: userWithoutPassword,
        message: "Configurações atualizadas com sucesso",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao atualizar configurações:", error);
    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { registerUserSchema } from "@/lib/user-validation";
import { UserRepository } from "@/lib/user-repository";
import { UserService } from "@/lib/user-service";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        // Validação com Zod
        const parseResult = registerUserSchema.safeParse(body);
        if (!parseResult.success) {
            return NextResponse.json({ message: parseResult.error.errors.map((e: { message: string }) => e.message).join(", ") }, { status: 400 });
        }
        // Injeção de dependência
        const userRepository = new UserRepository();
        const userService = new UserService(userRepository);
        try {
            const user = await userService.registerUser({
                ...parseResult.data,
                isCreator: !!parseResult.data.isCreator,
            });
            return NextResponse.json({
                user,
                message: "Usuário criado com sucesso.",
            }, { status: 201 });
        } catch (serviceError: any) {
            return NextResponse.json({ message: serviceError.message }, { status: 400 });
        }
    } catch (error) {
        console.error("Erro ao registrar usuário:", error);
        return NextResponse.json({ message: "Erro interno do servidor." }, { status: 500 });
    }
}
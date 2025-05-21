import { z } from "zod";

export const registerUserSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  password: z.string().min(8, "Senha deve ter pelo menos 8 caracteres"),
  isCreator: z.boolean().optional(),
});

export type RegisterUserInput = z.infer<typeof registerUserSchema>;

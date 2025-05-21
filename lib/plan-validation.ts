import { z } from "zod";

export const createPlanSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  description: z.string().optional(),
  price: z.number().positive("Preço deve ser positivo"),
  benefits: z.array(z.string()).optional(),
});

export type CreatePlanInput = z.infer<typeof createPlanSchema>;

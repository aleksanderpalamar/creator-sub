import { z } from "zod";

export const overlayConfigSchema = z.object({
  creatorId: z.string().min(1, "ID do criador é obrigatório"),
  config: z.record(z.any()), // Ajuste conforme a estrutura real do config
});

export type OverlayConfigInput = z.infer<typeof overlayConfigSchema>;

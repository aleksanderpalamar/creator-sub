import { z } from "zod";
import { isValidPixKey } from "@/lib/validation-utils";

export const userSettingsSchema = z.object({
  pixKey: z.string().optional(),
  pixKeyType: z.string().optional(),
  isCreator: z.boolean(),
}).superRefine((data, ctx) => {
  if (data.isCreator) {
    if (!data.pixKey || !data.pixKeyType) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Chave Pix e tipo são obrigatórios para criadores",
        path: ["pixKey", "pixKeyType"],
      });
    } else if (!isValidPixKey(data.pixKey, data.pixKeyType as any)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Chave Pix inválida para o tipo ${data.pixKeyType}`,
        path: ["pixKey"],
      });
    }
  }
});

export type UserSettingsInput = z.infer<typeof userSettingsSchema>;

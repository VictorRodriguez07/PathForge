import { z } from "zod";

export const runCodeSchema = z.object({
  code: z.string().min(1, "El código no puede estar vacío").max(10000, "El código es demasiado largo"),
  language: z.enum(["javascript", "typescript", "python"]),
});

export const submitCodeSchema = z.object({
  code: z.string().min(1, "El código no puede estar vacío").max(10000, "El código es demasiado largo"),
  language: z.enum(["javascript", "typescript", "python", "java"]),
});

export type SupportedRunLanguage = z.infer<typeof runCodeSchema>["language"];
export type SupportedSubmitLanguage = z.infer<typeof submitCodeSchema>["language"];
export type RunCodeInput = z.infer<typeof runCodeSchema>;
export type SubmitCodeInput = z.infer<typeof submitCodeSchema>;
import { z } from 'zod';

export const enrollPathSchema = z.object({
  weeklyHours: z.number().int().min(1).max(40).optional().default(10),
});

export const completeModuleSchema = z.object({
  notes: z.string().max(1000).optional(),
});

export type EnrollPathInput = z.infer<typeof enrollPathSchema>;
export type CompleteModuleInput = z.infer<typeof completeModuleSchema>;
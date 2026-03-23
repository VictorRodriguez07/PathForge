import { z } from "zod";

export const customPathSchema = z.object({
  subjectSlug: z.enum([
    "javascript",
    "typescript",
    "react",
    "nodejs",
    "python",
    "aws",
  ]),
  currentLevel: z.enum(["none", "beginner", "intermediate", "advanced"]),
  objective: z.enum([
    "get_job",
    "personal_project",
    "certification",
    "specialize",
    "improve_job",
  ]),
  weeklyHours: z.number().int().min(5).max(40),
  masteredConcepts: z.array(z.string()).optional().default([]),
});

export type CustomPathInput = z.infer<typeof customPathSchema>;

export const confirmCustomPathSchema = z.object({
  input: customPathSchema,
  generatedPath: z.object({
    title: z.string(),
    description: z.string(),
    estimatedMonths: z.number(),
    weeklyHours: z.number(),
    totalModules: z.number(),
    skippedModules: z.number(),
    modules: z.array(
      z.object({
        moduleId: z.string(),
        title: z.string(),
        orderIndex: z.number(),
        durationDays: z.number(),
        concepts: z.array(z.string()),
        isNew: z.boolean(),
      })
    ),
    subjectId: z.string(),
    level: z.string(),
    goal: z.string(),
  }),
});

export type ConfirmCustomPathInput = z.infer<typeof confirmCustomPathSchema>;
import { z } from "zod";

//experiencia previa en programación
export const experienceLevel = z.enum([
  "none",
  "beginner",
  "intermediate",
  "advanced",
]);

//tecnologías conocidas
export const knownTechnologies = z.enum([
  "html_css",
  "javascript",
  "typescript",
  "python",
  "java",
  "csharp",
  "php",
  "ruby",
  "go",
  "rust",
  "sql",
  "nosql",
  "react",
  "vue",
  "angular",
  "node",
  "django",
  "spring",
  "docker",
  "kubernetes",
  "aws",
  "azure",
  "gcp",
  "git",
  "linux",
]);

export const projectType = z.enum([
  "web_apps",
  "mobile_apps",
  "apis",
  "data_analysis",
  "automation",
  "infrastructure",
  "games",
  "ai_ml",
]);

export const workPreference = z.enum([
  "visual",
  "logical",
  "infrastructure",
  "data",
  "security",
]);

export const objective = z.enum([
  "first_job",
  "career_change",
  "specialize",
  "freelance",
]);

export const industry = z.enum([
  "web",
  "mobile",
  "data",
  "cloud",
  "security",
  "gaming",
  "fintech",
  "healthtech",
]);

export const careerDiscoverySchema = z.object({
  experienceLevel: experienceLevel,
  knownTechnologies: z.array(knownTechnologies).min(0).max(25),
  projectTypes: z.array(projectType).min(1, "Selecciona al menos un tipo de proyecto"),
  workPreference: workPreference,
  weeklyHours: z.number().int().min(1).max(80),
  objective: objective,
  industries: z.array(industry).min(1, "Selecciona al menos una industria"),
  openToRemote: z.boolean(),
});
export type KnownTechnology = z.infer<typeof knownTechnologies>;
export type CareerDiscoveryInput = z.infer<typeof careerDiscoverySchema>;
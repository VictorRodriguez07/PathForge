import { CareerDiscoveryInput, KnownTechnology } from "../schemas/career.schema";
import { CAREER_PROFILES } from "../shared/career-profiles.constants";

// En estos tipos se definen las carreras disponibles.
export type CareerSlug =
  | "frontend"
  | "backend"
  | "fullstack"
  | "devops"
  | "data_science"
  | "mobile"
  | "cybersecurity"
  | "qa";

// GapItem representa una tecnología que le falta al usuario aprender.
// slug: para hacer matching con PathTemplate.subject.slug
// label: para mostrar al usuario en la UI
export interface GapItem {
  slug: string;
  label: string;
}

// CareerRecommendation es el tipo que se devuelve al usuario con la recomendación de carrera.
export interface CareerRecommendation {
  career: CareerSlug;
  title: string;
  score: number;
  compatibility: number;
  reasoning: string[];
  gapAnalysis: GapItem[]; // ← cambio: era string[], ahora GapItem[]
  estimatedMonths: number;
  marketDemand: "very_high" | "high" | "medium" | "low";
  averageSalary: string;
  remoteOpportunities: "excellent" | "good" | "moderate" | "limited";
}

// CareerProfile es el tipo que representa la información de cada carrera.
export interface CareerProfile {
  title: string;
  relatedTechnologies: string[];
  relatedProjects: string[];
  relatedIndustries: string[];
  relatedPreferences: string[];
  marketDemand: "very_high" | "high" | "medium" | "low";
  averageSalary: string;
  remoteOpportunities: "excellent" | "good" | "moderate" | "limited";
  baseMonthsToLearn: Record<string, number>;
  requiredTechnologies: string[];
}

// Mapa centralizado de slugs a labels — usado tanto en gapAnalysis como en el roadmap
export const TECH_LABELS: Record<string, string> = {
  html_css: "HTML y CSS",
  javascript: "JavaScript",
  typescript: "TypeScript",
  python: "Python",
  sql: "SQL y bases de datos relacionales",
  node: "Node.js",
  react: "React",
  docker: "Docker y contenedores",
  linux: "Linux y línea de comandos",
  aws: "AWS y servicios cloud",
  git: "Git y control de versiones",
};

// Esta función asigna pesos a cada criterio según el objetivo del usuario.
function getObjectiveWeights(objective: CareerDiscoveryInput["objective"]): Record<string, number> {
  switch (objective) {
    case "first_job":
      return { marketDemand: 2.0, technologies: 1.0, projects: 1.5, time: 2.0 };
    case "career_change":
      return { marketDemand: 1.5, technologies: 2.0, projects: 1.5, time: 1.0 };
    case "specialize":
      return { marketDemand: 1.0, technologies: 2.5, projects: 2.0, time: 0.5 };
    case "freelance":
      return { marketDemand: 1.5, technologies: 1.5, projects: 2.0, time: 1.0 };
  }
}

function scoreMarketDemand(demand: CareerProfile["marketDemand"]): number {
  const scores: Record<CareerProfile["marketDemand"], number> = {
    very_high: 25,
    high: 18,
    medium: 10,
    low: 5,
  };
  return scores[demand];
}

function scoreTechnologies(userTechs: string[], careerTechs: string[]): number {
  if (careerTechs.length === 0) return 0;
  const matches = userTechs.filter((t) => careerTechs.includes(t)).length;
  return Math.round((matches / careerTechs.length) * 25);
}

function scoreProjects(userProjects: string[], careerProjects: string[]): number {
  if (careerProjects.length === 0) return 0;
  const matches = userProjects.filter((p) => careerProjects.includes(p)).length;
  return Math.round((matches / careerProjects.length) * 20);
}

function scorePreference(userPreference: string, careerPreferences: string[]): number {
  return careerPreferences.includes(userPreference) ? 15 : 0;
}

function scoreIndustry(userIndustries: string[], careerIndustries: string[]): number {
  if (careerIndustries.length === 0) return 0;
  const matches = userIndustries.filter((i) => careerIndustries.includes(i)).length;
  return Math.round((matches / careerIndustries.length) * 15);
}

function calculateEstimatedMonths(baseMonths: number, weeklyHours: number): number {
  const STANDARD_WEEKLY_HOURS = 20;
  const factor = STANDARD_WEEKLY_HOURS / weeklyHours;
  return Math.round(baseMonths * factor);
}

function generateReasoning(career: CareerProfile, input: CareerDiscoveryInput): string[] {
  const reasons: string[] = [];

  const techMatches = input.knownTechnologies.filter((t) =>
    career.relatedTechnologies.includes(t)
  );
  if (techMatches.length > 0) {
    reasons.push(`Ya conoces ${techMatches.length} tecnología(s) clave para esta carrera`);
  }

  if (career.relatedPreferences.includes(input.workPreference)) {
    reasons.push("Tu preferencia de trabajo se alinea perfectamente con esta carrera");
  }

  const industryMatches = input.industries.filter((i) =>
    career.relatedIndustries.includes(i)
  );
  if (industryMatches.length > 0) {
    reasons.push("Tiene alta demanda en las industrias que te interesan");
  }

  if (career.marketDemand === "very_high") {
    reasons.push("Es una de las carreras con mayor demanda laboral actualmente");
  }

  if (input.openToRemote && career.remoteOpportunities === "excellent") {
    reasons.push("Excelentes oportunidades de trabajo remoto e internacional");
  }

  if (input.objective === "first_job" && career.marketDemand === "very_high") {
    reasons.push("Alta probabilidad de conseguir empleo rápidamente");
  }

  return reasons.length > 0 ? reasons : ["Compatible con tu perfil general"];
}

// Genera el gap analysis con slug + label para cada tecnología faltante.
// El slug permite hacer matching con PathTemplate.subject.slug en el roadmap.
function generateGapAnalysis(career: CareerProfile, input: CareerDiscoveryInput): GapItem[] {
  return career.requiredTechnologies
    .filter((t) => !input.knownTechnologies.includes(t as KnownTechnology))
    .map((t) => ({
      slug: t,
      label: TECH_LABELS[t] ?? t,
    }));
}

export function discoverCareers(input: CareerDiscoveryInput): CareerRecommendation[] {
  const weights = getObjectiveWeights(input.objective);
  const careers = Object.entries(CAREER_PROFILES) as [CareerSlug, CareerProfile][];

  const scored = careers.map(([slug, profile]) => {
    const marketScore = scoreMarketDemand(profile.marketDemand) * weights.marketDemand;
    const techScore = scoreTechnologies(input.knownTechnologies, profile.relatedTechnologies) * weights.technologies;
    const projectScore = scoreProjects(input.projectTypes, profile.relatedProjects) * weights.projects;
    const preferenceScore = scorePreference(input.workPreference, profile.relatedPreferences);
    const industryScore = scoreIndustry(input.industries, profile.relatedIndustries);

    const rawScore = marketScore + techScore + projectScore + preferenceScore + industryScore;

    const baseMonths = profile.baseMonthsToLearn[input.experienceLevel] ?? 12;
    const estimatedMonths = calculateEstimatedMonths(baseMonths, input.weeklyHours);
    const reasoning = generateReasoning(profile, input);
    const gapAnalysis = generateGapAnalysis(profile, input);

    return {
      career: slug,
      title: profile.title,
      score: Math.round(rawScore),
      compatibility: 0,
      reasoning,
      gapAnalysis,
      estimatedMonths,
      marketDemand: profile.marketDemand,
      averageSalary: profile.averageSalary,
      remoteOpportunities: profile.remoteOpportunities,
    };
  });

  const maxScore = Math.max(...scored.map((s) => s.score));

  const withCompatibility = scored.map((s) => ({
    ...s,
    compatibility: Math.round((s.score / maxScore) * 100),
  }));

  return withCompatibility.sort((a, b) => b.score - a.score).slice(0, 3);
}
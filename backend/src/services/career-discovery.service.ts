import { CareerDiscoveryInput, KnownTechnology } from "../schemas/career.schema";
import { CAREER_PROFILES } from "../shared/career-profiles.constants";

//En estos tipos se definen las carreras disponibles.
export type CareerSlug =
  | "frontend"
  | "backend"
  | "fullstack"
  | "devops"
  | "data_science"
  | "mobile"
  | "cybersecurity"
  | "qa";

//CareerRecommendation es el tipo que se devuelve al usuario con la recomendación de carrera. Basicamente, es la estructura que debe seguir la recomendación que el sistema retorne al usuario.
export interface CareerRecommendation {
  career: CareerSlug;
  title: string;
  score: number;
  compatibility: number;
  reasoning: string[];
  gapAnalysis: string[];
  estimatedMonths: number;
  marketDemand: "very_high" | "high" | "medium" | "low";
  averageSalary: string;
  remoteOpportunities: "excellent" | "good" | "moderate" | "limited";
}

//CareerProfile es el tipo que representa la información de cada carrera. Es la estructura que se utiliza para definir las características de cada carrera en el sistema.
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

//Esta función asigna pesos o importancia a cada criterio de evaluación según el objetivo del usuario. Por ejemplo, si el objetivo es conseguir el primer trabajo, se le da más peso a la demanda del mercado y al tiempo estimado para aprender las habilidades necesarias.
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

//Esta función asigna una puntuación a la demanda del mercado de una carrera. Se utiliza para evaluar qué tan atractiva es una carrera en función de su demanda laboral actual. 
function scoreMarketDemand(demand: CareerProfile["marketDemand"]): number {const scores: Record<CareerProfile["marketDemand"], number> = {
    very_high: 25,
    high: 18,
    medium: 10,
    low: 5,
  };
  return scores[demand];
}

//Esta funcion compara las tecnologías conocidas por el usuario con las tecnologías relacionadas con el campo o carrera (Front, backend, devops, QA..etc). Dependiendo de cuántas tecnologías coincidan, se asigna una puntuación que contribuye a la evaluación general de la compatibilidad del usuario con esa carrera.
function scoreTechnologies( userTechs: string[], careerTechs: string[]): number {
  if (careerTechs.length === 0) return 0;
  const matches = userTechs.filter((t) => careerTechs.includes(t)).length;
  return Math.round((matches / careerTechs.length) * 25); //La puntuación máxima para tecnologías es 25, por lo que se calcula el porcentaje de coincidencias y se multiplica por 25 para obtener la puntuación final. Se usa Math.round para redondear la puntuación a un número entero.
}

//Esta función compara los tipos de proyectos en los que el usuario ha trabajado o tiene interés con los tipos de proyectos relacionados con la carrera. Se asigna una puntuación basada en el porcentaje de coincidencias, lo que ayuda a evaluar qué tan alineados están los intereses y experiencias del usuario con las características de la carrera.
function scoreProjects(
  userProjects: string[],
  careerProjects: string[]
): number {
  if (careerProjects.length === 0) return 0;
  const matches = userProjects.filter((p) => careerProjects.includes(p)).length;
  return Math.round((matches / careerProjects.length) * 20); //La puntuación máxima para proyectos es de 20, puesto que no es una variable tan determinante.
}

//Esta función compara la preferencia de trabajo del usuario (por ejemplo, si prefiere un entorno más visual o lógico) con las preferencias relacionadas con la carrera. Si hay una coincidencia, se asigna una puntuación fija de 15 puntos, lo que indica que esta alineación es un factor positivo para la compatibilidad del usuario con esa carrera. Si no hay coincidencia, se asigna una puntuación de 0, lo que significa que esta preferencia no contribuye a la compatibilidad en este caso.
function scorePreference(
  userPreference: string,
  careerPreferences: string[]
): number {
  return careerPreferences.includes(userPreference) ? 15 : 0;//La puntuación máxima para preferencias es de 15, lo que refleja la importancia de que las preferencias de trabajo del usuario se alineen con las características de la carrera.
}

//Esta función compara las industrias de interés del usuario con las industrias relacionadas con la carrera. Se asigna una puntuación basada en el porcentaje de coincidencias, lo que ayuda a evaluar qué tan alineados están los intereses del usuario con las oportunidades laborales en esas industrias para esa carrera.
function scoreIndustry(
  userIndustries: string[],
  careerIndustries: string[]
): number {
  if (careerIndustries.length === 0) return 0;
  const matches = userIndustries.filter((i) =>
    careerIndustries.includes(i)
  ).length;
  return Math.round((matches / careerIndustries.length) * 15);
}


//Esta función calcula el tiempo estimado dado al usuario para aprender y finalizar a la ruta de aprendizaje dada por el sistema.
function calculateEstimatedMonths(baseMonths: number,weeklyHours: number): number {
  const STANDARD_WEEKLY_HOURS = 20;
  const factor = STANDARD_WEEKLY_HOURS / weeklyHours;
  return Math.round(baseMonths * factor);
}


//Esta funcion genera una lista con el resultado del analisis de compatibilidad entre el perfil del usuario y la carrera recomendada. En la lista se va haciendo push, condicionalmente, de los resultados.
function generateReasoning(career: CareerProfile, input: CareerDiscoveryInput): string[] {
  const reasons: string[] = [];

  const techMatches = input.knownTechnologies.filter((t) =>
    career.relatedTechnologies.includes(t)
  );

  if (techMatches.length > 0) {
    reasons.push(
      `Ya conoces ${techMatches.length} tecnología(s) clave para esta carrera`
    );
  }

  if (career.relatedPreferences.includes(input.workPreference)) {
    reasons.push(
      "Tu preferencia de trabajo se alinea perfectamente con esta carrera"
    );
  }

  const industryMatches = input.industries.filter((i) =>
    career.relatedIndustries.includes(i)
  );
  if (industryMatches.length > 0) {
    reasons.push("Tiene alta demanda en las industrias que te interesan");
  }

  if (career.marketDemand === "very_high") {
    reasons.push(
      "Es una de las carreras con mayor demanda laboral actualmente"
    );
  }

  if (
    input.openToRemote &&
    career.remoteOpportunities === "excellent"
  ) {
    reasons.push(
      "Excelentes oportunidades de trabajo remoto e internacional"
    );
  }

  if (
    input.objective === "first_job" &&
    career.marketDemand === "very_high"
  ) {
    reasons.push("Alta probabilidad de conseguir empleo rápidamente");
  }

  return reasons.length > 0 ? reasons : ["Compatible con tu perfil general"];
}

//Esta función genera un análisis de brechas entre las tecnologías requeridas por la carrera y las tecnologías que el usuario no conoce. Devuelve una lista de las tecnologías que el usuario debería aprender para mejorar su compatibilidad con la carrera recomendada.
function generateGapAnalysis(
  career: CareerProfile,
  input: CareerDiscoveryInput
): string[] {
  const TECH_LABELS: Record<string, string> = {
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

  return career.requiredTechnologies
  .filter((t) => !input.knownTechnologies.includes(t as KnownTechnology))
  .map((t) => TECH_LABELS[t] ?? t);
}

//función principal. llama a todas las anteriores. Se encarga de 
export function discoverCareers(input: CareerDiscoveryInput): CareerRecommendation[] {
  //Llamado a la función que asigna pesos a cada criterio de evaluación según el objetivo del usuario. Esto permite personalizar la evaluación de compatibilidad de las carreras en función de lo que el usuario busca lograr con su desarrollo profesional.
  const weights = getObjectiveWeights(input.objective);
  //Convierte el objeto CAREER_PROFILES en un array de tuplas [slug, profile] para facilitar la iteración y evaluación de cada carrera. Esto permite aplicar las funciones de puntuación y análisis a cada carrera de manera sistemática.
  const careers = Object.entries(CAREER_PROFILES) as [
    CareerSlug,
    CareerProfile
  ][];

  const scored = careers.map(([slug, profile]) => {
    //En esta sección se calculan las puntuaciones para cada criterio de evaluación (demanda del mercado, tecnologías, proyectos, preferencias e industrias) utilizando las funciones de puntuación definidas anteriormente.
    const marketScore = scoreMarketDemand(profile.marketDemand) * weights.marketDemand;
    const techScore = scoreTechnologies( input.knownTechnologies, profile.relatedTechnologies) * weights.technologies;
    const projectScore = scoreProjects(input.projectTypes, profile.relatedProjects) * weights.projects;
    
    const preferenceScore = scorePreference( input.workPreference, profile.relatedPreferences);
    
    const industryScore = scoreIndustry(input.industries,profile.relatedIndustries);

    //se suman todas las anteriores puntaciones para obtener la puntuació bruta. Esta puntuación representa la compatibilidad general del usuario con la carrera evaluada antes de normalizarla en función de la puntuación máxima entre todas las carreras.
    const rawScore = marketScore + techScore + projectScore + preferenceScore + industryScore;

    const baseMonths = profile.baseMonthsToLearn[input.experienceLevel] ?? 12;
    
    const estimatedMonths = calculateEstimatedMonths( baseMonths,input.weeklyHours);
   
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
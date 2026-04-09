export type ExperienceLevel = 'none' | 'beginner' | 'intermediate' | 'advanced';

export type KnownTechnology =
  | 'html_css' | 'javascript' | 'typescript' | 'python' | 'java'
  | 'csharp' | 'php' | 'ruby' | 'go' | 'rust' | 'sql' | 'nosql'
  | 'react' | 'vue' | 'angular' | 'node' | 'django' | 'spring'
  | 'docker' | 'kubernetes' | 'aws' | 'azure' | 'gcp' | 'git' | 'linux';

export type ProjectType =
  | 'web_apps' | 'mobile_apps' | 'apis' | 'data_analysis'
  | 'automation' | 'infrastructure' | 'games' | 'ai_ml';

export type WorkPreference = 'visual' | 'logical' | 'infrastructure' | 'data' | 'security';

export type CareerObjective = 'first_job' | 'career_change' | 'specialize' | 'freelance';

export type Industry =
  | 'web' | 'mobile' | 'data' | 'cloud' | 'security' | 'gaming' | 'fintech' | 'healthtech';

export type MarketDemand = 'very_high' | 'high' | 'medium' | 'low';
export type RemoteOpportunity = 'excellent' | 'good' | 'limited';

export interface CareerDiscoveryInput {
  experienceLevel: ExperienceLevel;
  knownTechnologies: KnownTechnology[];
  projectTypes: ProjectType[];
  workPreference: WorkPreference;
  weeklyHours: number;
  objective: CareerObjective;
  industries: Industry[];
  openToRemote: boolean;
}

export interface GapItem {
  slug: string;
  label: string;
}

export interface CareerRecommendation {
  career: string;
  title: string;
  score: number;
  compatibility: number;
  reasoning: string[];
  gapAnalysis: GapItem[];
  estimatedMonths: number;
  marketDemand: MarketDemand;
  averageSalary: string;
  remoteOpportunities: RemoteOpportunity;
}

export interface CareerDiscoveryResponse {
  recommendations: CareerRecommendation[];
  recommendationId: string;
  userProfile: {
    experienceLevel: ExperienceLevel;
    objective: CareerObjective;
    weeklyHours: number;
  };
  generatedAt: string;
  savedToProfile: boolean;
}

export interface CareerRoadmapStep {
  id: string;
  order: number;
  techSlug: string;
  techLabel: string;
  status: 'LOCKED' | 'AVAILABLE' | 'IN_PROGRESS' | 'COMPLETED' | 'SKIPPED';
  pathTemplate: {
    id: string;
    title: string;
    slug: string;
    level: string;
  } | null;
  userPath: {
    id: string;
    progress: {
      completed: number;
      total: number;
      percentage: number;
    };
  } | null;
}

export interface CareerRoadmap {
  id: string;
  careerSlug: string;
  careerTitle: string;
  status: 'ACTIVE' | 'COMPLETED' | 'ABANDONED';
  steps: CareerRoadmapStep[];
}

export interface CareerRoadmapSummary {
  id: string;
  careerSlug: string;
  careerTitle: string;
  status: 'ACTIVE' | 'COMPLETED' | 'ABANDONED';
  totalSteps: number;
  completedSteps: number;
  createdAt: string;
}
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

export interface CareerRecommendation {
  career: string;
  title: string;
  score: number;
  compatibility: number;
  reasoning: string[];
  gapAnalysis: string[];
  estimatedMonths: number;
  marketDemand: MarketDemand;
  averageSalary: string;
  remoteOpportunities: RemoteOpportunity;
}

export interface CareerDiscoveryResponse {
  recommendations: CareerRecommendation[];
  userProfile: {
    experienceLevel: ExperienceLevel;
    objective: CareerObjective;
    weeklyHours: number;
  };
  generatedAt: string;
  savedToProfile: boolean;
}
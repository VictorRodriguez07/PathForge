export type SubjectSlug = 'javascript' | 'typescript' | 'react' | 'nodejs' | 'python' | 'aws';
export type CurrentLevel = 'none' | 'beginner' | 'intermediate' | 'advanced';
export type Objective = 'get_job' | 'personal_project' | 'certification' | 'specialize' | 'improve_job';

export interface Concept {
  slug: string;
  name: string;
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
}

export interface ConceptsResponse {
  concepts: {
    BEGINNER: Concept[];
    INTERMEDIATE: Concept[];
    ADVANCED: Concept[];
  };
}

export interface CustomPathInput {
  subjectSlug: SubjectSlug;
  currentLevel: CurrentLevel;
  objective: Objective;
  weeklyHours: number;
  masteredConcepts: string[];
}

export interface GeneratedModule {
  moduleId: string;
  title: string;
  orderIndex: number;
  durationDays: number;
  concepts: string[];
  isNew: boolean;
}

export interface GeneratedPath {
  title: string;
  description: string;
  estimatedMonths: number;
  weeklyHours: number;
  totalModules: number;
  skippedModules: number;
  modules: GeneratedModule[];
  subjectId: string;
  level: string;
  goal: string;
}

export interface ConfirmCustomPathInput {
  input: CustomPathInput;
  generatedPath: GeneratedPath;
}
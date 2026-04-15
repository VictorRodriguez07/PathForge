export type Level = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
export type PathStatus = 'ACTIVE' | 'COMPLETED' | 'PAUSED' | 'ABANDONED';
export type ModuleStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';


export interface Subject {
  name: string;
  slug: string;
  iconUrl: string | null;
}

export interface Concept {
  id: string;
  name: string;
  slug: string;
  level: Level;
  description: string | null;
  whyMatters: string | null;
  explanation: string | null;
  codeExample: string | null;
  practicalTips: string[];
  commonMistakes: string[];
  resources: Record<string, unknown> | null;
}

export interface LearningPathModule {
  id: string;
  title: string;
  description: string | null;
  orderIndex: number;
  durationDays: number;
  pathTemplateId: string;
  concepts: { concept: Concept }[];
}

export interface LearningPath {
  id: string;
  title: string;
  slug: string;
  description: string;
  level: Level;
  goal: string;
  weeklyHours: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  subject: Subject;
  _count: {
    modules: number;
    userPaths: number;
  };
}

export interface LearningPathDetail extends Omit<LearningPath, '_count'> {
  modules: LearningPathModule[];
}


export interface PathModuleProgress {
  moduleId: string;
  title: string;
  orderIndex: number;
  durationDays: number;
  status: ModuleStatus;
}

export interface LearningPathProgress {
  pathId: string;
  status: PathStatus;
  weeklyHours: number;
  progress: number;
  completedModules: number;
  totalModules: number;
  modules: PathModuleProgress[];
}


export interface UserLearningPath {
  id: string;
  status: PathStatus;
  weeklyHours: number;
  currentLevel: string | null;
  goal: string;
  startedAt: string;
  isCustom: boolean;
  title: string;
  slug: string | null;
  level: Level;
  subject: Subject | null;
  progress: {
    completed: number;
    total: number;
    percentage: number;
  };

}

export interface CustomPathDetail {
  id: string;
  status: PathStatus;
  isCustom: true;
  title: string;
  description: string | null;
  level: Level;
  goal: string;
  weeklyHours: number;
  slug: null;
  subject: null;
  modules: LearningPathModule[];
  moduleProgress: { moduleId: string; status: ModuleStatus }[];
  progress: { completed: number; total: number; percentage: number };
}

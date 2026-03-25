export type Level = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
export type PathStatus = 'ACTIVE' | 'COMPLETED' | 'PAUSED';

export interface Subject {
  name: string;
  slug: string;
  iconUrl: string | null;
}

export interface LearningPathModule {
  id: string;
  title: string;
  description: string | null;
  orderIndex: number;
  durationDays: number;
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

export interface LearningPathDetail extends LearningPath {
  pathModules: LearningPathModule[];
}

export interface ModuleProgress {
  moduleId: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
}

export interface UserLearningPath {
  id: string;
  status: PathStatus;
  weeklyHours: number;
  startedAt: string;
  completedAt: string | null;
  pathTemplate: LearningPathDetail;
  moduleProgress: ModuleProgress[];
}
export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: 'STUDENT' | 'ADMIN';
  createdAt: string;
}

export interface PathProgress {
  completed: number;
  total: number;
  percentage: number;
}

export interface UserPathSummary {
  id: string;
  status: 'ACTIVE' | 'PAUSED';
  weeklyHours: number;
  currentLevel: string;
  goal: string;
  startedAt: string;
  isCustom: boolean;
  title: string;
  slug: string | null;
  level: string;
  subject: {
    name: string;
    slug: string;
    iconUrl: string;
  } | null;
  progress: PathProgress;
}

export interface UserPathsResponse {
  paths: UserPathSummary[];
  hasCareerDiscovery: boolean;
}
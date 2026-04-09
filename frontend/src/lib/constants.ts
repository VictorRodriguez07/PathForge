export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL as string;

export const QUERY_KEYS = {
 learningPaths: () => ['learning-paths'] as const,
  learningPath: (slug: string) => ['learning-paths', slug] as const,
  learningPathProgress: (slug: string) => ['learning-paths', slug, 'progress'] as const,
  myLearningPaths: () => ['learning-paths', 'my'] as const,
  exercises: ['exercises'] as const,
  exerciseDetail: (slug: string) => ['exercises', slug] as const,
  submission: (id: string) => ['submissions', id] as const,
  careerRoadmap: (id: string) => ['career-roadmap', id] as const,
  myRoadmaps: ['my-roadmaps'] as const,
} as const;

export const LEVEL_LABELS: Record<string, string> = {
  BEGINNER: 'Principiante',
  INTERMEDIATE: 'Intermedio',
  ADVANCED: 'Avanzado',
};

export const DIFFICULTY_LABELS: Record<string, string> = {
  EASY: 'Fácil',
  MEDIUM: 'Medio',
  HARD: 'Difícil',
};

export const DIFFICULTY_POINTS: Record<string, number> = {
  EASY: 10,
  MEDIUM: 25,
  HARD: 50,
};
export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD';
export type SubmissionStatus = 'PENDING' | 'RUNNING' | 'ACCEPTED' | 'WRONG_ANSWER' | 'TIME_LIMIT' | 'RUNTIME_ERROR';
export type Language = 'javascript' | 'typescript' | 'python';

export interface TestCase {
  input: string;
  expected: string;
  isPublic: boolean;
}

export interface Exercise {
  id: string;
  title: string;
  slug: string;
  description: string;
  difficulty: Difficulty;
  points: number;
  timeLimit: number;
  memoryLimit: number;
  subject: {
    name: string;
    slug: string;
  };
}

export interface ExerciseDetail extends Exercise {
  testCases: TestCase[];
}

export interface RunResult {
  passed: boolean;
  results: {
    input: string;
    expected: string;
    got: string;
    passed: boolean;
  }[];
}

export interface Submission {
  id: string;
  status: SubmissionStatus;
  language: Language;
  executionTime: number | null;
  memoryUsed: number | null;
  createdAt: string;
}
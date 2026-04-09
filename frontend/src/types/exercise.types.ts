export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD';
export type SubmissionStatus = 'PENDING' | 'ACCEPTED' | 'WRONG_ANSWER' | 'TIME_LIMIT_EXCEEDED' | 'RUNTIME_ERROR' | 'COMPILE_ERROR';
export type SupportedLanguage = 'javascript' | 'typescript' | 'python';

export interface ExerciseSubject {
  name: string;
  slug: string;
  iconUrl: string | null;
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
  isActive: boolean;
  createdAt: string;
  subject: ExerciseSubject;
  _count: { submissions: number };
}

export interface TestCase {
  id: string;
  input: string;
  expected: string;
  orderIndex: number;
}

export interface ExerciseDetail extends Omit<Exercise, '_count'> {
  testCases: TestCase[];
}

export interface RunResult {
  testCaseId: string;
  passed: boolean;
  output: string;
  expected: string;
}

export interface RunResponse {
  results: RunResult[];
  passedTests: number;
  totalTests: number;
}

export interface SubmitResponse {
  submissionId: string;
  status: SubmissionStatus;
  message: string;
}

export interface Submission {
  id: string;
  code: string;
  language: string;
  status: SubmissionStatus;
  executionMs: number | null;
  memoryUsedMb: number | null;
  passedTests: number;
  totalTests: number;
  errorMessage: string | null;
  submittedAt: string;
  challenge: {
    title: string;
    slug: string;
    difficulty: Difficulty;
    points: number;
  };
}
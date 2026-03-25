import { apiClient } from './client';
import { Exercise, ExerciseDetail, RunResult, Submission, Language } from '../types';

interface RunRequest {
  code: string;
  language: Language;
}

interface SubmitRequest {
  code: string;
  language: Language;
}

export const exercisesApi = {
  getAll: async (): Promise<Exercise[]> => {
    const res = await apiClient.get<{ exercises: Exercise[] }>('/exercises');
    return res.data.exercises;
  },

  getBySlug: async (slug: string): Promise<ExerciseDetail> => {
    const res = await apiClient.get<{ exercise: ExerciseDetail }>(`/exercises/${slug}`);
    return res.data.exercise;
  },

  run: async (slug: string, data: RunRequest): Promise<RunResult> => {
    const res = await apiClient.post<RunResult>(`/exercises/${slug}/run`, data);
    return res.data;
  },

  submit: async (slug: string, data: SubmitRequest): Promise<{ submissionId: string }> => {
    const res = await apiClient.post<{ submissionId: string }>(`/exercises/${slug}/submit`, data);
    return res.data;
  },

  getSubmission: async (submissionId: string): Promise<Submission> => {
    const res = await apiClient.get<{ submission: Submission }>(`/submissions/${submissionId}`);
    return res.data.submission;
  },
};
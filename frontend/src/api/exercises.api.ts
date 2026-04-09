import { apiClient } from './client';
import {
  Exercise,
  ExerciseDetail,
  RunResponse,
  SubmitResponse,
  Submission,
  SupportedLanguage,
} from '../types';

export const exercisesApi = {
  getAll: async (): Promise<Exercise[]> => {
    const res = await apiClient.get<{ exercises: Exercise[] }>('/exercises');
    return res.data.exercises;
  },

  getBySlug: async (slug: string): Promise<ExerciseDetail> => {
    const res = await apiClient.get<{ exercise: ExerciseDetail }>(`/exercises/${slug}`);
    return res.data.exercise;
  },

  run: async (slug: string, code: string, language: SupportedLanguage): Promise<RunResponse> => {
    const res = await apiClient.post<RunResponse>(`/exercises/${slug}/run`, { code, language });
    return res.data;
  },

  submit: async (slug: string, code: string, language: SupportedLanguage): Promise<SubmitResponse> => {
    const res = await apiClient.post<SubmitResponse>(`/exercises/${slug}/submit`, { code, language });
    return res.data;
  },

  getSubmission: async (submissionId: string): Promise<Submission> => {
    const res = await apiClient.get<{ submission: Submission }>(`/submissions/${submissionId}`);
    return res.data.submission;
  },
};
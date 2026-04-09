import { apiClient } from './client';
import {
  LearningPath,
  LearningPathDetail,
  LearningPathProgress,
  UserLearningPath,
} from '../types';

interface EnrollRequest {
  weeklyHours: number;
}

export const learningPathsApi = {
  getAll: async (): Promise<LearningPath[]> => {
    const res = await apiClient.get<{ paths: LearningPath[] }>('/learning-paths');
    return res.data.paths;
  },

  getBySlug: async (slug: string): Promise<LearningPathDetail> => {
    const res = await apiClient.get<{ path: LearningPathDetail }>(`/learning-paths/${slug}`);
    return res.data.path;
  },

  enroll: async (slug: string, data: EnrollRequest): Promise<{ id: string }> => {
    const res = await apiClient.post<{ userPath: { id: string } }>(
      `/learning-paths/${slug}/enroll`,
      data
    );
    return res.data.userPath;
  },

  getProgress: async (slug: string): Promise<LearningPathProgress> => {
    const res = await apiClient.get<LearningPathProgress>(
      `/learning-paths/${slug}/progress`
    );
    return res.data;
  },

 completeModule: async (pathId: string, moduleId: string): Promise<void> => {
  await apiClient.put<unknown>(`/learning-paths/${pathId}/modules/${moduleId}/complete`);
},

  unenroll: async (pathId: string): Promise<void> => {
    await apiClient.delete(`/learning-paths/${pathId}/enroll`);
  },

  getMyPaths: async (): Promise<UserLearningPath[]> => {
  const res = await apiClient.get<{ paths: UserLearningPath[] }>('/users/me/paths');
  return res.data.paths ?? [];
  },
};
import { apiClient } from './client';
import { LearningPath, LearningPathDetail, UserLearningPath } from '../types';

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

  enroll: async (slug: string, data: EnrollRequest): Promise<UserLearningPath> => {
    const res = await apiClient.post<{ userPath: UserLearningPath }>(`/learning-paths/${slug}/enroll`, data);
    return res.data.userPath;
  },

  getProgress: async (slug: string): Promise<UserLearningPath> => {
    const res = await apiClient.get<{ userPath: UserLearningPath }>(`/learning-paths/${slug}/progress`);
    return res.data.userPath;
  },

  completeModule: async (pathId: string, moduleId: string): Promise<void> => {
    await apiClient.put(`/learning-paths/${pathId}/modules/${moduleId}/complete`);
  },

  unenroll: async (pathId: string): Promise<void> => {
    await apiClient.delete(`/learning-paths/${pathId}/enroll`);
  },
};
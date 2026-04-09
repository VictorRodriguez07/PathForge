import { apiClient } from './client';
import { ConceptsResponse, CustomPathInput, GeneratedPath, ConfirmCustomPathInput, CustomPathDetail } from '../types';

export const customPathsApi = {
  getConcepts: async (subjectSlug: string): Promise<ConceptsResponse> => {
    const res = await apiClient.get<ConceptsResponse>(`/concepts/${subjectSlug}`);
    return res.data;
  },

  generate: async (input: CustomPathInput): Promise<{ generatedPath: GeneratedPath }> => {
    const res = await apiClient.post<{ generatedPath: GeneratedPath }>(
      '/learning-paths/custom/generate',
      input
    );
    return res.data;
  },

  confirm: async (input: ConfirmCustomPathInput): Promise<{ userPathId: string; message: string }> => {
    const res = await apiClient.post<{ userPathId: string; message: string }>(
      '/learning-paths/custom/confirm',
      input
    );
    return res.data;
  },

  getById: async (id: string): Promise<CustomPathDetail> => {
  const res = await apiClient.get<{ path: CustomPathDetail }>(`/users/me/paths/${id}`);
  return res.data.path;
}
};
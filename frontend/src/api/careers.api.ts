import { apiClient } from './client';
import {
  CareerDiscoveryInput,
  CareerDiscoveryResponse,
  CareerRoadmap,
  CareerRoadmapSummary,
} from '../types';

export const careersApi = {
  discover: async (input: CareerDiscoveryInput): Promise<CareerDiscoveryResponse> => {
    const res = await apiClient.post<CareerDiscoveryResponse>('/careers/discover', input);
    return res.data;
  },

 createRoadmap: async (
  careerRecommendationId: string,
  careerIndex: number
): Promise<{ roadmap: CareerRoadmap }> => {
  const res = await apiClient.post<{ roadmap: CareerRoadmap }>('/career/roadmap', {
    careerRecommendationId,
    careerIndex,
  });
  return res.data;
},

  getRoadmap: async (roadmapId: string): Promise<{ roadmap: CareerRoadmap }> => {
    const res = await apiClient.get<{ roadmap: CareerRoadmap }>(`/career/roadmap/${roadmapId}`);
    return res.data;
  },

  getMyRoadmaps: async (): Promise<{ roadmaps: CareerRoadmapSummary[] }> => {
    const res = await apiClient.get<{ roadmaps: CareerRoadmapSummary[] }>('/career/roadmap');
    return res.data;
  },
};
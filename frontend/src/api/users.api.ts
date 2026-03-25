import { apiClient } from './client';
import { UserProfile, UserPathsResponse } from '../types';

export const usersApi = {
  getMe: async (): Promise<UserProfile> => {
    const res = await apiClient.get<{ user: UserProfile }>('/users/me');
    return res.data.user;
  },

  getMyPaths: async (): Promise<UserPathsResponse> => {
    const res = await apiClient.get<UserPathsResponse>('/users/me/paths');
    return res.data;
  },
};
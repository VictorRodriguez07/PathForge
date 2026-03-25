import { apiClient } from './client';
import { CareerDiscoveryInput, CareerDiscoveryResponse } from '../types';

export const careersApi = {
  discover: async (input: CareerDiscoveryInput): Promise<CareerDiscoveryResponse> => {
    const res = await apiClient.post<CareerDiscoveryResponse>('/careers/discover', input);
    return res.data;
  },
};
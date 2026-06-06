import { api } from './api';
import { Planting } from '../types';

export const plantingService = {
  createPlanting: async (data: Omit<Planting, 'id'>): Promise<Planting> => {
    try {
      const response = await api.post<Planting>('/plantings', data);
      return response.data;
    } catch (error) {
      console.error('Erro:', error);
      throw error;
    }
  },

  getAllPlantings: async (): Promise<Planting[]> => {
    try {
      const response = await api.get<Planting[]>('/plantings');
      return response.data;
    } catch (error) {
      console.error('Erro:', error);
      throw error;
    }
  },

  getPlantingById: async (id: string): Promise<Planting> => {
    try {
      const response = await api.get<Planting>(`/plantings/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erro:', error);
      throw error;
    }
  },

  updatePlanting: async (id: string, data: Omit<Planting, 'id'>): Promise<Planting> => {
    try {
      const response = await api.put<Planting>(`/plantings/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('Erro:', error);
      throw error;
    }
  },

  deletePlanting: async (id: string): Promise<Planting> => {
    try {
      const response = await api.delete<Planting>(`/plantings/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erro:', error);
      throw error;
    }
  },
};

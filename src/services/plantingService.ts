import { api } from './api';
import { Planting } from '../types';

export const plantingService = {
  // CREATE
  createPlanting: async (data: Omit<Planting, 'id'>): Promise<Planting> => {
    try {
      const response = await api.post<Planting>('/plantings', data);
      return response.data;
    } catch (error) {
      console.error('Erro no CREATE:', error);
      throw error;
    }
  },

  // READ (All)
  getAllPlantings: async (): Promise<Planting[]> => {
    try {
      const response = await api.get<Planting[]>('/plantings');
      return response.data;
    } catch (error) {
      console.error('Erro no READ (All):', error);
      throw error;
    }
  },

  // READ (One)
  getPlantingById: async (id: string): Promise<Planting> => {
    try {
      const response = await api.get<Planting>(`/plantings/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erro no READ (Id):', error);
      throw error;
    }
  },

  // UPDATE
  updatePlanting: async (id: string, data: Omit<Planting, 'id'>): Promise<Planting> => {
    try {
      const response = await api.put<Planting>(`/plantings/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('Erro no UPDATE:', error);
      throw error;
    }
  },

  // DELETE
  deletePlanting: async (id: string): Promise<Planting> => {
    try {
      const response = await api.delete<Planting>(`/plantings/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erro no DELETE:', error);
      throw error;
    }
  }
};

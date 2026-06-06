import axios, { InternalAxiosRequestConfig } from 'axios';

export const api = axios.create({
  baseURL: 'https://64dcd0d9e64a8525a0f76c5b.mockapi.io/api/v1', 
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`);
  return config;
}, error => {
  return Promise.reject(error);
});

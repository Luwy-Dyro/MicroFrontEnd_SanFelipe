import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL ?? 'http://localhost:10010',
});

api.interceptors.request.use((config) => {
  
  const raw = localStorage.getItem('jwt') || '';
  const token = raw.replace(/^"+|"+$/g, '').trim();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;

import axios from 'axios';
import { API_URL } from '../config/api';

// Create a configured instance of axios
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const fetchOffices = (params) => {
  return api.get('/offices', { params });
};

export const getOfficeById = (id) => {
  return api.get(`/offices/${id}`);
};

export const createOffice = (data) => {
  return api.post('/offices', data);
};

export const updateOffice = (id, data) => {
  return api.put(`/offices/${id}`, data);
};

export const deleteOffice = (id) => {
  return api.delete(`/offices/${id}`);
};

import apiClient from '../config/axios';
import { API_URL as BASE_URL } from '../config/api';
const API_URL = BASE_URL;

export const fetchAdminUsers = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const res = await apiClient.get(`${API_URL}/admin-users?${query}`);
  return res.data;
};

export const fetchAdminUserStats = async () => {
  const res = await apiClient.get(`${API_URL}/admin-users/stats`);
  return res.data;
};

export const updateAdminUserStatus = async (id, status) => {
  const res = await apiClient.patch(`${API_URL}/admin-users/${id}/status`, { status });
  return res.data;
};

export const updateAdminUserRole = async (id, role) => {
  const res = await apiClient.patch(`${API_URL}/admin-users/${id}/role`, { role });
  return res.data;
};

export const deleteAdminUser = async (id) => {
  const res = await apiClient.delete(`${API_URL}/admin-users/${id}`);
  return res.data;
};

export const inviteAdminUser = async (data) => {
  const res = await apiClient.post(`${API_URL}/admin-users/invite`, data);
  return res.data;
};

export const cancelAdminUserInvite = async (id) => {
  const res = await apiClient.post(`${API_URL}/admin-users/invite/cancel/${id}`);
  return res.data;
};

export const fetchPermissions = async () => {
  const res = await apiClient.get(`${API_URL}/admin-users/permissions`);
  return res.data;
};

export const updatePermissions = async (data) => {
  const res = await apiClient.put(`${API_URL}/admin-users/permissions`, data);
  return res.data;
};

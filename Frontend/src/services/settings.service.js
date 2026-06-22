import { apiFetch } from '../config/apiFetch';
import { API_URL as BASE_URL } from '../config/api';
const API_URL = `${BASE_URL}/settings`;

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

export const getSettings = async () => {
  const response = await apiFetch(API_URL, {
    method: 'GET',
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Error fetching settings');
  }
  const json = await response.json();
  return json.data || {};
};

export const updateSettings = async (id, data) => {
  const method = id ? 'PUT' : 'POST';
  const url = id ? `${API_URL}/${id}` : API_URL;

  const response = await apiFetch(url, {
    method,
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Error updating settings');
  }
  const json = await response.json();
  return json.data;
};

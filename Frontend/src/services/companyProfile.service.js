import { API_URL as BASE_URL } from '../config/api';
const API_URL = `${BASE_URL}/company-profile`;

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// --- Profile ---
export const getCompanyProfile = async () => {
  const response = await fetch(API_URL, {
    method: 'GET',
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Error fetching company profile: ${response.statusText}`);
  }
  const json = await response.json();
  return json.data;
};

export const updateCompanyProfile = async (id, data) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Error updating company profile: ${response.statusText}`);
  }
  const json = await response.json();
  return json.data;
};

export const createCompanyProfile = async (data) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Error creating company profile: ${response.statusText}`);
  }
  const json = await response.json();
  return json.data;
};

// --- Statistics ---
export const getStatistics = async () => {
  const response = await fetch(`${API_URL}/statistics`, {
    method: 'GET',
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error('Error fetching statistics');
  const json = await response.json();
  return json.data;
};

export const createStatistic = async (data) => {
  const response = await fetch(`${API_URL}/statistics`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Error creating statistic');
  }
  const json = await response.json();
  return json.data;
};

export const updateStatistic = async (id, data) => {
  const response = await fetch(`${API_URL}/statistics/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Error updating statistic');
  }
  const json = await response.json();
  return json.data;
};

export const deleteStatistic = async (id) => {
  const response = await fetch(`${API_URL}/statistics/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Error deleting statistic');
  }
  const json = await response.json();
  return json;
};

// --- Pillars ---
export const getPillars = async () => {
  const response = await fetch(`${API_URL}/pillars`, {
    method: 'GET',
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error('Error fetching pillars');
  const json = await response.json();
  return json.data;
};

export const createPillar = async (data) => {
  const response = await fetch(`${API_URL}/pillars`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Error creating pillar');
  }
  const json = await response.json();
  return json.data;
};

export const updatePillar = async (id, data) => {
  const response = await fetch(`${API_URL}/pillars/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Error updating pillar');
  }
  const json = await response.json();
  return json.data;
};

export const deletePillar = async (id) => {
  const response = await fetch(`${API_URL}/pillars/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Error deleting pillar');
  }
  const json = await response.json();
  return json;
};

import { API_URL as BASE_URL } from '../config/api';
const API_URL = `${BASE_URL}/cms`;

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

export const getHomepageContent = async () => {
  const response = await fetch(`${API_URL}/homepage`, {
    method: 'GET',
    headers: getAuthHeaders(),
    cache: 'no-store',
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Error fetching homepage content');
  }
  const json = await response.json();
  return json.data;
};

export const createHomepageContent = async (data) => {
  const response = await fetch(`${API_URL}/homepage`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Error creating homepage content');
  }
  const json = await response.json();
  return json.data;
};

export const updateHomepageContent = async (id, data) => {
  const response = await fetch(`${API_URL}/homepage/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Error updating homepage content');
  }
  const json = await response.json();
  return json.data;
};

export const getFooterContent = async () => {
  const response = await fetch(`${API_URL}/footer`, {
    method: 'GET',
    headers: getAuthHeaders(),
    cache: 'no-store',
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Error fetching footer content');
  }
  const json = await response.json();
  return json.data;
};

export const createFooterContent = async (data) => {
  const response = await fetch(`${API_URL}/footer`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Error creating footer content');
  }
  const json = await response.json();
  return json.data;
};

export const updateFooterContent = async (id, data) => {
  const response = await fetch(`${API_URL}/footer/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Error updating footer content');
  }
  const json = await response.json();
  return json.data;
};

export const getServicesPageContent = async () => {
  const response = await fetch(`${API_URL}/services-page`, {
    method: 'GET',
    headers: getAuthHeaders(),
    cache: 'no-store',
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Error fetching services page content');
  }
  const json = await response.json();
  return json.data;
};

export const createServicesPageContent = async (data) => {
  const response = await fetch(`${API_URL}/services-page`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Error creating services page content');
  }
  const json = await response.json();
  return json.data;
};

export const updateServicesPageContent = async (id, data) => {
  const response = await fetch(`${API_URL}/services-page/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Error updating services page content');
  }
  const json = await response.json();
  return json.data;
};

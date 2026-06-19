import { API_URL as BASE_URL } from '../config/api';
const API_URL = `${BASE_URL}/services`;

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

export const getServices = async ({ page = 1, limit = 5, search = '', status = 'All' } = {}) => {
  try {
    const queryParams = new URLSearchParams({
      page,
      limit,
      ...(search && { search }),
      ...(status && status !== 'All' && { status: status.toLowerCase() }),
    });

    const response = await fetch(`${API_URL}?${queryParams}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Error fetching services: ${response.statusText}`);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error("Services API Error (getServices):", error);
    throw error;
  }
};

export const getServiceById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Error fetching service details: ${response.statusText}`);
    }

    const json = await response.json();
    return json.data;
  } catch (error) {
    console.error("Services API Error (getServiceById):", error);
    throw error;
  }
};

export const createService = async (serviceData) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(serviceData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Error creating service: ${response.statusText}`);
    }

    const json = await response.json();
    return json.data;
  } catch (error) {
    console.error("Services API Error (createService):", error);
    throw error;
  }
};

export const updateService = async (id, serviceData) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(serviceData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Error updating service: ${response.statusText}`);
    }

    const json = await response.json();
    return json.data;
  } catch (error) {
    console.error("Services API Error (updateService):", error);
    throw error;
  }
};

export const deleteService = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Error deleting service: ${response.statusText}`);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error("Services API Error (deleteService):", error);
    throw error;
  }
};

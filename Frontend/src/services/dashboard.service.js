import { apiFetch } from '../config/apiFetch';
import { API_URL } from '../config/api';

export const getDashboardData = async () => {
  try {
    const response = await apiFetch(`${API_URL}/dashboard`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching dashboard data: ${response.statusText}`);
    }

    const json = await response.json();
    return json.data;
  } catch (error) {
    console.error("Dashboard API Error:", error);
    throw error;
  }
};

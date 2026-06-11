export const getDashboardData = async () => {
  try {
    const response = await fetch('http://localhost:5001/api/v1/dashboard', {
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

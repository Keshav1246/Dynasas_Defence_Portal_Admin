import axios from 'axios';
import { API_URL as BASE_URL } from '../config/api';
const API_URL = BASE_URL;

const getAuthHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem('token')}`,
});

export const fetchOverview = async (filter = '30D') => {
  const res = await axios.get(`${API_URL}/analytics/overview`, {
    params: { filter },
    headers: getAuthHeaders(),
  });
  return res.data;
};

export const fetchTraffic = async (filter = '30D') => {
  const res = await axios.get(`${API_URL}/analytics/traffic`, {
    params: { filter },
    headers: getAuthHeaders(),
  });
  return res.data;
};

export const fetchLeads = async () => {
  const res = await axios.get(`${API_URL}/analytics/leads`, {
    headers: getAuthHeaders(),
  });
  return res.data;
};

export const trackEvent = async (data) => {
  const res = await axios.post(`${API_URL}/analytics/track`, data);
  return res.data;
};

// Export triggers a file download, so we don't return JSON
export const triggerExport = async (format = 'csv', filter = '30D') => {
  const res = await axios.get(`${API_URL}/analytics/export`, {
    params: { format, filter },
    headers: getAuthHeaders(),
    responseType: 'blob', // crucial for file downloads
  });

  // Create a blob link to download
  const url = window.URL.createObjectURL(new Blob([res.data]));
  const link = document.createElement('a');
  link.href = url;
  
  let extension = format;
  if (format === 'xlsx') extension = 'xlsx';
  
  link.setAttribute('download', `Analytics_Report_${filter}.${extension}`);
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
};

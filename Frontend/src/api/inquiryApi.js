import axios from 'axios';

const API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:5001/api/v1';

const getAuthHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem('token')}`,
});

export const fetchInquiries = async (params = {}) => {
  const { search, status, type, limit = 10, page = 1 } = params;

  const res = await axios.get(`${API_URL}/inquiries`, {
    params: {
      search,
      status,
      type,
      limit,
      page,
    },
    headers: getAuthHeaders(),
  });

  return res.data;
};

export const fetchInquiryStats = async () => {
  const res = await axios.get(`${API_URL}/inquiries/stats`, {
    headers: getAuthHeaders(),
  });

  return res.data;
};

export const fetchUnreadCount = async () => {
  const res = await axios.get(`${API_URL}/inquiries/unread-count`, {
    headers: getAuthHeaders(),
  });

  return res.data;
};

export const fetchInquiryById = async (id) => {
  const res = await axios.get(`${API_URL}/inquiries/${id}`, {
    headers: getAuthHeaders(),
  });

  return res.data;
};

export const updateInquiry = async (id, data) => {
  const res = await axios.put(
    `${API_URL}/inquiries/${id}`,
    data,
    {
      headers: getAuthHeaders(),
    }
  );

  return res.data;
};

export const updateInquiryStatus = async (id, status) => {
  const res = await axios.patch(
    `${API_URL}/inquiries/${id}/status`,
    { status },
    {
      headers: getAuthHeaders(),
    }
  );

  return res.data;
};

export const assignInquiry = async (id, assignedAdminId) => {
  const res = await axios.patch(
    `${API_URL}/inquiries/${id}/assign`,
    { assignedAdminId },
    {
      headers: getAuthHeaders(),
    }
  );

  return res.data;
};

export const deleteInquiry = async (id) => {
  const res = await axios.delete(
    `${API_URL}/inquiries/${id}`,
    {
      headers: getAuthHeaders(),
    }
  );

  return res.data;
};

export const fetchAdmins = async () => {
  const res = await axios.get(
    `${API_URL}/auth/users`,
    {
      headers: getAuthHeaders(),
    }
  );

  return res.data;
};
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api/v1';

/**
 * Fetch all media files with optional pagination, search, and fileType filter.
 * GET /api/v1/media
 * Query params: page, limit, search, fileType
 */
export async function fetchFiles({ page = 1, limit = 50, search = '', fileType = '' } = {}) {
  const params = new URLSearchParams({ page, limit });
  if (search) params.append('search', search);
  if (fileType) params.append('fileType', fileType);

  const res = await fetch(`${BASE_URL}/media?${params.toString()}`);
  if (!res.ok) throw new Error(`Failed to fetch files: ${res.status}`);
  const json = await res.json();
  // Shape: { success, message, data: [...], pagination: {...} }
  return json;
}

/**
 * Fetch media stats
 * GET /api/v1/media/stats
 */
export async function fetchMediaStats() {
  const res = await fetch(`${BASE_URL}/media/stats`);
  if (!res.ok) throw new Error(`Failed to fetch stats: ${res.status}`);
  const json = await res.json();
  return json.data;
}

/**
 * Upload a file to the media library.
 * POST /api/v1/media/upload  (multipart/form-data, field name: 'file')
 */
export async function uploadFile(file) {
  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch(`${BASE_URL}/media/upload`, {
    method: 'POST',
    body: formData,
    // Do NOT set Content-Type header — browser sets it with boundary automatically
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Upload failed: ${res.status}`);
  }
  const json = await res.json();
  // Shape: { success, message, data: { id, fileName, originalName, fileUrl, fileType, size, createdAt } }
  return json.data;
}

/**
 * Soft-delete a file by ID.
 * DELETE /api/v1/media/:id
 */
export async function deleteFile(id) {
  const res = await fetch(`${BASE_URL}/media/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error(`Delete failed: ${res.status}`);
  return res.json();
}

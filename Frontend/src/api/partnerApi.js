const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api/v1';

/**
 * Fetch all partners.
 * GET /api/v1/partners
 * Query params: page, limit, search, category, status (ACTIVE | INACTIVE)
 */
export async function fetchPartners({ page = 1, limit = 50, search = '', category = '', status = '' } = {}) {
  const params = new URLSearchParams({ page, limit });
  if (search) params.append('search', search);
  if (category) params.append('category', category);
  if (status) params.append('status', status);

  const res = await fetch(`${BASE_URL}/partners?${params.toString()}`);
  if (!res.ok) throw new Error(`Failed to fetch partners: ${res.status}`);
  return res.json();
  // Shape: { success, message, data: [...], pagination: {...} }
}

/**
 * Create a new partner.
 * POST /api/v1/partners
 * Body fields: name, description?, logo?, website?, category?, status? (ACTIVE|INACTIVE)
 */
export async function createPartner(body) {
  const res = await fetch(`${BASE_URL}/partners`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Create failed: ${res.status}`);
  }
  const json = await res.json();
  return json.data;
}

/**
 * Update a partner.
 * PUT /api/v1/partners/:id
 * Body fields: name?, description?, logo?, website?, category?, status?
 */
export async function updatePartner(id, body) {
  const res = await fetch(`${BASE_URL}/partners/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Update failed: ${res.status}`);
  }
  const json = await res.json();
  return json.data;
}

/**
 * Soft-delete a partner.
 * DELETE /api/v1/partners/:id
 */
export async function deletePartner(id) {
  const res = await fetch(`${BASE_URL}/partners/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error(`Delete failed: ${res.status}`);
  return res.json();
}

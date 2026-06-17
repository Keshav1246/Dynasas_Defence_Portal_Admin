const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api/v1';

/**
 * Fetch all partners.
 * GET /api/v1/partners
 * Query params: page, limit, search, category, status (ACTIVE | INACTIVE)
 */
export async function fetchPartners(params = {}) {
  const query = new URLSearchParams();
  if (params.page) query.append('page', params.page);
  if (params.limit) query.append('limit', params.limit);
  if (params.search) query.append('search', params.search);
  if (params.status) query.append('status', params.status);

  const res = await fetch(`${BASE_URL}/partners?${query.toString()}`);
  if (!res.ok) throw new Error('Failed to fetch partners');
  const json = await res.json();
  return {
    data: json.data,
    pagination: json.pagination,
    stats: json.stats,
  };
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

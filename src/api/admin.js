import { fetcher } from "@/lib/fetcher";

/**
 * Fetch platform stats for admin dashboard
 */
export async function getAdminStats(headers = {}) {
  return fetcher("/api/admin/stats", {
    headers: {
      ...headers,
    },
  });
}

/**
 * Fetch ALL properties across all users for admin with search & status filters
 */
export async function getAllAdminProperties(params = {}, headers = {}) {
  const query = new URLSearchParams();
  if (params.search) query.set("search", params.search);
  if (params.status) query.set("status", params.status);
  if (params.type) query.set("type", params.type);
  if (params.sort) query.set("sort", params.sort);

  const queryString = query.toString();
  const endpoint = `/api/properties/admin/all${queryString ? `?${queryString}` : ""}`;

  return fetcher(endpoint, {
    headers: {
      ...headers,
    },
  });
}

/**
 * Update property approval status (Approved, Rejected, Pending)
 */
export async function updatePropertyStatus(id, status, headers = {}) {
  return fetcher(`/api/properties/${id}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify({ status }),
  });
}

/**
 * Fetch all registered platform users for admin
 */
export async function getAllUsers(params = {}, headers = {}) {
  const query = new URLSearchParams();
  if (params.search) query.set("search", params.search);
  if (params.role) query.set("role", params.role);
  if (params.status) query.set("status", params.status);

  const queryString = query.toString();
  const endpoint = `/api/admin/users${queryString ? `?${queryString}` : ""}`;

  return fetcher(endpoint, {
    headers: {
      ...headers,
    },
  });
}

/**
 * Update user status (active vs restricted)
 */
export async function updateUserStatus(id, status, headers = {}) {
  return fetcher(`/api/admin/users/${id}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify({ status }),
  });
}

/**
 * Update user role (user vs admin)
 */
export async function updateUserRole(id, role, headers = {}) {
  return fetcher(`/api/admin/users/${id}/role`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify({ role }),
  });
}

/**
 * Delete user account
 */
export async function deleteUser(id, headers = {}) {
  return fetcher(`/api/admin/users/${id}`, {
    method: "DELETE",
    headers: {
      ...headers,
    },
  });
}

import { fetcher } from "@/lib/fetcher";

/**
 * Data fetching operations for properties (GET requests only)
 */

export async function getProperties(params = {}) {
  return fetcher("/api/properties", {
    query: params,
  });
}

export async function getPropertyById(id) {
  return fetcher(`/api/properties/${id}`);
}

export async function getMyProperties(headers = {}) {
  return fetcher("/api/properties/user/my", { headers });
}

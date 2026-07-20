import { fetcher } from "@/lib/fetcher";

/**
 * Mutation operations for properties (POST / PUT / DELETE)
 */

export async function createProperty(propertyData, headers = {}) {
  return fetcher("/api/properties", {
    method: "POST",
    body: propertyData,
    headers,
  });
}

export async function updateProperty(id, propertyData, headers = {}) {
  return fetcher(`/api/properties/${id}`, {
    method: "PUT",
    body: propertyData,
    headers,
  });
}

export async function deleteProperty(id, headers = {}) {
  return fetcher(`/api/properties/${id}`, {
    method: "DELETE",
    headers,
  });
}

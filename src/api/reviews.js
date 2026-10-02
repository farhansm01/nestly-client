import { fetcher } from "@/lib/fetcher";

/**
 * Data fetching operations for property reviews (GET requests only)
 */

export async function getPropertyReviews(propertyId) {
  if (!propertyId) return null;
  return fetcher(`/api/reviews/property/${propertyId}`);
}

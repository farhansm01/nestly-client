import { fetcher } from "@/lib/fetcher";

/**
 * Mutation operations for property reviews (POST / DELETE requests)
 */

export async function submitReview({ propertyId, rating, comment }, headers = {}) {
  return fetcher("/api/reviews", {
    method: "POST",
    headers,
    body: { propertyId, rating, comment },
  });
}

export async function deleteReview(reviewId, headers = {}) {
  return fetcher(`/api/reviews/${reviewId}`, {
    method: "DELETE",
    headers,
  });
}

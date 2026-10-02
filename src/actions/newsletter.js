import { fetcher } from "@/lib/fetcher";

/**
 * Subscribe email to AI Real Estate Market Alerts
 */
export async function subscribeToNewsletter(email) {
  return fetcher("/api/newsletter/subscribe", {
    method: "POST",
    body: { email },
  });
}

/**
 * Get active subscriber count or list
 */
export async function getSubscribers() {
  return fetcher("/api/newsletter/subscribers");
}

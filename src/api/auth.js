import { fetcher } from "@/lib/fetcher";

/**
 * Data fetching (GET) operations for authentication & user session
 */

export async function getCurrentUser() {
  return fetcher("/api/auth/me");
}

export async function getAuthSession() {
  return fetcher("/api/auth/session");
}

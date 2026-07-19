import { fetcher } from "@/lib/fetcher";

/**
 * Mutation (POST / PUT / DELETE) operations for authentication
 */

export async function loginUser(credentials) {
  return fetcher("/api/auth/login", {
    method: "POST",
    body: credentials,
  });
}

export async function registerUser(userData) {
  return fetcher("/api/auth/register", {
    method: "POST",
    body: userData,
  });
}

export async function logoutUser() {
  return fetcher("/api/auth/logout", {
    method: "POST",
  });
}

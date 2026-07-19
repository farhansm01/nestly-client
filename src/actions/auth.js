import { authClient } from "@/lib/auth-client";

/**
 * Mutation (POST / PUT / DELETE) operations for authentication
 */

export async function loginUser(credentials) {
  return authClient.signIn.email(credentials);
}

export async function registerUser(userData) {
  return authClient.signUp.email(userData);
}

export async function logoutUser() {
  return authClient.signOut();
}

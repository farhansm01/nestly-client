import { createAuthClient } from "better-auth/react";

/**
 * BetterAuth Client Configuration for nestly-client
 * Pinned to v1.6.11 as per AGENTS.md requirements
 */
export const authClient = createAuthClient({
  baseURL:
    process.env.NEXT_PUBLIC_BETTER_AUTH_URL ||
    process.env.NEXT_PUBLIC_SERVER_URL ||
    process.env.NEXT_PUBLIC_BASE_URL ||
    "http://localhost:3000",
});

export const {
  useSession,
  signIn,
  signOut,
  signUp,
} = authClient;

export default authClient;

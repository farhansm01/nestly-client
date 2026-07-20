import { createAuthClient } from "better-auth/react";

/**
 * BetterAuth Client Configuration for nestly-client
 * Dynamic baseURL fallback automatically adapts to Vercel production domain
 */
const getBaseURL = () => {
  if (process.env.NEXT_PUBLIC_BETTER_AUTH_URL) {
    return process.env.NEXT_PUBLIC_BETTER_AUTH_URL;
  }
  if (typeof window !== "undefined" && window.location.origin) {
    return window.location.origin;
  }
  return "https://nestly-client-silk.vercel.app";
};

export const authClient = createAuthClient({
  baseURL: getBaseURL(),
});

export const {
  useSession,
  signIn,
  signOut,
  signUp,
} = authClient;

export default authClient;

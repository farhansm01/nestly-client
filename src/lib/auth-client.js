import { createAuthClient } from "better-auth/react";

/**
 * BetterAuth Client Configuration for nestly-client
 * In browser environments, strictly enforces window.location.origin to prevent localhost fallback
 */
const getClientBaseURL = () => {
  if (typeof window !== "undefined" && window.location?.origin) {
    return window.location.origin;
  }
  const envUrl = process.env.NEXT_PUBLIC_BETTER_AUTH_URL;
  if (envUrl && !envUrl.includes("localhost")) {
    return envUrl;
  }
  return "https://nestly-client-silk.vercel.app";
};

export const authClient = createAuthClient({
  baseURL: getClientBaseURL(),
});

export const {
  useSession,
  signIn,
  signOut,
  signUp,
} = authClient;

export default authClient;

import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import clientPromise from "@/lib/db";

const client = await clientPromise;
const db = client.db("nestify");

const getServerBaseURL = () => {
  const envUrl = process.env.BETTER_AUTH_URL || process.env.NEXT_PUBLIC_BETTER_AUTH_URL;
  if (envUrl && !envUrl.includes("localhost")) {
    return envUrl;
  }
  if (typeof window !== "undefined" && window.location?.origin) {
    return window.location.origin;
  }
  return "https://nestly-client-silk.vercel.app";
};

export const auth = betterAuth({
  database: mongodbAdapter(db),
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: getServerBaseURL(),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "buyer",
      },
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    },
  },
});

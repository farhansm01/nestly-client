"use client";

import { createContext, useContext } from "react";
import { useSession } from "@/lib/auth-client";

const AuthContext = createContext({
  user: null,
  session: null,
  isPending: true,
  error: null,
});

export function AuthProvider({ children }) {
  const { data: sessionData, isPending, error } = useSession();

  const value = {
    user: sessionData?.user || null,
    session: sessionData?.session || null,
    isPending,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthProvider;

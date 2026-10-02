"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/AuthProvider";

export default function RoleGuard({ children, allowedRoles = ["user", "buyer", "seller", "agent", "admin"] }) {
  const { user, isPending } = useAuth();
  const router = useRouter();

  const getUserRole = (u) => {
    if (!u) return "user";
    if (u.role && typeof u.role === "string" && u.role.toLowerCase() === "admin") return "admin";
    if (u.email && typeof u.email === "string" && u.email.toLowerCase().includes("admin")) return "admin";
    return (u.role || "user").toLowerCase();
  };

  const userRole = getUserRole(user);
  const isAuthorized =
    userRole === "admin" ||
    allowedRoles.map((r) => String(r).toLowerCase()).includes(userRole);

  useEffect(() => {
    if (!isPending) {
      if (!user) {
        router.push("/login");
      } else if (!isAuthorized) {
        router.push("/unauthorized");
      }
    }
  }, [user, isPending, isAuthorized, router]);

  if (isPending) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-[var(--bg-main)]">
        <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-sm font-medium text-[var(--text-muted)]">Verifying permissions...</p>
      </div>
    );
  }

  if (!user || !isAuthorized) {
    return null;
  }

  return <>{children}</>;
}

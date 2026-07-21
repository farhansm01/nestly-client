"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/AuthProvider";

export default function RoleGuard({ children, allowedRoles = ["user", "buyer", "seller", "agent", "admin"] }) {
  const { user, isPending } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isPending) {
      if (!user) {
        router.push("/login");
      } else {
        const userRole = user.role || "user";
        // Super admin has permission to access all dashboard tools
        const isAuthorized = userRole === "admin" || allowedRoles.includes(userRole);
        if (!isAuthorized) {
          router.push("/unauthorized");
        }
      }
    }
  }, [user, isPending, allowedRoles, router]);

  if (isPending) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-[var(--bg-main)]">
        <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-sm font-medium text-[var(--text-muted)]">Verifying permissions...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const userRole = user.role || "user";
  const isAuthorized = userRole === "admin" || allowedRoles.includes(userRole);
  if (!isAuthorized) {
    return null;
  }

  return <>{children}</>;
}

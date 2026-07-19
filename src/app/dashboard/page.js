"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/AuthProvider";

export default function DashboardRouter() {
  const { user, isPending } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isPending) {
      if (!user) {
        router.push("/login");
      } else {
        const role = user.role || "buyer";
        if (role === "admin") {
          router.push("/dashboard/admin");
        } else if (role === "seller" || role === "agent") {
          router.push("/dashboard/seller");
        } else {
          router.push("/dashboard/buyer");
        }
      }
    }
  }, [user, isPending, router]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-[var(--bg-main)]">
      <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mb-4" />
      <p className="text-sm font-medium text-[var(--text-muted)]">Routing to your dashboard...</p>
    </div>
  );
}

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ManageItemsRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/dashboard/manage");
  }, [router]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center bg-[var(--bg-main)]">
      <div className="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mb-4" />
      <p className="text-sm font-medium text-[var(--text-muted)]">Redirecting to Dashboard Manage Listings...</p>
    </div>
  );
}

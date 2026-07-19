"use client";

import AuthGuard from "@/components/auth/AuthGuard";
import { HiBuildingOffice2 } from "react-icons/hi2";

export default function ManageItemsPage() {
  return (
    <AuthGuard>
      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] p-8 sm:p-12 rounded-3xl shadow-xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <HiBuildingOffice2 className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-main)]">
                Manage My Listings
              </h1>
              <p className="text-sm text-[var(--text-muted)]">
                View, edit, or delete your posted real estate properties.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[var(--bg-card-subtle)] border border-[var(--border-color)] text-sm text-[var(--text-muted)] leading-relaxed">
            🔒 Protected Route Verified: You are authenticated! The interactive listing table, view count metrics, and edit/delete actions will be implemented in Phase 6.
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}

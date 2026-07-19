"use client";

import AuthGuard from "@/components/auth/AuthGuard";
import { Plus } from "@gravity-ui/icons";

export default function AddItemPage() {
  return (
    <AuthGuard>
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] p-8 sm:p-12 rounded-3xl shadow-xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-600/10 text-teal-500 flex items-center justify-center">
              <Plus className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-main)]">
                Add New Property Listing
              </h1>
              <p className="text-sm text-[var(--text-muted)]">
                List your apartment, villa, or penthouse on Nestly AI platform.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[var(--bg-card-subtle)] border border-[var(--border-color)] text-sm text-[var(--text-muted)] leading-relaxed">
            ✨ Protected Route Verified: You are authenticated! Form inputs for title, price, location, description, and images will be implemented in Phase 6.
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}

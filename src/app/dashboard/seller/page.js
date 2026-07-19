"use client";

import RoleGuard from "@/components/auth/RoleGuard";
import { useAuth } from "@/components/providers/AuthProvider";
import { motion } from "framer-motion";
import Link from "next/link";
import { HiBuildingOffice2, HiPlusCircle, HiEye, HiDocumentText } from "react-icons/hi2";

export default function SellerDashboardPage() {
  const { user } = useAuth();

  return (
    <RoleGuard allowedRoles={["seller", "agent", "admin"]}>
      <div className="space-y-8 max-w-6xl mx-auto">
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-main)]">
                Welcome back, {user?.name || "Seller"}
              </h1>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-500 border border-amber-500/30">
                Agent / Seller
              </span>
            </div>
            <p className="text-sm text-[var(--text-muted)]">
              Manage your active real estate listings, track views, and respond to buyer inquiries.
            </p>
          </div>

          <Link
            href="/items/add"
            className="btn bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl px-5 border-none shadow-md flex items-center gap-2 w-fit"
          >
            <HiPlusCircle className="w-5 h-5" />
            <span>Add Property</span>
          </Link>
        </div>

        {/* Activity Stat Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <motion.div
            whileHover={{ y: -4 }}
            className="p-6 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-lg flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-500 flex items-center justify-center">
              <HiBuildingOffice2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                Active Listings
              </p>
              <p className="text-3xl font-black text-[var(--text-main)] mt-0.5">0</p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            className="p-6 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-lg flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <HiEye className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                Listing Views
              </p>
              <p className="text-3xl font-black text-[var(--text-main)] mt-0.5">0</p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            className="p-6 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-lg flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
              <HiDocumentText className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                Buyer Inquiries
              </p>
              <p className="text-3xl font-black text-[var(--text-main)] mt-0.5">0</p>
            </div>
          </motion.div>
        </div>

        {/* Listings Table Container */}
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] p-8 rounded-3xl shadow-xl space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-[var(--text-main)]">
              My Posted Listings
            </h2>
            <span className="text-xs text-[var(--text-muted)] font-medium">0 Total Listings</span>
          </div>

          <div className="p-12 text-center border-2 border-dashed border-[var(--border-color)] rounded-2xl space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[var(--bg-card-subtle)] flex items-center justify-center text-[var(--text-muted)] mx-auto">
              <HiBuildingOffice2 className="w-6 h-6" />
            </div>
            <p className="text-base font-bold text-[var(--text-main)]">No property listings posted yet</p>
            <p className="text-xs text-[var(--text-muted)] max-w-sm mx-auto">
              Ready to sell or rent your home? Click the button below to add your first property listing.
            </p>
            <Link
              href="/items/add"
              className="btn btn-sm bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl px-5 border-none mt-2"
            >
              Post a Property
            </Link>
          </div>
        </div>
      </div>
    </RoleGuard>
  );
}

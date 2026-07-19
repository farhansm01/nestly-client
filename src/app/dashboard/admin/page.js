"use client";

import RoleGuard from "@/components/auth/RoleGuard";
import { useAuth } from "@/components/providers/AuthProvider";
import { motion } from "framer-motion";
import Link from "next/link";
import { HiShieldCheck, HiUsers, HiBuildingOffice2, HiChartBar, HiPlusCircle } from "react-icons/hi2";

export default function AdminDashboardPage() {
  const { user } = useAuth();

  return (
    <RoleGuard allowedRoles={["admin"]}>
      <div className="space-y-8 max-w-6xl mx-auto">
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-main)]">
                System Administration
              </h1>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-500 border border-red-500/30 flex items-center gap-1">
                <HiShieldCheck className="w-3.5 h-3.5" /> Super Admin
              </span>
            </div>
            <p className="text-sm text-[var(--text-muted)]">
              Welcome back, {user?.name || "Admin"}. Platform-wide governance, moderation, and user management.
            </p>
          </div>

          <Link
            href="/items/add"
            className="btn bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl px-5 border-none shadow-md flex items-center gap-2 w-fit"
          >
            <HiPlusCircle className="w-5 h-5" />
            <span>Create Admin Listing</span>
          </Link>
        </div>

        {/* Activity Stat Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
          <motion.div
            whileHover={{ y: -4 }}
            className="p-6 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-lg flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-500 flex items-center justify-center">
              <HiBuildingOffice2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                Total Listings
              </p>
              <p className="text-3xl font-black text-[var(--text-main)] mt-0.5">15,420</p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            className="p-6 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-lg flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <HiUsers className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                Total Users
              </p>
              <p className="text-3xl font-black text-[var(--text-main)] mt-0.5">8,950</p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            className="p-6 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-lg flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
              <HiChartBar className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                Volume
              </p>
              <p className="text-3xl font-black text-[var(--text-main)] mt-0.5">$1.4B</p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            className="p-6 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-lg flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <HiShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                AI Accuracy
              </p>
              <p className="text-3xl font-black text-[var(--text-main)] mt-0.5">99.4%</p>
            </div>
          </motion.div>
        </div>

        {/* Administration Table Section */}
        <div id="users" className="bg-[var(--bg-card)] border border-[var(--border-color)] p-8 rounded-3xl shadow-xl space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-[var(--text-main)]">
              System Property Moderation & Governance
            </h2>
            <span className="text-xs text-emerald-500 font-bold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              ● All Systems Operational
            </span>
          </div>

          <div className="p-10 rounded-2xl bg-[var(--bg-card-subtle)] border border-[var(--border-color)] text-sm text-[var(--text-muted)] leading-relaxed">
            🛡️ Admin Control Panel Active: As a Super Admin, you have full access to platform-wide metrics, system moderation, and user role overrides.
          </div>
        </div>
      </div>
    </RoleGuard>
  );
}

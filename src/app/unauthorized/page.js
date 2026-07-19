"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { HiShieldExclamation, HiHome, HiArrowLeft } from "react-icons/hi2";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[var(--bg-main)] py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-[var(--bg-card)] p-8 sm:p-10 rounded-3xl border border-[var(--border-color)] shadow-2xl text-center space-y-6"
      >
        <div className="w-16 h-16 rounded-3xl bg-red-500/10 text-red-500 flex items-center justify-center mx-auto border border-red-500/20">
          <HiShieldExclamation className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold tracking-widest text-red-500 uppercase">
            403 Forbidden
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-main)]">
            Access Denied
          </h1>
          <p className="text-sm text-[var(--text-muted)] leading-relaxed">
            You do not have permission to view this page. This area is restricted to specific authorized roles.
          </p>
        </div>

        <div className="pt-4 border-t border-[var(--border-color)] flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/dashboard"
            className="w-full sm:w-auto btn bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl px-5 border-none shadow-md flex items-center justify-center gap-2"
          >
            <HiArrowLeft className="w-4 h-4" />
            <span>Go to My Dashboard</span>
          </Link>
          <Link
            href="/"
            className="w-full sm:w-auto btn bg-[var(--bg-card-subtle)] hover:bg-[var(--bg-main)] text-[var(--text-main)] border border-[var(--border-color)] font-medium rounded-xl px-5 flex items-center justify-center gap-2"
          >
            <HiHome className="w-4 h-4 text-teal-500" />
            <span>Home</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

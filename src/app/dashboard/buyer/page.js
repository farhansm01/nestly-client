"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import RoleGuard from "@/components/auth/RoleGuard";
import { useAuth } from "@/components/providers/AuthProvider";
import PropertyCard from "@/components/properties/PropertyCard";
import PropertySkeletonGrid from "@/components/properties/PropertySkeletonGrid";
import { getProperties } from "@/api/properties";
import { HiHeart, HiDocumentText, HiBuildingOffice2, HiSparkles } from "react-icons/hi2";

export default function BuyerDashboardPage() {
  const { user } = useAuth();
  const [savedHomes, setSavedHomes] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadBuyerData = async () => {
    try {
      setLoading(true);
      const storedIds = JSON.parse(localStorage.getItem("nestly_saved_properties") || "[]");

      if (storedIds.length === 0) {
        setSavedHomes([]);
        setLoading(false);
        return;
      }

      const res = await getProperties({ limit: 50 });
      if (res?.data && Array.isArray(res.data)) {
        const filtered = res.data.filter((p) => storedIds.includes(p._id || p.id));
        setSavedHomes(filtered);
      } else {
        setSavedHomes([]);
      }
    } catch (err) {
      setSavedHomes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBuyerData();

    const handleSavedUpdated = () => loadBuyerData();
    window.addEventListener("nestly_saved_updated", handleSavedUpdated);
    window.addEventListener("storage", handleSavedUpdated);

    return () => {
      window.removeEventListener("nestly_saved_updated", handleSavedUpdated);
      window.removeEventListener("storage", handleSavedUpdated);
    };
  }, []);

  const savedCount = savedHomes.length;

  return (
    <RoleGuard allowedRoles={["buyer", "user"]}>
      <div className="space-y-8 max-w-6xl mx-auto">
        {/* Welcome Header */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-main)]">
              Welcome back, {user?.name || "Buyer"}
            </h1>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-500 border border-teal-500/30">
              Buyer Account
            </span>
          </div>
          <p className="text-sm text-[var(--text-muted)]">
            Here's a look at your real estate activity, bookmarked listings, and AI lease analysis.
          </p>
        </div>

        {/* Activity Stat Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <motion.div
            whileHover={{ y: -4 }}
            className="p-6 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-lg flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-500 flex items-center justify-center">
              <HiHeart className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                Saved Homes
              </p>
              <p className="text-3xl font-black text-[var(--text-main)] mt-0.5">{savedCount}</p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            className="p-6 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-lg flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <HiDocumentText className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                Tour Requests
              </p>
              <p className="text-3xl font-black text-[var(--text-main)] mt-0.5">
                {savedCount > 0 ? 2 : 0}
              </p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            className="p-6 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-lg flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
              <HiSparkles className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                AI Lease Audits
              </p>
              <p className="text-3xl font-black text-[var(--text-main)] mt-0.5">1</p>
            </div>
          </motion.div>
        </div>

        {/* Content Section */}
        <div id="saved" className="bg-[var(--bg-card)] border border-[var(--border-color)] p-6 sm:p-8 rounded-3xl shadow-xl space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-[var(--text-main)]">
              Saved Favorites & Shortlist ({savedCount})
            </h2>
            <Link href="/items" className="text-xs font-bold text-teal-500 hover:underline">
              Explore All Listings →
            </Link>
          </div>

          {loading ? (
            <PropertySkeletonGrid count={3} />
          ) : savedHomes.length === 0 ? (
            <div className="p-12 text-center border-2 border-dashed border-[var(--border-color)] rounded-2xl space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[var(--bg-card-subtle)] flex items-center justify-center text-[var(--text-muted)] mx-auto">
                <HiBuildingOffice2 className="w-6 h-6" />
              </div>
              <p className="text-base font-bold text-[var(--text-main)]">No saved properties yet</p>
              <p className="text-xs text-[var(--text-muted)] max-w-sm mx-auto">
                Browse our real estate collection and click the heart icon to save your favorites here.
              </p>
              <Link
                href="/items"
                className="btn btn-sm bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl px-5 border-none mt-2"
              >
                Browse Properties
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedHomes.slice(0, 3).map((prop) => (
                <PropertyCard key={prop._id || prop.id} property={prop} />
              ))}
            </div>
          )}
        </div>
      </div>
    </RoleGuard>
  );
}

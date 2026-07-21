"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import RoleGuard from "@/components/auth/RoleGuard";
import PropertyCard from "@/components/properties/PropertyCard";
import PropertySkeletonGrid from "@/components/properties/PropertySkeletonGrid";
import { getProperties } from "@/api/properties";
import { HiHeart, HiBuildingOffice2, HiTrash } from "react-icons/hi2";

export default function DashboardSavedHomesPage() {
  const [savedProperties, setSavedProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadSavedHomes = async () => {
    try {
      setLoading(true);
      const storedIds = JSON.parse(localStorage.getItem("nestly_saved_properties") || "[]");

      if (storedIds.length === 0) {
        setSavedProperties([]);
        setLoading(false);
        return;
      }

      const res = await getProperties({ limit: 100 });
      if (res?.data && Array.isArray(res.data)) {
        const filtered = res.data.filter((p) => storedIds.includes(p._id || p.id));
        setSavedProperties(filtered);
      } else {
        setSavedProperties([]);
      }
    } catch (err) {
      toast.error("Failed to load saved properties");
      setSavedProperties([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSavedHomes();

    const handleSavedUpdated = () => loadSavedHomes();
    window.addEventListener("nestly_saved_updated", handleSavedUpdated);
    window.addEventListener("storage", handleSavedUpdated);

    return () => {
      window.removeEventListener("nestly_saved_updated", handleSavedUpdated);
      window.removeEventListener("storage", handleSavedUpdated);
    };
  }, []);

  const handleClearSaved = () => {
    localStorage.removeItem("nestly_saved_properties");
    setSavedProperties([]);
    window.dispatchEvent(new Event("nestly_saved_updated"));
    toast.success("Cleared all saved homes");
  };

  return (
    <RoleGuard allowedRoles={["user", "buyer", "seller", "agent", "admin"]}>
      <div className="space-y-8 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-main)]">
                Saved Homes & Favorites
              </h1>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-red-500/15 text-red-500 border border-red-500/30 flex items-center gap-1">
                <HiHeart className="w-3.5 h-3.5" />
                {savedProperties.length} Saved
              </span>
            </div>
            <p className="text-sm text-[var(--text-muted)]">
              Your bookmarked real estate listings saved to your local session collection.
            </p>
          </div>

          {savedProperties.length > 0 && (
            <button
              onClick={handleClearSaved}
              className="btn btn-sm bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 rounded-xl px-4 flex items-center gap-1.5"
            >
              <HiTrash className="w-4 h-4" /> Clear All Saved
            </button>
          )}
        </div>

        {/* Listings Grid */}
        {loading ? (
          <PropertySkeletonGrid count={4} />
        ) : savedProperties.length === 0 ? (
          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] p-12 rounded-3xl text-center space-y-4 shadow-xl">
            <div className="w-14 h-14 rounded-2xl bg-red-500/10 text-red-500 flex items-center justify-center mx-auto">
              <HiHeart className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-[var(--text-main)]">No saved homes yet</h3>
            <p className="text-xs text-[var(--text-muted)] max-w-sm mx-auto">
              Click the heart icon on any property card or listing detail page to save homes to your personal collection.
            </p>
            <Link
              href="/items"
              className="btn btn-sm bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl px-6 border-none mt-2 inline-flex"
            >
              Explore Properties
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedProperties.map((prop) => (
              <PropertyCard key={prop._id || prop.id} property={prop} />
            ))}
          </div>
        )}
      </div>
    </RoleGuard>
  );
}

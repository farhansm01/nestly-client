"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import RoleGuard from "@/components/auth/RoleGuard";
import { useAuth } from "@/components/providers/AuthProvider";
import PropertyCard from "@/components/properties/PropertyCard";
import PropertySkeletonGrid from "@/components/properties/PropertySkeletonGrid";
import { getMyProperties, getProperties } from "@/api/properties";
import {
  HiBuildingOffice2,
  HiPlusCircle,
  HiHeart,
  HiEye,
  HiSparkles,
  HiMapPin,
  HiPencilSquare,
  HiMagnifyingGlass,
} from "react-icons/hi2";

export default function UnifiedUserDashboardPage() {
  const { user, isPending } = useAuth();
  const router = useRouter();
  const [myListings, setMyListings] = useState([]);
  const [savedHomes, setSavedHomes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isPending) {
      if (!user) {
        router.push("/login");
        return;
      }
      if (user.role === "admin") {
        router.push("/dashboard/admin");
        return;
      }
    }
  }, [user, isPending, router]);

  const loadDashboardData = async () => {
    if (!user) return;
    try {
      setLoading(true);
      // Load user's posted listings
      const headers = {};
      if (user?.id || user?._id) {
        headers["x-user-id"] = user.id || user._id;
        headers["x-user-name"] = user.name || "User";
        headers["x-user-email"] = user.email || "";
        headers["x-user-role"] = user.role || "user";
      }
      const myRes = await getMyProperties(headers);
      if (myRes?.data && Array.isArray(myRes.data)) {
        setMyListings(myRes.data);
      } else {
        setMyListings([]);
      }

      // Load saved favorites dynamically from localStorage
      const storedIds = JSON.parse(localStorage.getItem("nestly_saved_properties") || "[]");
      if (storedIds.length === 0) {
        setSavedHomes([]);
      } else {
        const allRes = await getProperties({ limit: 50 });
        if (allRes?.data && Array.isArray(allRes.data)) {
          const filtered = allRes.data.filter((p) => storedIds.includes(p._id || p.id));
          setSavedHomes(filtered);
        } else {
          setSavedHomes([]);
        }
      }
    } catch (err) {
      setMyListings([]);
      setSavedHomes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();

    const handleSavedUpdated = () => loadDashboardData();
    window.addEventListener("nestly_saved_updated", handleSavedUpdated);
    window.addEventListener("storage", handleSavedUpdated);

    return () => {
      window.removeEventListener("nestly_saved_updated", handleSavedUpdated);
      window.removeEventListener("storage", handleSavedUpdated);
    };
  }, [user]);

  if (isPending || !user) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-[var(--bg-main)]">
        <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-sm font-medium text-[var(--text-muted)]">Loading your workspace...</p>
      </div>
    );
  }

  const activeListingsCount = myListings.length;
  const savedCount = savedHomes.length;
  const totalViews = myListings.reduce((sum, item) => sum + (item.views || 0), 0);

  return (
    <RoleGuard allowedRoles={["user", "buyer", "seller", "agent"]}>
      <div className="space-y-8 max-w-6xl mx-auto">
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-main)]">
                Welcome back, {user?.name || "User"}
              </h1>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-500 border border-teal-500/30 uppercase tracking-wider">
                Nestly Member
              </span>
            </div>
            <p className="text-sm text-[var(--text-muted)]">
              Manage your real estate listings, search & save homes, and view AI market intelligence.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/items"
              className="btn btn-sm bg-[var(--bg-card-subtle)] hover:bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-main)] font-bold rounded-xl px-4 flex items-center gap-2"
            >
              <HiMagnifyingGlass className="w-4 h-4 text-teal-500" />
              <span>Explore Homes</span>
            </Link>

            <Link
              href="/dashboard/add"
              className="btn btn-sm bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl px-4 border-none shadow-md flex items-center gap-1.5"
            >
              <HiPlusCircle className="w-4 h-4" />
              <span>Add Property</span>
            </Link>
          </div>
        </div>

        {/* Activity Stat Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 sm:gap-6">
          <motion.div
            whileHover={{ y: -4 }}
            className="p-5 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-lg flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-500 flex items-center justify-center shrink-0">
              <HiBuildingOffice2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                My Listings
              </p>
              <p className="text-2xl font-black text-[var(--text-main)] mt-0.5">{activeListingsCount}</p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            className="p-5 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-lg flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 text-red-500 flex items-center justify-center shrink-0">
              <HiHeart className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                Saved Homes
              </p>
              <p className="text-2xl font-black text-[var(--text-main)] mt-0.5">{savedCount}</p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            className="p-5 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-lg flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
              <HiEye className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                Listing Views
              </p>
              <p className="text-2xl font-black text-[var(--text-main)] mt-0.5">{totalViews}</p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            className="p-5 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-lg flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center shrink-0">
              <HiSparkles className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                AI Market Score
              </p>
              <p className="text-2xl font-black text-[var(--text-main)] mt-0.5">98%</p>
            </div>
          </motion.div>
        </div>

        {/* AI Recommendations & Market Banner */}
        <div className="bg-gradient-to-r from-teal-900/40 to-slate-900 border border-teal-500/30 p-6 sm:p-8 rounded-3xl shadow-xl space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center border border-teal-500/30">
                <HiSparkles className="w-6 h-6 text-amber-400 animate-pulse" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Nestly AI Real Estate Intelligence</h3>
                <p className="text-xs text-slate-300">Continuous valuation, lease analyzer, & instant AI assistant</p>
              </div>
            </div>

            <Link
              href="/ai-features"
              className="btn btn-sm bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl px-5 border-none shadow-md"
            >
              Open AI Features →
            </Link>
          </div>
        </div>

        {/* My Posted Properties Section */}
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] p-6 sm:p-8 rounded-3xl shadow-xl space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-[var(--text-main)]">
              My Posted Properties ({activeListingsCount})
            </h2>
            <Link href="/dashboard/manage" className="text-xs font-bold text-teal-500 hover:underline">
              Manage Listings →
            </Link>
          </div>

          {loading ? (
            <div className="p-8 text-center">
              <div className="w-8 h-8 border-3 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
              <p className="text-xs text-[var(--text-muted)]">Loading your properties...</p>
            </div>
          ) : myListings.length === 0 ? (
            <div className="p-10 text-center border-2 border-dashed border-[var(--border-color)] rounded-2xl space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[var(--bg-card-subtle)] flex items-center justify-center text-[var(--text-muted)] mx-auto">
                <HiBuildingOffice2 className="w-6 h-6" />
              </div>
              <p className="text-base font-bold text-[var(--text-main)]">No property listings posted yet</p>
              <p className="text-xs text-[var(--text-muted)] max-w-sm mx-auto">
                Have a home or property to sell? Post your listing to reach verified buyers.
              </p>
              <Link
                href="/dashboard/add"
                className="btn btn-sm bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl px-5 border-none mt-2"
              >
                Post a Property
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {myListings.map((prop) => {
                const propId = prop._id || prop.id;
                const coverImage =
                  prop.image ||
                  (Array.isArray(prop.images) && prop.images[0]) ||
                  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750";
                const displayPrice =
                  typeof prop.price === "number"
                    ? `$${prop.price.toLocaleString("en-US")}`
                    : prop.formattedPrice || prop.price;

                return (
                  <div
                    key={propId}
                    className="p-4 rounded-2xl bg-[var(--bg-card-subtle)] border border-[var(--border-color)] space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="aspect-[4/3] rounded-xl overflow-hidden bg-slate-900">
                        <img src={coverImage} alt={prop.title} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h3 className="font-bold text-sm text-[var(--text-main)] line-clamp-1">
                          {prop.title}
                        </h3>
                        <p className="text-xs text-[var(--text-muted)] flex items-center gap-1 mt-0.5">
                          <HiMapPin className="w-3.5 h-3.5 text-teal-500" />
                          <span className="truncate">{prop.location}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[var(--border-color)]">
                      <span className="text-sm font-black text-teal-500">{displayPrice}</span>
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/items/${propId}`}
                          className="p-1.5 rounded-lg bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-muted)] hover:text-teal-500 text-xs"
                          title="View"
                        >
                          <HiEye className="w-4 h-4" />
                        </Link>
                        <Link
                          href="/dashboard/manage"
                          className="p-1.5 rounded-lg bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-muted)] hover:text-amber-500 text-xs"
                          title="Edit"
                        >
                          <HiPencilSquare className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Saved Favorites Section */}
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] p-6 sm:p-8 rounded-3xl shadow-xl space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-[var(--text-main)]">
              Saved Favorites Shortlist ({savedCount})
            </h2>
            <Link href="/dashboard/saved" className="text-xs font-bold text-teal-500 hover:underline">
              View All Saved →
            </Link>
          </div>

          {loading ? (
            <PropertySkeletonGrid count={3} />
          ) : savedHomes.length === 0 ? (
            <div className="p-10 text-center border-2 border-dashed border-[var(--border-color)] rounded-2xl space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[var(--bg-card-subtle)] flex items-center justify-center text-[var(--text-muted)] mx-auto">
                <HiHeart className="w-6 h-6 text-red-500" />
              </div>
              <p className="text-base font-bold text-[var(--text-main)]">No saved properties yet</p>
              <p className="text-xs text-[var(--text-muted)] max-w-sm mx-auto">
                Browse our real estate collection and click the heart icon to save your top favorites here.
              </p>
              <Link
                href="/items"
                className="btn btn-sm bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl px-5 border-none mt-2"
              >
                Explore Properties
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

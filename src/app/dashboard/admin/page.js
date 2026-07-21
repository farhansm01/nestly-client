"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import RoleGuard from "@/components/auth/RoleGuard";
import { useAuth } from "@/components/providers/AuthProvider";
import { getAdminStats, getAllAdminProperties, getAllUsers, updatePropertyStatus } from "@/api/admin";
import {
  HiUsers,
  HiBuildingOffice2,
  HiDocumentCheck,
  HiCheckCircle,
  HiXCircle,
  HiClock,
  HiMapPin,
  HiShieldCheck,
  HiChartBar,
  HiArrowRight,
} from "react-icons/hi2";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Analytics Sample Datasets for Growth Metrics
const MONTHLY_VOLUME_DATA = [
  { month: "Jan", volume: 45, transactions: 18 },
  { month: "Feb", volume: 62, transactions: 24 },
  { month: "Mar", volume: 88, transactions: 35 },
  { month: "Apr", volume: 110, transactions: 42 },
  { month: "May", volume: 145, transactions: 58 },
  { month: "Jun", volume: 190, transactions: 72 },
  { month: "Jul", volume: 240, transactions: 95 },
];

const CATEGORY_DISTRIBUTION = [
  { name: "Penthouses", value: 35, color: "#0d9488" },
  { name: "Villas", value: 30, color: "#f59e0b" },
  { name: "Apartments", value: 20, color: "#6366f1" },
  { name: "Suburban", value: 15, color: "#10b981" },
];

export default function AdminDashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProperties: 0,
    pendingApprovals: 0,
    approvedProperties: 0,
  });
  const [pendingListings, setPendingListings] = useState([]);
  const [loading, setLoading] = useState(true);

  const getHeaders = () => {
    const headers = {};
    if (user?.id || user?._id) {
      headers["x-user-id"] = user.id || user._id;
      headers["x-user-name"] = user.name || "Admin";
      headers["x-user-email"] = user.email || "admin@nestly.com";
      headers["x-user-role"] = "admin";
    }
    return headers;
  };

  const loadData = async () => {
    try {
      setLoading(true);
      const headers = getHeaders();

      const [statsRes, allPropsRes, pendingPropsRes, usersRes] = await Promise.allSettled([
        getAdminStats(headers),
        getAllAdminProperties({}, headers),
        getAllAdminProperties({ status: "Pending" }, headers),
        getAllUsers({}, headers),
      ]);

      const allListings =
        allPropsRes.status === "fulfilled" && Array.isArray(allPropsRes.value?.data)
          ? allPropsRes.value.data
          : [];

      const pendingList =
        pendingPropsRes.status === "fulfilled" && Array.isArray(pendingPropsRes.value?.data)
          ? pendingPropsRes.value.data
          : allListings.filter((p) => p.status === "Pending");

      const userList =
        usersRes.status === "fulfilled" && Array.isArray(usersRes.value?.data)
          ? usersRes.value.data
          : [];

      const totalProps = allListings.length;
      const pendingCount = pendingList.length;
      const approvedCount = allListings.filter((p) => p.status === "Approved" || !p.status).length;
      const totalUserCount = userList.length || (statsRes.status === "fulfilled" ? statsRes.value?.data?.totalUsers || 0 : 0);

      setStats({
        totalUsers: totalUserCount,
        totalProperties: totalProps,
        pendingApprovals: pendingCount,
        approvedProperties: approvedCount,
      });

      setPendingListings(pendingList);
    } catch (err) {
      toast.error("Failed to load admin overview metrics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      toast.loading(`Updating status to ${newStatus}...`, { id: "status-toast" });
      const res = await updatePropertyStatus(id, newStatus, getHeaders());
      if (res?.success) {
        toast.success(`Property ${newStatus} successfully!`, { id: "status-toast" });
        loadData();
      } else {
        toast.error(res?.message || "Failed to update status", { id: "status-toast" });
      }
    } catch (err) {
      toast.error(err.message || "Failed to update property status", { id: "status-toast" });
    }
  };

  return (
    <RoleGuard allowedRoles={["admin"]}>
      <div className="space-y-8 max-w-6xl mx-auto">
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-main)]">
                Admin Control Center
              </h1>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-500 border border-teal-500/30 flex items-center gap-1 uppercase tracking-wider">
                <HiShieldCheck className="w-3.5 h-3.5" /> Platform Admin
              </span>
            </div>
            <p className="text-sm text-[var(--text-muted)]">
              Real-time platform metrics from database, interactive analytics charts, and pending listing governance.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/dashboard/admin/users"
              className="btn btn-sm bg-[var(--bg-card-subtle)] hover:bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-main)] font-bold rounded-xl px-4 flex items-center gap-1.5"
            >
              <HiUsers className="w-4 h-4 text-teal-500" />
              <span>Manage Users</span>
            </Link>

            <Link
              href="/dashboard/manage"
              className="btn btn-sm bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl px-4 border-none shadow-md flex items-center gap-1.5"
            >
              <HiBuildingOffice2 className="w-4 h-4" />
              <span>Manage Listings</span>
            </Link>
          </div>
        </div>

        {/* Dynamic DB Stat Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 sm:gap-6">
          <motion.div
            whileHover={{ y: -4 }}
            className="p-5 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-lg flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-500 flex items-center justify-center shrink-0">
              <HiUsers className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                Total Users
              </p>
              <p className="text-2xl font-black text-[var(--text-main)] mt-0.5">{stats.totalUsers}</p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            className="p-5 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-lg flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center shrink-0">
              <HiBuildingOffice2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                Total Properties
              </p>
              <p className="text-2xl font-black text-[var(--text-main)] mt-0.5">{stats.totalProperties}</p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            className="p-5 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-lg flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
              <HiClock className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                Pending Approvals
              </p>
              <p className="text-2xl font-black text-amber-500 mt-0.5">{stats.pendingApprovals}</p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            className="p-5 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-lg flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
              <HiDocumentCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                Approved Active
              </p>
              <p className="text-2xl font-black text-emerald-500 mt-0.5">{stats.approvedProperties}</p>
            </div>
          </motion.div>
        </div>

        {/* 📊 Recharts Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Platform Transaction Volume Area Chart */}
          <div className="lg:col-span-2 bg-[var(--bg-card)] border border-[var(--border-color)] p-6 rounded-3xl shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3">
              <div>
                <h3 className="font-bold text-base text-[var(--text-main)] flex items-center gap-2">
                  <HiChartBar className="w-5 h-5 text-teal-500" /> Platform Transaction Volume Growth
                </h3>
                <p className="text-xs text-[var(--text-muted)]">Monthly listing volume ($ Millions USD)</p>
              </div>
              <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                +48% YoY
              </span>
            </div>

            <div className="h-64 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={MONTHLY_VOLUME_DATA}>
                  <defs>
                    <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0d9488" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#0d9488" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" stroke="var(--text-muted)" fontSize={12} tickLine={false} />
                  <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--bg-card)",
                      borderColor: "var(--border-color)",
                      borderRadius: "16px",
                      fontSize: "12px",
                      color: "var(--text-main)",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="volume"
                    stroke="#0d9488"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorVolume)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Property Category Distribution Donut Chart */}
          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] p-6 rounded-3xl shadow-xl space-y-4 flex flex-col justify-between">
            <div className="border-b border-[var(--border-color)] pb-3">
              <h3 className="font-bold text-base text-[var(--text-main)]">Listing Categories</h3>
              <p className="text-xs text-[var(--text-muted)]">Distribution by property type</p>
            </div>

            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={CATEGORY_DISTRIBUTION}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {CATEGORY_DISTRIBUTION.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--bg-card)",
                      borderColor: "var(--border-color)",
                      borderRadius: "12px",
                      fontSize: "12px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-semibold pt-2 border-t border-[var(--border-color)]">
              {CATEGORY_DISTRIBUTION.map((cat) => (
                <div key={cat.name} className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                  <span className="text-[var(--text-muted)] truncate">{cat.name}:</span>
                  <span className="text-[var(--text-main)] font-bold">{cat.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pending Approvals Widget */}
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] p-6 sm:p-8 rounded-3xl shadow-xl space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h2 className="text-xl font-bold text-[var(--text-main)] flex items-center gap-2">
                <HiClock className="w-5 h-5 text-amber-500" /> Pending Property Approvals ({pendingListings.length})
              </h2>
              <p className="text-xs text-[var(--text-muted)]">
                Properties listed by users that require admin review before publishing live on the Explore page.
              </p>
            </div>

            <Link href="/dashboard/manage" className="text-xs font-bold text-teal-500 hover:underline flex items-center gap-1">
              View All Listings <HiArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {loading ? (
            <div className="p-8 text-center">
              <div className="w-8 h-8 border-3 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
              <p className="text-xs text-[var(--text-muted)]">Loading pending approvals...</p>
            </div>
          ) : pendingListings.length === 0 ? (
            <div className="p-10 text-center border-2 border-dashed border-[var(--border-color)] rounded-2xl space-y-2">
              <HiCheckCircle className="w-10 h-10 text-emerald-500 mx-auto" />
              <p className="text-base font-bold text-[var(--text-main)]">All property submissions are reviewed!</p>
              <p className="text-xs text-[var(--text-muted)]">There are no pending listings requiring approval right now.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pendingListings.map((prop) => {
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
                    className="p-4 rounded-2xl bg-[var(--bg-card-subtle)] border border-[var(--border-color)] flex flex-col sm:flex-row gap-4 items-center justify-between"
                  >
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      <img
                        src={coverImage}
                        alt={prop.title}
                        className="w-16 h-16 rounded-xl object-cover shrink-0"
                      />
                      <div className="overflow-hidden">
                        <h4 className="font-bold text-sm text-[var(--text-main)] truncate">
                          {prop.title}
                        </h4>
                        <p className="text-xs text-[var(--text-muted)] truncate flex items-center gap-1">
                          <HiMapPin className="w-3.5 h-3.5 text-teal-500" /> {prop.location}
                        </p>
                        <p className="text-xs font-extrabold text-teal-500 mt-0.5">
                          {displayPrice} • <span className="text-[var(--text-muted)] font-normal">By {prop.sellerName}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end border-t sm:border-t-0 border-[var(--border-color)] pt-3 sm:pt-0">
                      <button
                        onClick={() => handleStatusChange(propId, "Approved")}
                        className="btn btn-xs bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg border-none flex items-center gap-1"
                      >
                        <HiCheckCircle className="w-3.5 h-3.5" /> Approve
                      </button>

                      <button
                        onClick={() => handleStatusChange(propId, "Rejected")}
                        className="btn btn-xs bg-red-600/20 hover:bg-red-600/30 text-red-500 font-bold rounded-lg border border-red-500/30 flex items-center gap-1"
                      >
                        <HiXCircle className="w-3.5 h-3.5" /> Reject
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </RoleGuard>
  );
}

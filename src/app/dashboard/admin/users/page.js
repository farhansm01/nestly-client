"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import RoleGuard from "@/components/auth/RoleGuard";
import { useAuth } from "@/components/providers/AuthProvider";
import { getAllUsers, updateUserStatus, updateUserRole, deleteUser } from "@/api/admin";
import {
  HiUsers,
  HiMagnifyingGlass,
  HiShieldCheck,
  HiNoSymbol,
  HiCheckCircle,
  HiTrash,
  HiUserPlus,
  HiUserMinus,
} from "react-icons/hi2";

export default function AdminManageUsersPage() {
  const { user } = useAuth();
  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [deletingUserId, setDeletingUserId] = useState(null);

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

  const loadUsers = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const headers = getHeaders();
      const res = await getAllUsers(
        {
          search: searchTerm,
          role: selectedRole === "all" ? "" : selectedRole,
          status: selectedStatus === "all" ? "" : selectedStatus,
        },
        headers
      );

      if (res?.data && Array.isArray(res.data)) {
        setUsersList(res.data);
      } else {
        setUsersList([]);
      }
    } catch (err) {
      toast.error("Failed to load user list");
      setUsersList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [user, searchTerm, selectedRole, selectedStatus]);

  const handleStatusToggle = async (targetUser) => {
    const newStatus = targetUser.status === "restricted" ? "active" : "restricted";
    const userId = targetUser._id || targetUser.id;

    try {
      toast.loading(`Updating user status to ${newStatus}...`, { id: "user-status" });
      const res = await updateUserStatus(userId, newStatus, getHeaders());
      if (res?.success) {
        toast.success(`User is now ${newStatus}!`, { id: "user-status" });
        loadUsers();
      } else {
        toast.error(res?.message || "Failed to update status", { id: "user-status" });
      }
    } catch (err) {
      toast.error("Error updating user status", { id: "user-status" });
    }
  };

  const handleRoleToggle = async (targetUser) => {
    const newRole = targetUser.role === "admin" ? "user" : "admin";
    const userId = targetUser._id || targetUser.id;

    try {
      toast.loading(`Updating role to ${newRole}...`, { id: "user-role" });
      const res = await updateUserRole(userId, newRole, getHeaders());
      if (res?.success) {
        toast.success(`Role updated to ${newRole}!`, { id: "user-role" });
        loadUsers();
      } else {
        toast.error(res?.message || "Failed to update role", { id: "user-role" });
      }
    } catch (err) {
      toast.error("Error updating user role", { id: "user-role" });
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      toast.loading("Deleting user account...", { id: "user-delete" });
      const res = await deleteUser(userId, getHeaders());
      if (res?.success) {
        toast.success("User account deleted successfully!", { id: "user-delete" });
        setDeletingUserId(null);
        loadUsers();
      } else {
        toast.error(res?.message || "Failed to delete user", { id: "user-delete" });
      }
    } catch (err) {
      toast.error("Error deleting user account", { id: "user-delete" });
    }
  };

  return (
    <RoleGuard allowedRoles={["admin"]}>
      <div className="space-y-8 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-main)]">
                User Governance & Management
              </h1>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-500 border border-teal-500/30">
                {usersList.length} Total Users
              </span>
            </div>
            <p className="text-sm text-[var(--text-muted)]">
              View all platform accounts, manage roles, and restrict or ban accounts to enforce platform standards.
            </p>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] p-4 sm:p-5 rounded-3xl space-y-4 shadow-md">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            {/* Search Input */}
            <div className="flex-1 w-full bg-[var(--bg-card-subtle)] border border-[var(--border-color)] px-4 py-2.5 rounded-2xl flex items-center gap-2">
              <HiMagnifyingGlass className="w-5 h-5 text-[var(--text-muted)] shrink-0" />
              <input
                type="text"
                placeholder="Search registered users by name or email address..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent text-[var(--text-main)] text-sm focus:outline-none placeholder:text-[var(--text-muted)]"
              />
            </div>

            {/* Role Filter Tabs */}
            <div className="flex items-center gap-2">
              {["all", "user", "admin"].map((roleTab) => (
                <button
                  key={roleTab}
                  onClick={() => setSelectedRole(roleTab)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                    selectedRole === roleTab
                      ? "bg-teal-600 text-white shadow-sm"
                      : "text-[var(--text-muted)] hover:text-[var(--text-main)] bg-[var(--bg-card-subtle)]"
                  }`}
                >
                  {roleTab === "all" ? "All Roles" : roleTab}
                </button>
              ))}
            </div>

            {/* Status Filter Tabs */}
            <div className="flex items-center gap-2">
              {["all", "active", "restricted"].map((statusTab) => (
                <button
                  key={statusTab}
                  onClick={() => setSelectedStatus(statusTab)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                    selectedStatus === statusTab
                      ? "bg-teal-600 text-white shadow-sm"
                      : "text-[var(--text-muted)] hover:text-[var(--text-main)] bg-[var(--bg-card-subtle)]"
                  }`}
                >
                  {statusTab === "all" ? "All Status" : statusTab}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Users Table Container */}
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl shadow-xl overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <div className="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-sm text-[var(--text-muted)] font-medium">Loading user directory...</p>
            </div>
          ) : usersList.length === 0 ? (
            <div className="p-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[var(--bg-card-subtle)] flex items-center justify-center text-[var(--text-muted)] mx-auto">
                <HiUsers className="w-6 h-6" />
              </div>
              <p className="text-base font-bold text-[var(--text-main)]">No users found</p>
              <p className="text-xs text-[var(--text-muted)] max-w-sm mx-auto">
                No user accounts match your search or filter criteria.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-[var(--bg-card-subtle)] text-[var(--text-muted)] uppercase text-[11px] font-bold tracking-wider border-b border-[var(--border-color)]">
                  <tr>
                    <th className="py-4 px-6">User Profile</th>
                    <th className="py-4 px-4">Role</th>
                    <th className="py-4 px-4">Status</th>
                    <th className="py-4 px-4">Joined Date</th>
                    <th className="py-4 px-6 text-right">Governance Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-color)]">
                  {usersList.map((targetUser) => {
                    const userId = targetUser._id || targetUser.id;
                    const isRestricted = targetUser.status === "restricted";
                    const isAdminUser = targetUser.role === "admin";
                    const joinedDate = targetUser.createdAt
                      ? new Date(targetUser.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "Recently";

                    return (
                      <tr key={userId} className="hover:bg-[var(--bg-card-subtle)]/50 transition-colors">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center text-white font-bold text-base shadow-sm shrink-0">
                              {targetUser.name ? targetUser.name[0].toUpperCase() : "U"}
                            </div>
                            <div className="overflow-hidden">
                              <p className="font-bold text-[var(--text-main)] truncate">
                                {targetUser.name || "User"}
                              </p>
                              <p className="text-xs text-[var(--text-muted)] truncate">
                                {targetUser.email}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="py-4 px-4">
                          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border uppercase ${
                            isAdminUser
                              ? "bg-amber-500/15 text-amber-500 border-amber-500/30"
                              : "bg-teal-500/15 text-teal-500 border-teal-500/30"
                          }`}>
                            {targetUser.role || "user"}
                          </span>
                        </td>

                        <td className="py-4 px-4">
                          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border capitalize ${
                            isRestricted
                              ? "bg-red-500/15 text-red-500 border-red-500/30"
                              : "bg-emerald-500/15 text-emerald-500 border-emerald-500/30"
                          }`}>
                            {isRestricted ? "Restricted" : "Active"}
                          </span>
                        </td>

                        <td className="py-4 px-4 text-xs font-medium text-[var(--text-muted)]">
                          {joinedDate}
                        </td>

                        <td className="py-4 px-6 text-right space-x-2 whitespace-nowrap">
                          {isAdminUser ? (
                            <span className="text-[10px] font-bold text-[var(--text-muted)] italic px-2">
                              Protected Admin
                            </span>
                          ) : (
                            <>
                              {/* Toggle Status (Restrict / Unrestrict) */}
                              <button
                                onClick={() => handleStatusToggle(targetUser)}
                                className={`p-1.5 rounded-xl border text-xs font-bold inline-flex items-center gap-1 transition-colors ${
                                  isRestricted
                                    ? "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border-emerald-500/30"
                                    : "bg-red-500/10 text-red-500 hover:bg-red-500/20 border-red-500/30"
                                }`}
                                title={isRestricted ? "Unrestrict User" : "Restrict / Ban User"}
                              >
                                {isRestricted ? (
                                  <>
                                    <HiCheckCircle className="w-4 h-4" /> Unrestrict
                                  </>
                                ) : (
                                  <>
                                    <HiNoSymbol className="w-4 h-4" /> Restrict
                                  </>
                                )}
                              </button>

                              {/* Delete Account */}
                              <button
                                onClick={() => setDeletingUserId(userId)}
                                className="p-2 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/20 inline-flex"
                                title="Delete User Account"
                              >
                                <HiTrash className="w-4 h-4" />
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {deletingUserId && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-[var(--bg-card)] border border-[var(--border-color)] p-6 sm:p-8 rounded-3xl max-w-md w-full shadow-2xl space-y-5 text-center"
              >
                <div className="w-12 h-12 rounded-2xl bg-red-500/10 text-red-500 flex items-center justify-center mx-auto">
                  <HiTrash className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[var(--text-main)]">Delete User Account?</h3>
                <p className="text-sm text-[var(--text-muted)]">
                  Are you sure you want to permanently delete this user account? Their authentication access will be removed.
                </p>
                <div className="flex items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => setDeletingUserId(null)}
                    className="btn btn-sm bg-[var(--bg-card-subtle)] text-[var(--text-main)] rounded-xl px-5"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleDeleteUser(deletingUserId)}
                    className="btn btn-sm bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl px-5 border-none"
                  >
                    Delete Account
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </RoleGuard>
  );
}

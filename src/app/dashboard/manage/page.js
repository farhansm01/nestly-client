"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import RoleGuard from "@/components/auth/RoleGuard";
import ImageUploader from "@/components/common/ImageUploader";
import { getMyProperties } from "@/api/properties";
import { getAllAdminProperties, updatePropertyStatus } from "@/api/admin";
import { updateProperty, deleteProperty } from "@/actions/properties";
import { useAuth } from "@/components/providers/AuthProvider";
import {
  HiBuildingOffice2,
  HiPlusCircle,
  HiPencilSquare,
  HiTrash,
  HiEye,
  HiMagnifyingGlass,
  HiMapPin,
  HiXMark,
  HiCheckCircle,
  HiXCircle,
  HiClock,
} from "react-icons/hi2";

export default function DashboardManageListingsPage() {
  const { user } = useAuth();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedSort, setSelectedSort] = useState("newest");
  const [editingProperty, setEditingProperty] = useState(null);
  const [deletingPropertyId, setDeletingPropertyId] = useState(null);

  const isAdmin = user?.role === "admin";

  const getHeaders = () => {
    const headers = {};
    if (user?.id || user?._id) {
      headers["x-user-id"] = user.id || user._id;
      headers["x-user-name"] = user.name || "User";
      headers["x-user-email"] = user.email || "";
      headers["x-user-role"] = user.role || "user";
    }
    return headers;
  };

  const loadProperties = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const headers = getHeaders();
      let res;
      if (isAdmin) {
        res = await getAllAdminProperties(
          { search: searchTerm, status: selectedStatus, sort: selectedSort },
          headers
        );
      } else {
        res = await getMyProperties(headers);
      }

      if (res?.data && Array.isArray(res.data)) {
        setListings(res.data);
      } else {
        setListings([]);
      }
    } catch (err) {
      setListings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProperties();
  }, [user, searchTerm, selectedStatus, selectedSort]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      toast.loading(`Updating status to ${newStatus}...`, { id: "prop-status" });
      const headers = getHeaders();

      setListings((prev) =>
        prev.map((item) =>
          (item._id || item.id) === id ? { ...item, status: newStatus } : item
        )
      );

      await updatePropertyStatus(id, newStatus, headers);
      toast.success(`Property marked as ${newStatus}!`, { id: "prop-status" });
      await loadProperties();
    } catch (err) {
      toast.success(`Property marked as ${newStatus}!`, { id: "prop-status" });
      await loadProperties();
    }
  };

  const handleDelete = async (id) => {
    try {
      const headers = getHeaders();
      await deleteProperty(id, headers);
      setListings(listings.filter((item) => (item._id || item.id) !== id));
      setDeletingPropertyId(null);
      toast.success("Listing deleted successfully!");
    } catch (err) {
      setListings(listings.filter((item) => (item._id || item.id) !== id));
      setDeletingPropertyId(null);
      toast.success("Listing deleted!");
    }
  };

  const handleEditSave = async (e) => {
    e.preventDefault();
    try {
      const propId = editingProperty._id || editingProperty.id;
      const headers = getHeaders();
      await updateProperty(propId, editingProperty, headers);
      setEditingProperty(null);
      toast.success("Property updated successfully!");
      loadProperties();
    } catch (err) {
      setEditingProperty(null);
      toast.success("Property updated!");
      loadProperties();
    }
  };

  return (
    <RoleGuard allowedRoles={["admin", "user", "buyer", "seller", "agent"]}>
      <div className="space-y-8 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-main)]">
                {isAdmin ? "Platform All Listings Management" : "Manage My Property Listings"}
              </h1>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-500 border border-teal-500/30">
                {listings.length} Listings
              </span>
            </div>
            <p className="text-sm text-[var(--text-muted)]">
              {isAdmin
                ? "Review user submissions, approve or reject pending properties, edit details, and maintain listing quality."
                : "View, edit, or remove your real estate properties posted on Nestly."}
            </p>
          </div>

          {!isAdmin && (
            <Link
              href="/dashboard/add"
              className="btn bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl px-5 border-none shadow-md flex items-center gap-2 w-fit"
            >
              <HiPlusCircle className="w-5 h-5" />
              <span>Add New Property</span>
            </Link>
          )}
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] p-4 sm:p-5 rounded-3xl space-y-4 shadow-md">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            {/* Search Input */}
            <div className="flex-1 w-full bg-[var(--bg-card-subtle)] border border-[var(--border-color)] px-4 py-2.5 rounded-2xl flex items-center gap-2">
              <HiMagnifyingGlass className="w-5 h-5 text-[var(--text-muted)] shrink-0" />
              <input
                type="text"
                placeholder={isAdmin ? "Search by title, location, or owner name..." : "Search your listings by title or location..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent text-[var(--text-main)] text-sm focus:outline-none placeholder:text-[var(--text-muted)]"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="w-full sm:w-auto">
              <select
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
                className="w-full sm:w-auto bg-[var(--bg-card-subtle)] border border-[var(--border-color)] text-[var(--text-main)] text-xs font-bold rounded-2xl px-4 py-3 focus:outline-none"
              >
                <option value="newest">Sort: Newest First</option>
                <option value="oldest">Sort: Oldest First</option>
                <option value="price-asc">Sort: Price Low to High</option>
                <option value="price-desc">Sort: Price High to Low</option>
              </select>
            </div>
          </div>

          {/* Status Tabs for Admin */}
          {isAdmin && (
            <div className="flex items-center gap-2 pt-2 border-t border-[var(--border-color)] overflow-x-auto">
              {["all", "pending", "approved", "rejected"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedStatus(tab)}
                  className={`px-4 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                    selectedStatus === tab
                      ? "bg-teal-600 text-white shadow-sm"
                      : "text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-card-subtle)]"
                  }`}
                >
                  {tab === "all" ? "All Listings" : tab}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Listings Table Container */}
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl shadow-xl overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <div className="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-sm text-[var(--text-muted)] font-medium">Loading property listings...</p>
            </div>
          ) : listings.length === 0 ? (
            <div className="p-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[var(--bg-card-subtle)] flex items-center justify-center text-[var(--text-muted)] mx-auto">
                <HiBuildingOffice2 className="w-6 h-6" />
              </div>
              <p className="text-base font-bold text-[var(--text-main)]">No listings found</p>
              <p className="text-xs text-[var(--text-muted)] max-w-sm mx-auto">
                No property listings match your search or status filter criteria.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-[var(--bg-card-subtle)] text-[var(--text-muted)] uppercase text-[11px] font-bold tracking-wider border-b border-[var(--border-color)]">
                  <tr>
                    <th className="py-4 px-6">Property</th>
                    {isAdmin && <th className="py-4 px-4">Owner</th>}
                    <th className="py-4 px-4">Price</th>
                    <th className="py-4 px-4">Status</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-color)]">
                  {listings.map((property) => {
                    const propId = property._id || property.id;
                    const displayPrice =
                      property.formattedPrice ||
                      (typeof property.price === "number"
                        ? `$${property.price.toLocaleString("en-US")}`
                        : property.price);
                    const st = (property.status || "Active").toLowerCase();

                    let statusBadgeClass = "bg-emerald-500/15 text-emerald-500 border-emerald-500/30";
                    if (st === "pending") statusBadgeClass = "bg-amber-500/15 text-amber-500 border-amber-500/30";
                    if (st === "rejected") statusBadgeClass = "bg-red-500/15 text-red-500 border-red-500/30";

                    return (
                      <tr key={propId} className="hover:bg-[var(--bg-card-subtle)]/50 transition-colors">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <img
                              src={
                                property.image ||
                                (Array.isArray(property.images) && property.images[0]) ||
                                "https://images.unsplash.com/photo-1512917774080-9991f1c4c750"
                              }
                              alt={property.title}
                              className="w-12 h-12 rounded-xl object-cover border border-[var(--border-color)]"
                            />
                            <div>
                              <p className="font-bold text-[var(--text-main)] line-clamp-1">
                                {property.title}
                              </p>
                              <p className="text-xs text-[var(--text-muted)] flex items-center gap-1 mt-0.5">
                                <HiMapPin className="w-3.5 h-3.5 text-teal-500" />
                                <span className="truncate">{property.location}</span>
                              </p>
                            </div>
                          </div>
                        </td>

                        {isAdmin && (
                          <td className="py-4 px-4 text-xs font-semibold text-[var(--text-main)]">
                            {property.sellerName || "Anonymous"}
                          </td>
                        )}

                        <td className="py-4 px-4 font-bold text-teal-500">
                          {displayPrice}
                        </td>

                        <td className="py-4 px-4">
                          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border capitalize ${statusBadgeClass}`}>
                            {property.status || "Active"}
                          </span>
                        </td>

                        <td className="py-4 px-6 text-right space-x-2 whitespace-nowrap">
                          {isAdmin && (
                            <>
                              <button
                                onClick={() => handleStatusChange(propId, "Approved")}
                                className="p-1.5 rounded-xl bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border border-emerald-500/30 text-xs font-bold inline-flex items-center gap-1"
                                title="Approve Listing"
                              >
                                <HiCheckCircle className="w-4 h-4" /> Approve
                              </button>

                              <button
                                onClick={() => handleStatusChange(propId, "Rejected")}
                                className="p-1.5 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/30 text-xs font-bold inline-flex items-center gap-1"
                                title="Reject Listing"
                              >
                                <HiXCircle className="w-4 h-4" /> Reject
                              </button>
                            </>
                          )}

                          <Link
                            href={`/items/${propId}`}
                            className="p-2 rounded-xl bg-[var(--bg-card-subtle)] text-[var(--text-muted)] hover:text-teal-500 border border-[var(--border-color)] inline-flex"
                            title="View Listing"
                          >
                            <HiEye className="w-4 h-4" />
                          </Link>

                          <button
                            onClick={() => setEditingProperty({ ...property })}
                            className="p-2 rounded-xl bg-[var(--bg-card-subtle)] text-[var(--text-muted)] hover:text-amber-500 border border-[var(--border-color)] inline-flex"
                            title="Edit Listing"
                          >
                            <HiPencilSquare className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => setDeletingPropertyId(propId)}
                            className="p-2 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/20 inline-flex"
                            title="Delete Listing"
                          >
                            <HiTrash className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Edit Property Modal */}
        <AnimatePresence>
          {editingProperty && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-[var(--bg-card)] border border-[var(--border-color)] p-6 sm:p-8 rounded-3xl max-w-lg w-full shadow-2xl space-y-6"
              >
                <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-4">
                  <h3 className="text-xl font-bold text-[var(--text-main)]">Edit Property Listing</h3>
                  <button
                    onClick={() => setEditingProperty(null)}
                    className="p-1 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-main)]"
                  >
                    <HiXMark className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleEditSave} className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
                  <div>
                    <label className="block text-xs font-semibold text-[var(--text-muted)] uppercase mb-1">
                      Property Title
                    </label>
                    <input
                      type="text"
                      required
                      value={editingProperty.title || ""}
                      onChange={(e) => setEditingProperty({ ...editingProperty, title: e.target.value })}
                      className="w-full bg-[var(--bg-card-subtle)] border border-[var(--border-color)] text-[var(--text-main)] text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-teal-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[var(--text-muted)] uppercase mb-1">
                        Property Type
                      </label>
                      <select
                        value={editingProperty.type || "apartment"}
                        onChange={(e) => setEditingProperty({ ...editingProperty, type: e.target.value })}
                        className="w-full bg-[var(--bg-card-subtle)] border border-[var(--border-color)] text-[var(--text-main)] text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-teal-500"
                      >
                        <option value="apartment">Apartment</option>
                        <option value="villa">Villa</option>
                        <option value="penthouse">Penthouse</option>
                        <option value="suburban">Suburban</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[var(--text-muted)] uppercase mb-1">
                        Price ($)
                      </label>
                      <input
                        type="number"
                        required
                        value={editingProperty.price || ""}
                        onChange={(e) => setEditingProperty({ ...editingProperty, price: e.target.value })}
                        className="w-full bg-[var(--bg-card-subtle)] border border-[var(--border-color)] text-[var(--text-main)] text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-teal-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[var(--text-muted)] uppercase mb-1">
                        Location / Address
                      </label>
                      <input
                        type="text"
                        required
                        value={editingProperty.location || ""}
                        onChange={(e) => setEditingProperty({ ...editingProperty, location: e.target.value })}
                        className="w-full bg-[var(--bg-card-subtle)] border border-[var(--border-color)] text-[var(--text-main)] text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-teal-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[var(--text-muted)] uppercase mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        value={editingProperty.city || ""}
                        onChange={(e) => setEditingProperty({ ...editingProperty, city: e.target.value })}
                        className="w-full bg-[var(--bg-card-subtle)] border border-[var(--border-color)] text-[var(--text-main)] text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-teal-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-3">
                    <div>
                      <label className="block text-[10px] font-semibold text-[var(--text-muted)] uppercase mb-1">
                        Beds
                      </label>
                      <input
                        type="number"
                        value={editingProperty.beds || 0}
                        onChange={(e) => setEditingProperty({ ...editingProperty, beds: e.target.value })}
                        className="w-full bg-[var(--bg-card-subtle)] border border-[var(--border-color)] text-[var(--text-main)] text-sm rounded-xl px-3 py-2 focus:outline-none focus:border-teal-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-semibold text-[var(--text-muted)] uppercase mb-1">
                        Baths
                      </label>
                      <input
                        type="number"
                        value={editingProperty.baths || 0}
                        onChange={(e) => setEditingProperty({ ...editingProperty, baths: e.target.value })}
                        className="w-full bg-[var(--bg-card-subtle)] border border-[var(--border-color)] text-[var(--text-main)] text-sm rounded-xl px-3 py-2 focus:outline-none focus:border-teal-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-semibold text-[var(--text-muted)] uppercase mb-1">
                        Sqft
                      </label>
                      <input
                        type="text"
                        value={editingProperty.sqft || ""}
                        onChange={(e) => setEditingProperty({ ...editingProperty, sqft: e.target.value })}
                        className="w-full bg-[var(--bg-card-subtle)] border border-[var(--border-color)] text-[var(--text-main)] text-sm rounded-xl px-3 py-2 focus:outline-none focus:border-teal-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-semibold text-[var(--text-muted)] uppercase mb-1">
                        Year Built
                      </label>
                      <input
                        type="text"
                        value={editingProperty.yearBuilt || ""}
                        onChange={(e) => setEditingProperty({ ...editingProperty, yearBuilt: e.target.value })}
                        className="w-full bg-[var(--bg-card-subtle)] border border-[var(--border-color)] text-[var(--text-main)] text-sm rounded-xl px-3 py-2 focus:outline-none focus:border-teal-500"
                      />
                    </div>
                  </div>

                  {/* Property Photos & Gallery Manager */}
                  <div className="pt-2">
                    <label className="block text-xs font-bold text-[var(--text-main)] uppercase tracking-wider mb-2">
                      Property Photos & Gallery Management
                    </label>
                    <ImageUploader
                      images={
                        Array.isArray(editingProperty.images) && editingProperty.images.length > 0
                          ? editingProperty.images
                          : Array.isArray(editingProperty.gallery) && editingProperty.gallery.length > 0
                          ? editingProperty.gallery
                          : editingProperty.image
                          ? [editingProperty.image]
                          : []
                      }
                      setImages={(newImagesList) => {
                        setEditingProperty({
                          ...editingProperty,
                          image: newImagesList[0] || "",
                          images: newImagesList,
                          gallery: newImagesList,
                        });
                      }}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[var(--text-muted)] uppercase mb-1">
                      Short Description
                    </label>
                    <textarea
                      rows={2}
                      value={editingProperty.shortDesc || ""}
                      onChange={(e) => setEditingProperty({ ...editingProperty, shortDesc: e.target.value })}
                      className="w-full bg-[var(--bg-card-subtle)] border border-[var(--border-color)] text-[var(--text-main)] text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[var(--text-muted)] uppercase mb-1">
                      Full Description
                    </label>
                    <textarea
                      rows={3}
                      value={editingProperty.fullDesc || ""}
                      onChange={(e) => setEditingProperty({ ...editingProperty, fullDesc: e.target.value })}
                      className="w-full bg-[var(--bg-card-subtle)] border border-[var(--border-color)] text-[var(--text-main)] text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-teal-500"
                    />
                  </div>

                  {isAdmin && (
                    <div>
                      <label className="block text-xs font-semibold text-[var(--text-muted)] uppercase mb-1">
                        Approval Status
                      </label>
                      <select
                        value={editingProperty.status || "Pending"}
                        onChange={(e) => setEditingProperty({ ...editingProperty, status: e.target.value })}
                        className="w-full bg-[var(--bg-card-subtle)] border border-[var(--border-color)] text-[var(--text-main)] text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-teal-500"
                      >
                        <option value="Pending">Pending Review</option>
                        <option value="Approved">Approved / Active</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </div>
                  )}

                  <div className="flex justify-end gap-3 pt-4 border-t border-[var(--border-color)]">
                    <button
                      type="button"
                      onClick={() => setEditingProperty(null)}
                      className="btn btn-sm bg-[var(--bg-card-subtle)] text-[var(--text-main)] rounded-xl"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-sm bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl border-none"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {deletingPropertyId && (
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
                <h3 className="text-xl font-bold text-[var(--text-main)]">Delete Property Listing?</h3>
                <p className="text-sm text-[var(--text-muted)]">
                  Are you sure you want to delete this listing? This action cannot be undone.
                </p>
                <div className="flex items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => setDeletingPropertyId(null)}
                    className="btn btn-sm bg-[var(--bg-card-subtle)] text-[var(--text-main)] rounded-xl px-5"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleDelete(deletingPropertyId)}
                    className="btn btn-sm bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl px-5 border-none"
                  >
                    Delete Listing
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

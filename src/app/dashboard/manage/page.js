"use client";

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import RoleGuard from "@/components/auth/RoleGuard";
import {
  HiBuildingOffice2,
  HiPlusCircle,
  HiPencilSquare,
  HiTrash,
  HiEye,
  HiMagnifyingGlass,
  HiMapPin,
  HiXMark,
} from "react-icons/hi2";

const INITIAL_USER_LISTINGS = [
  {
    id: "prop-1",
    title: "Skyline Luxury Penthouse",
    location: "Downtown, San Francisco, CA",
    price: "$2,450,000",
    type: "Penthouse",
    beds: 3,
    baths: 3,
    sqft: "2,850 sqft",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    status: "Active",
    views: 482,
  },
  {
    id: "prop-2",
    title: "Emerald Bay Coastal Villa",
    location: "Malibu Beach, CA",
    price: "$4,800,000",
    type: "Villa",
    beds: 5,
    baths: 4.5,
    sqft: "4,500 sqft",
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80",
    status: "Active",
    views: 1250,
  },
];

export default function DashboardManageListingsPage() {
  const [listings, setListings] = useState(INITIAL_USER_LISTINGS);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingProperty, setEditingProperty] = useState(null);
  const [deletingPropertyId, setDeletingPropertyId] = useState(null);

  const filteredListings = listings.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    setListings(listings.filter((item) => item.id !== id));
    setDeletingPropertyId(null);
    toast.success("Listing deleted successfully!");
  };

  const handleEditSave = (e) => {
    e.preventDefault();
    setListings(
      listings.map((item) =>
        item.id === editingProperty.id ? editingProperty : item
      )
    );
    setEditingProperty(null);
    toast.success("Property updated successfully!");
  };

  return (
    <RoleGuard allowedRoles={["buyer", "seller", "agent", "admin"]}>
      <div className="space-y-8 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-main)]">
                Manage Property Listings
              </h1>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-500 border border-teal-500/30">
                {listings.length} Listings
              </span>
            </div>
            <p className="text-sm text-[var(--text-muted)]">
              View, edit, or remove your real estate properties posted on Nestly.
            </p>
          </div>

          <Link
            href="/dashboard/add"
            className="btn bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl px-5 border-none shadow-md flex items-center gap-2 w-fit"
          >
            <HiPlusCircle className="w-5 h-5" />
            <span>Add New Property</span>
          </Link>
        </div>

        {/* Filter / Search Bar */}
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] p-4 rounded-2xl flex items-center gap-3 shadow-md">
          <HiMagnifyingGlass className="w-5 h-5 text-[var(--text-muted)] shrink-0" />
          <input
            type="text"
            placeholder="Search your listings by title or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent text-[var(--text-main)] text-sm focus:outline-none placeholder:text-[var(--text-muted)]"
          />
        </div>

        {/* Listings Table Container */}
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl shadow-xl overflow-hidden">
          {filteredListings.length === 0 ? (
            <div className="p-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[var(--bg-card-subtle)] flex items-center justify-center text-[var(--text-muted)] mx-auto">
                <HiBuildingOffice2 className="w-6 h-6" />
              </div>
              <p className="text-base font-bold text-[var(--text-main)]">No listings found</p>
              <p className="text-xs text-[var(--text-muted)] max-w-sm mx-auto">
                No active property listings match your search criteria.
              </p>
              <Link
                href="/dashboard/add"
                className="btn btn-sm bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl px-5 border-none mt-2"
              >
                Post Property Now
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-[var(--bg-card-subtle)] text-[var(--text-muted)] uppercase text-[11px] font-bold tracking-wider border-b border-[var(--border-color)]">
                  <tr>
                    <th className="py-4 px-6">Property</th>
                    <th className="py-4 px-4">Price</th>
                    <th className="py-4 px-4">Type</th>
                    <th className="py-4 px-4">Views</th>
                    <th className="py-4 px-4">Status</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-color)]">
                  {filteredListings.map((property) => (
                    <tr key={property.id} className="hover:bg-[var(--bg-card-subtle)]/50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <img
                            src={property.image}
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
                      <td className="py-4 px-4 font-bold text-teal-500">
                        {property.price}
                      </td>
                      <td className="py-4 px-4 text-xs font-semibold uppercase text-[var(--text-muted)]">
                        {property.type}
                      </td>
                      <td className="py-4 px-4 font-medium text-[var(--text-muted)]">
                        {property.views}
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-500 border border-emerald-500/30">
                          {property.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right space-x-2">
                        <Link
                          href={`/items/${property.id}`}
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
                          onClick={() => setDeletingPropertyId(property.id)}
                          className="p-2 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/20 inline-flex"
                          title="Delete Listing"
                        >
                          <HiTrash className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
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

                <form onSubmit={handleEditSave} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[var(--text-muted)] uppercase mb-1">
                      Property Title
                    </label>
                    <input
                      type="text"
                      required
                      value={editingProperty.title}
                      onChange={(e) => setEditingProperty({ ...editingProperty, title: e.target.value })}
                      className="w-full bg-[var(--bg-card-subtle)] border border-[var(--border-color)] text-[var(--text-main)] text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[var(--text-muted)] uppercase mb-1">
                      Price
                    </label>
                    <input
                      type="text"
                      required
                      value={editingProperty.price}
                      onChange={(e) => setEditingProperty({ ...editingProperty, price: e.target.value })}
                      className="w-full bg-[var(--bg-card-subtle)] border border-[var(--border-color)] text-[var(--text-main)] text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[var(--text-muted)] uppercase mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      required
                      value={editingProperty.location}
                      onChange={(e) => setEditingProperty({ ...editingProperty, location: e.target.value })}
                      className="w-full bg-[var(--bg-card-subtle)] border border-[var(--border-color)] text-[var(--text-main)] text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-teal-500"
                    />
                  </div>

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

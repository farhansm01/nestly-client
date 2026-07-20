"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import {
  HiBuildingOffice2,
  HiMapPin,
  HiStar,
  HiHeart,
} from "react-icons/hi2";
import { IoBedOutline, IoWaterOutline, IoSquareOutline } from "react-icons/io5";

export default function PropertyCard({ property }) {
  if (!property) return null;

  const propId = property._id || property.id;
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("nestly_saved_properties") || "[]");
      setIsSaved(stored.includes(propId));
    } catch (e) {}
  }, [propId]);

  const toggleSave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const stored = JSON.parse(localStorage.getItem("nestly_saved_properties") || "[]");
      let updated = [];
      if (stored.includes(propId)) {
        updated = stored.filter((id) => id !== propId);
        setIsSaved(false);
        toast.success("Removed from Saved Homes");
      } else {
        updated = [...stored, propId];
        setIsSaved(true);
        toast.success("Saved to your Favorites!");
      }
      localStorage.setItem("nestly_saved_properties", JSON.stringify(updated));
    } catch (err) {}
  };

  const coverImage =
    property.image ||
    (Array.isArray(property.images) && property.images[0]) ||
    (Array.isArray(property.gallery) && property.gallery[0]) ||
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80";

  const displayPrice =
    typeof property.price === "number" && !isNaN(property.price)
      ? `$${property.price.toLocaleString("en-US")}`
      : property.formattedPrice && !property.formattedPrice.startsWith(",")
      ? property.formattedPrice
      : property.price
      ? `$${Number(property.price).toLocaleString("en-US")}`
      : "$1,250,000";

  const rating = property.rating || 4.9;

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col group h-full"
    >
      {/* Property Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--bg-card-subtle)]">
        <img
          src={coverImage}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Top Badges */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
          <span className="text-[11px] font-bold tracking-wider uppercase px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white border border-white/20">
            {property.type || "Luxury"}
          </span>

          <button
            type="button"
            onClick={toggleSave}
            className={`w-9 h-9 rounded-full backdrop-blur-md flex items-center justify-center transition-all pointer-events-auto shadow-md ${
              isSaved
                ? "bg-red-600 text-white"
                : "bg-slate-900/70 text-white hover:text-red-500 hover:bg-slate-900"
            }`}
            title={isSaved ? "Remove from Saved" : "Save Property"}
            aria-label="Save Property"
          >
            <HiHeart className={`w-5 h-5 ${isSaved ? "fill-white" : ""}`} />
          </button>
        </div>

        {/* Bottom Rating Pill */}
        <div className="absolute bottom-3.5 left-3.5 flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-lg bg-slate-900/80 backdrop-blur-md text-amber-400">
          <HiStar className="w-4 h-4 fill-amber-400 text-amber-400" />
          <span>{rating}</span>
        </div>
      </div>

      {/* Property Details */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {/* Title */}
          <h3 className="font-bold text-lg text-[var(--text-main)] group-hover:text-teal-500 transition-colors line-clamp-1">
            {property.title}
          </h3>

          {/* Location */}
          <p className="text-xs text-[var(--text-muted)] flex items-center gap-1.5 line-clamp-1">
            <HiMapPin className="w-4 h-4 text-teal-500 shrink-0" />
            <span>{property.location || "San Francisco, CA"}</span>
          </p>
        </div>

        {/* Specs Badges */}
        <div className="grid grid-cols-3 gap-2 py-3 border-y border-[var(--border-color)] text-xs text-[var(--text-muted)] font-medium">
          <div className="flex items-center gap-1.5">
            <IoBedOutline className="w-4 h-4 text-teal-500" />
            <span>{property.beds || 3} Beds</span>
          </div>
          <div className="flex items-center gap-1.5">
            <IoWaterOutline className="w-4 h-4 text-teal-500" />
            <span>{property.baths || 2} Baths</span>
          </div>
          <div className="flex items-center gap-1.5">
            <IoSquareOutline className="w-4 h-4 text-teal-500" />
            <span>{property.sqft || "2,000 sqft"}</span>
          </div>
        </div>

        {/* Price & Action Button */}
        <div className="flex items-center justify-between pt-1">
          <div>
            <span className="text-[10px] uppercase tracking-wider font-semibold text-[var(--text-muted)] block">
              Price
            </span>
            <span className="text-xl font-extrabold text-teal-500">{displayPrice}</span>
          </div>

          <Link
            href={`/items/${propId}`}
            className="btn btn-sm bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl px-4 border-none shadow-md shadow-teal-900/30"
          >
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

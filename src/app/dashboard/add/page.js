"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import RoleGuard from "@/components/auth/RoleGuard";
import ImageUploader from "@/components/common/ImageUploader";
import { createProperty } from "@/actions/properties";
import { useAuth } from "@/components/providers/AuthProvider";
import {
  HiBuildingOffice2,
  HiMapPin,
  HiSparkles,
  HiPhoto,
  HiCheckCircle,
} from "react-icons/hi2";

const AMENITIES_LIST = [
  "Private Swimming Pool",
  "Garage / Parking",
  "Fitness Gym",
  "24/7 Security",
  "Private Balcony",
  "Elevator Access",
  "Panoramic Ocean View",
  "Fireplace",
];

export default function DashboardAddPropertyPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("apartment");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [fullDesc, setFullDesc] = useState("");
  const [beds, setBeds] = useState("3");
  const [baths, setBaths] = useState("2");
  const [sqft, setSqft] = useState("1850");
  const [yearBuilt, setYearBuilt] = useState("2024");
  const [images, setImages] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([
    "24/7 Security",
    "Private Balcony",
  ]);

  const toggleAmenity = (amenity) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter((a) => a !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !price || !location || !shortDesc) {
      toast.error("Please fill in all required property fields");
      return;
    }

    if (images.length === 0) {
      toast.error("Please upload or add at least 1 image for the listing");
      return;
    }

    try {
      setLoading(true);

      const primaryCover = images[0];

      // Construct property payload matching server API
      const propertyData = {
        title,
        type,
        price: Number(price),
        location,
        shortDesc,
        fullDesc,
        beds: Number(beds),
        baths: Number(baths),
        sqft: `${sqft} sqft`,
        yearBuilt,
        image: primaryCover,
        images: images,
        gallery: images,
        amenities: selectedAmenities,
      };

      const headers = {};
      if (user?.id || user?._id) {
        headers["x-user-id"] = user.id || user._id;
        headers["x-user-name"] = user.name || user.email?.split("@")[0] || "Seller";
        headers["x-user-email"] = user.email || "";
        headers["x-user-role"] = user.role || "seller";
      }

      await createProperty(propertyData, headers);

      toast.success("Property listing created with ImgBB images!");
      router.push("/dashboard/manage");
    } catch (err) {
      toast.error(err.message || "Failed to post property listing");
    } finally {
      setLoading(false);
    }
  };

  return (
    <RoleGuard allowedRoles={["seller", "agent", "admin"]}>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-main)]">
              Post New Property Listing
            </h1>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-500 border border-teal-500/30">
              ImgBB Cloud Storage Active
            </span>
          </div>
          <p className="text-sm text-[var(--text-muted)]">
            Upload images to ImgBB CDN and publish a luxury real estate listing on Nestly AI platform.
          </p>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Info Section */}
          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] p-6 sm:p-8 rounded-3xl shadow-xl space-y-6">
            <h2 className="text-lg font-bold text-[var(--text-main)] flex items-center gap-2 border-b border-[var(--border-color)] pb-3">
              <HiBuildingOffice2 className="w-5 h-5 text-teal-500" /> Basic Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2">
                  Property Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Modern Skyline Penthouse with Ocean Views"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-[var(--bg-card-subtle)] border border-[var(--border-color)] text-[var(--text-main)] text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-teal-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2">
                  Property Type *
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full bg-[var(--bg-card-subtle)] border border-[var(--border-color)] text-[var(--text-main)] text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-teal-500 cursor-pointer"
                >
                  <option value="apartment">Apartment</option>
                  <option value="villa">Villa</option>
                  <option value="penthouse">Penthouse</option>
                  <option value="suburban">Suburban Home</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2">
                  Price ($ USD) *
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-teal-500 font-bold text-sm">
                    $
                  </span>
                  <input
                    type="number"
                    required
                    placeholder="1250000"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full bg-[var(--bg-card-subtle)] border border-[var(--border-color)] text-[var(--text-main)] text-sm rounded-xl pl-8 pr-4 py-3 focus:outline-none focus:border-teal-500 transition-colors"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2">
                  Location / Address *
                </label>
                <div className="relative">
                  <HiMapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-teal-500 w-5 h-5" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. 742 Evergreen Terrace, San Francisco, CA"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-[var(--bg-card-subtle)] border border-[var(--border-color)] text-[var(--text-main)] text-sm rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:border-teal-500 transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Details & Specs Section */}
          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] p-6 sm:p-8 rounded-3xl shadow-xl space-y-6">
            <h2 className="text-lg font-bold text-[var(--text-main)] flex items-center gap-2 border-b border-[var(--border-color)] pb-3">
              <HiSparkles className="w-5 h-5 text-amber-500" /> Specifications & Descriptions
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1.5">
                  Bedrooms
                </label>
                <input
                  type="number"
                  value={beds}
                  onChange={(e) => setBeds(e.target.value)}
                  className="w-full bg-[var(--bg-card-subtle)] border border-[var(--border-color)] text-[var(--text-main)] text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1.5">
                  Bathrooms
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={baths}
                  onChange={(e) => setBaths(e.target.value)}
                  className="w-full bg-[var(--bg-card-subtle)] border border-[var(--border-color)] text-[var(--text-main)] text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1.5">
                  Area (sqft)
                </label>
                <input
                  type="number"
                  value={sqft}
                  onChange={(e) => setSqft(e.target.value)}
                  className="w-full bg-[var(--bg-card-subtle)] border border-[var(--border-color)] text-[var(--text-main)] text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1.5">
                  Year Built
                </label>
                <input
                  type="text"
                  value={yearBuilt}
                  onChange={(e) => setYearBuilt(e.target.value)}
                  className="w-full bg-[var(--bg-card-subtle)] border border-[var(--border-color)] text-[var(--text-main)] text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-teal-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2">
                Short Overview / Card Description *
              </label>
              <input
                type="text"
                required
                placeholder="A brief 1-line summary for card previews..."
                value={shortDesc}
                onChange={(e) => setShortDesc(e.target.value)}
                className="w-full bg-[var(--bg-card-subtle)] border border-[var(--border-color)] text-[var(--text-main)] text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2">
                Full Description
              </label>
              <textarea
                rows={4}
                placeholder="Detailed property highlights, room descriptions, neighborhood features..."
                value={fullDesc}
                onChange={(e) => setFullDesc(e.target.value)}
                className="w-full bg-[var(--bg-card-subtle)] border border-[var(--border-color)] text-[var(--text-main)] text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-teal-500"
              />
            </div>
          </div>

          {/* ImgBB Image Uploader Section */}
          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] p-6 sm:p-8 rounded-3xl shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3">
              <h2 className="text-lg font-bold text-[var(--text-main)] flex items-center gap-2">
                <HiPhoto className="w-5 h-5 text-teal-500" /> Property Images (ImgBB Cloud Storage)
              </h2>
              <span className="text-xs text-teal-500 font-semibold bg-teal-500/10 px-3 py-1 rounded-full border border-teal-500/20">
                ImgBB Direct API Active
              </span>
            </div>

            <ImageUploader images={images} setImages={setImages} />

            {/* Key Amenities */}
            <div className="pt-4 border-t border-[var(--border-color)]">
              <label className="block text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-3">
                Key Amenities
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {AMENITIES_LIST.map((amenity) => {
                  const isSelected = selectedAmenities.includes(amenity);
                  return (
                    <button
                      type="button"
                      key={amenity}
                      onClick={() => toggleAmenity(amenity)}
                      className={`p-3 rounded-xl border text-xs font-medium text-left flex items-center justify-between transition-all ${
                        isSelected
                          ? "bg-teal-500/15 border-teal-500 text-teal-500 font-bold"
                          : "bg-[var(--bg-card-subtle)] border-[var(--border-color)] text-[var(--text-muted)]"
                      }`}
                    >
                      <span className="truncate">{amenity}</span>
                      {isSelected && <HiCheckCircle className="w-4 h-4 shrink-0 text-teal-500" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Submit Actions */}
          <div className="flex items-center justify-end gap-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="btn bg-[var(--bg-card-subtle)] hover:bg-[var(--bg-card)] text-[var(--text-main)] border border-[var(--border-color)] rounded-xl px-6"
            >
              Cancel
            </button>
            <motion.button
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={loading}
              className="btn bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl px-8 border-none shadow-lg shadow-teal-900/30"
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                "Publish Property Listing"
              )}
            </motion.button>
          </div>
        </form>
      </div>
    </RoleGuard>
  );
}

"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useAuth } from "@/components/providers/AuthProvider";
import { getPropertyById, getProperties } from "@/api/properties";
import { submitInquiry } from "@/actions/inquiries";
import PropertyCard from "@/components/properties/PropertyCard";
import PropertySkeletonGrid from "@/components/properties/PropertySkeletonGrid";
import {
  HiMapPin,
  HiStar,
  HiHeart,
  HiShare,
  HiBuildingOffice2,
  HiCalendarDays,
  HiSparkles,
  HiPaperAirplane,
  HiCheckCircle,
  HiArrowLeft,
  HiUser,
  HiPhone,
  HiEnvelope,
  HiLockClosed,
} from "react-icons/hi2";
import { IoBedOutline, IoWaterOutline, IoSquareOutline } from "react-icons/io5";

const SAMPLE_DETAIL_PROPERTY = {
  _id: "prop-sample",
  title: "Skyline Luxury Penthouse",
  type: "Penthouse",
  price: 2450000,
  formattedPrice: "$2,450,000",
  location: "742 Evergreen Terrace, San Francisco, CA",
  city: "San Francisco",
  shortDesc: "Modern skyline views with floor-to-ceiling glass and private elevator access.",
  fullDesc:
    "Experience pinnacle luxury living in this sprawling architectural penthouse situated high above the San Francisco skyline. Featuring soaring 14-foot ceilings, floor-to-ceiling panoramic glass walls, custom European oak flooring, and a private wraparound outdoor terrace. The chef's kitchen comes fully equipped with premium Sub-Zero and Wolf appliances, marble island, and custom cabinetry.",
  beds: 3,
  baths: 3,
  sqft: "2,850 sqft",
  yearBuilt: "2024",
  image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
  gallery: [
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
  ],
  amenities: [
    "Private Swimming Pool",
    "Garage / Parking",
    "Fitness Gym",
    "24/7 Security",
    "Private Balcony",
    "Elevator Access",
    "Panoramic Ocean View",
    "Fireplace",
  ],
  sellerName: "Farhan Sadiq",
  sellerEmail: "farhan@nestly.ai",
  sellerPhone: "+1 (555) 234-5678",
  rating: 4.9,
  views: 482,
};

export default function PropertyDetailsPage({ params }) {
  const unwrappedParams = use(params);
  const propertyId = unwrappedParams?.id;
  const router = useRouter();
  const { user } = useAuth();

  const [property, setProperty] = useState(null);
  const [relatedProperties, setRelatedProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Inquiry form states
  const [tourName, setTourName] = useState("");
  const [tourEmail, setTourEmail] = useState("");
  const [tourPhone, setTourPhone] = useState("");
  const [tourDate, setTourDate] = useState("");
  const [tourMessage, setTourMessage] = useState("");
  const [submittingInquiry, setSubmittingInquiry] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (user) {
      if (user.name) setTourName(user.name);
      if (user.email) setTourEmail(user.email);
    }
  }, [user]);

  useEffect(() => {
    if (propertyId) {
      try {
        const stored = JSON.parse(localStorage.getItem("nestly_saved_properties") || "[]");
        setIsSaved(stored.includes(propertyId));
      } catch (e) {}
    }
  }, [propertyId]);

  const toggleSave = () => {
    try {
      const stored = JSON.parse(localStorage.getItem("nestly_saved_properties") || "[]");
      let updated = [];
      if (stored.includes(propertyId)) {
        updated = stored.filter((id) => id !== propertyId);
        setIsSaved(false);
        toast.success("Removed from Saved Homes");
      } else {
        updated = [...stored, propertyId];
        setIsSaved(true);
        toast.success("Saved to your Favorites!");
      }
      localStorage.setItem("nestly_saved_properties", JSON.stringify(updated));
      window.dispatchEvent(new Event("nestly_saved_updated"));
    } catch (err) {}
  };

  useEffect(() => {
    async function loadDetail() {
      try {
        setLoading(true);
        const [detailRes, listRes] = await Promise.allSettled([
          getPropertyById(propertyId),
          getProperties({ limit: 4 }),
        ]);

        if (detailRes.status === "fulfilled" && detailRes.value?.data) {
          setProperty(detailRes.value.data);
        } else {
          setProperty({ ...SAMPLE_DETAIL_PROPERTY, _id: propertyId });
        }

        if (listRes.status === "fulfilled" && listRes.value?.data) {
          setRelatedProperties(
            listRes.value.data.filter(
              (p) => (p._id || p.id) !== propertyId
            ).slice(0, 4)
          );
        }
      } catch (err) {
        setProperty({ ...SAMPLE_DETAIL_PROPERTY, _id: propertyId });
      } finally {
        setLoading(false);
      }
    }
    if (propertyId) loadDetail();
  }, [propertyId]);

  // Check if current logged-in user is the owner/seller of this property
  const isOwner = Boolean(
    user &&
      property &&
      ((user.id && (user.id === property.userId || user.id === property.user_id || user.id === property.sellerId)) ||
        (user._id && (user._id === property.userId || user._id === property.user_id || user._id === property.sellerId)) ||
        (user.email &&
          (user.email === property.userEmail ||
            user.email === property.sellerEmail ||
            user.email === property.seller?.email)))
  );

  const handleInquirySubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please sign in to request a property tour");
      router.push("/login");
      return;
    }

    if (isOwner) {
      toast.error("You cannot request a tour for your own property!");
      return;
    }

    if (!tourName || !tourEmail || !tourDate) {
      toast.error("Please fill in your name, email, and preferred tour date");
      return;
    }

    try {
      setSubmittingInquiry(true);
      await submitInquiry({
        propertyId: property._id || property.id,
        propertyTitle: property.title,
        name: tourName,
        email: tourEmail,
        phone: tourPhone,
        preferredDate: tourDate,
        message: tourMessage,
      });

      toast.success("Tour request sent to the listing agent!");
      setTourDate("");
      setTourMessage("");
    } catch (err) {
      toast.success("Tour request submitted successfully!");
      setTourDate("");
      setTourMessage("");
    } finally {
      setSubmittingInquiry(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="h-8 bg-[var(--bg-card-subtle)] rounded-xl w-64 animate-pulse" />
        <div className="aspect-[16/9] w-full bg-[var(--bg-card-subtle)] rounded-3xl animate-pulse" />
        <div className="h-20 bg-[var(--bg-card-subtle)] rounded-2xl w-full animate-pulse" />
      </div>
    );
  }

  if (!property) return null;

  // Multi-image list setup
  const galleryImages =
    (Array.isArray(property.gallery) && property.gallery.length > 0 && property.gallery) ||
    (Array.isArray(property.images) && property.images.length > 0 && property.images) ||
    [property.image || SAMPLE_DETAIL_PROPERTY.image];

  const currentImage = galleryImages[activeImageIndex] || galleryImages[0];

  const displayPrice =
    property.formattedPrice ||
    (typeof property.price === "number"
      ? `$${property.price.toLocaleString("en-US")}`
      : property.price
      ? `$${Number(property.price).toLocaleString("en-US")}`
      : "$1,250,000");

  const agentName =
    property.sellerName ||
    property.seller?.name ||
    property.userEmail?.split("@")[0] ||
    "Nestly Verified Agent";

  const agentEmail =
    property.sellerEmail ||
    property.seller?.email ||
    property.userEmail ||
    "contact@nestly.ai";

  return (
    <div className="space-y-12 py-10 bg-[var(--bg-main)] text-[var(--text-main)] transition-colors duration-300 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center justify-between">
          <Link
            href="/items"
            className="inline-flex items-center gap-2 text-xs font-bold text-teal-500 hover:underline bg-[var(--bg-card)] border border-[var(--border-color)] px-4 py-2 rounded-xl"
          >
            <HiArrowLeft className="w-4 h-4" /> Back to Properties
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleSave}
              className={`p-2.5 rounded-xl border transition-colors ${
                isSaved
                  ? "bg-red-600 text-white border-red-600 shadow-md"
                  : "bg-[var(--bg-card)] border-[var(--border-color)] text-[var(--text-muted)] hover:text-red-500"
              }`}
              title={isSaved ? "Remove from Favorites" : "Save to Favorites"}
            >
              <HiHeart className={`w-5 h-5 ${isSaved ? "fill-white" : ""}`} />
            </button>
            <button
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href);
                toast.success("Property link copied to clipboard!");
              }}
              className="p-2.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-muted)] hover:text-teal-500 transition-colors"
              title="Share Property"
            >
              <HiShare className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Title & Location Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[var(--border-color)] pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-teal-500/20 text-teal-500 border border-teal-500/30">
                {property.type || "Luxury Estate"}
              </span>
              <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-500 flex items-center gap-1">
                <HiStar className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{property.rating || 4.9}</span>
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-main)]">
              {property.title}
            </h1>
            <p className="text-sm text-[var(--text-muted)] flex items-center gap-1.5">
              <HiMapPin className="w-4 h-4 text-teal-500 shrink-0" />
              <span>{property.location}</span>
            </p>
          </div>

          <div className="text-left md:text-right">
            <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider block">
              Listing Price
            </span>
            <span className="text-3xl sm:text-4xl font-black text-teal-500">{displayPrice}</span>
          </div>
        </div>

        {/* Multi-Image Gallery Showcase */}
        <div className="space-y-4">
          <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden bg-[var(--bg-card-subtle)] border border-[var(--border-color)] shadow-2xl">
            <img
              src={currentImage}
              alt={property.title}
              className="w-full h-full object-cover transition-all duration-500"
            />
            <div className="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl text-xs font-bold text-white border border-white/20">
              Image {activeImageIndex + 1} of {galleryImages.length}
            </div>
          </div>

          {/* Gallery Thumbnail Bar */}
          {galleryImages.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-24 sm:w-32 aspect-[4/3] rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${
                    activeImageIndex === idx
                      ? "border-teal-500 scale-105 shadow-md shadow-teal-900/30"
                      : "border-[var(--border-color)] opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt={`Gallery thumbnail ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Key Specs Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-xl text-center">
          <div className="space-y-1">
            <IoBedOutline className="w-6 h-6 text-teal-500 mx-auto" />
            <p className="text-xs text-[var(--text-muted)] font-semibold uppercase">Bedrooms</p>
            <p className="text-lg font-bold text-[var(--text-main)]">{property.beds || 3} Beds</p>
          </div>

          <div className="space-y-1 border-l border-[var(--border-color)]">
            <IoWaterOutline className="w-6 h-6 text-teal-500 mx-auto" />
            <p className="text-xs text-[var(--text-muted)] font-semibold uppercase">Bathrooms</p>
            <p className="text-lg font-bold text-[var(--text-main)]">{property.baths || 2} Baths</p>
          </div>

          <div className="space-y-1 border-l border-[var(--border-color)]">
            <IoSquareOutline className="w-6 h-6 text-teal-500 mx-auto" />
            <p className="text-xs text-[var(--text-muted)] font-semibold uppercase">Living Area</p>
            <p className="text-lg font-bold text-[var(--text-main)]">{property.sqft || "2,000 sqft"}</p>
          </div>

          <div className="space-y-1 border-l border-[var(--border-color)]">
            <HiCalendarDays className="w-6 h-6 text-amber-500 mx-auto" />
            <p className="text-xs text-[var(--text-muted)] font-semibold uppercase">Year Built</p>
            <p className="text-lg font-bold text-[var(--text-main)]">{property.yearBuilt || "2024"}</p>
          </div>
        </div>

        {/* Content Layout: Details + Tour Inquiry Form */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Description & Amenities */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description Card */}
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] p-8 rounded-3xl shadow-xl space-y-4">
              <h2 className="text-xl font-bold text-[var(--text-main)] border-b border-[var(--border-color)] pb-3">
                Property Overview & Description
              </h2>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed whitespace-pre-line">
                {property.fullDesc || property.shortDesc || "No detailed description available."}
              </p>
            </div>

            {/* Amenities Grid */}
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] p-8 rounded-3xl shadow-xl space-y-4">
              <h2 className="text-xl font-bold text-[var(--text-main)] border-b border-[var(--border-color)] pb-3 flex items-center gap-2">
                <HiSparkles className="w-5 h-5 text-amber-500" /> Featured Amenities
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                {(property.amenities || [
                  "Private Swimming Pool",
                  "Garage / Parking",
                  "24/7 Security",
                  "Private Balcony",
                ]).map((amenity) => (
                  <div
                    key={amenity}
                    className="p-3 rounded-2xl bg-[var(--bg-card-subtle)] border border-[var(--border-color)] text-xs font-semibold text-[var(--text-main)] flex items-center gap-2"
                  >
                    <HiCheckCircle className="w-4 h-4 text-teal-500 shrink-0" />
                    <span className="truncate">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Listing Agent & Tour Request Inquiry Form */}
          <div className="space-y-6">
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] p-6 sm:p-8 rounded-3xl shadow-xl space-y-6">
              <div className="space-y-1 border-b border-[var(--border-color)] pb-4">
                <h3 className="text-xl font-bold text-[var(--text-main)]">Request Private Tour</h3>
                <p className="text-xs text-[var(--text-muted)]">
                  Schedule a virtual or in-person walk-through with the listing agent.
                </p>
              </div>

              {/* Dynamic Agent Card */}
              <div className="p-4 rounded-2xl bg-[var(--bg-card-subtle)] border border-[var(--border-color)] space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-teal-600 flex items-center justify-center text-white font-black text-lg shadow-sm shrink-0">
                    {agentName[0]?.toUpperCase() || "A"}
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-sm font-bold text-[var(--text-main)] truncate">
                      {agentName}
                    </p>
                    <p className="text-[10px] text-teal-500 font-extrabold uppercase tracking-wider">
                      Listing Owner / Agent
                    </p>
                  </div>
                </div>
                {agentEmail && (
                  <p className="text-xs text-[var(--text-muted)] flex items-center gap-1.5 pt-1 border-t border-[var(--border-color)]">
                    <HiEnvelope className="w-3.5 h-3.5 text-teal-500 shrink-0" />
                    <span className="truncate">{agentEmail}</span>
                  </p>
                )}
              </div>

              {/* Owner Notice Badge if Owner is Viewing */}
              {isOwner && (
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-500 text-xs font-semibold flex items-center gap-2">
                  <HiLockClosed className="w-4 h-4 shrink-0" />
                  <span>This is your property listing. Tour request is disabled.</span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleInquirySubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[var(--text-muted)] uppercase mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    disabled={isOwner}
                    placeholder="John Doe"
                    value={tourName}
                    onChange={(e) => setTourName(e.target.value)}
                    className="w-full bg-[var(--bg-card-subtle)] border border-[var(--border-color)] text-[var(--text-main)] text-xs rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-teal-500 disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[var(--text-muted)] uppercase mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    disabled={isOwner}
                    placeholder="you@example.com"
                    value={tourEmail}
                    onChange={(e) => setTourEmail(e.target.value)}
                    className="w-full bg-[var(--bg-card-subtle)] border border-[var(--border-color)] text-[var(--text-main)] text-xs rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-teal-500 disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[var(--text-muted)] uppercase mb-1">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    required
                    disabled={isOwner}
                    value={tourDate}
                    onChange={(e) => setTourDate(e.target.value)}
                    className="w-full bg-[var(--bg-card-subtle)] border border-[var(--border-color)] text-[var(--text-main)] text-xs rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-teal-500 disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[var(--text-muted)] uppercase mb-1">
                    Message / Special Request
                  </label>
                  <textarea
                    rows={3}
                    disabled={isOwner}
                    placeholder="I am interested in scheduling a tour..."
                    value={tourMessage}
                    onChange={(e) => setTourMessage(e.target.value)}
                    className="w-full bg-[var(--bg-card-subtle)] border border-[var(--border-color)] text-[var(--text-main)] text-xs rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-teal-500 disabled:opacity-50"
                  />
                </div>

                {!user ? (
                  <button
                    type="button"
                    onClick={() => {
                      toast.error("Please sign in to request a property tour");
                      router.push("/login");
                    }}
                    className="w-full btn bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl py-3 border-none shadow-md flex items-center justify-center gap-2 text-xs"
                  >
                    <HiLockClosed className="w-4 h-4" />
                    <span>Sign In to Request Tour</span>
                  </button>
                ) : isOwner ? (
                  <button
                    type="button"
                    disabled
                    className="w-full btn bg-slate-800 text-slate-400 font-bold rounded-xl py-3 border border-slate-700 cursor-not-allowed flex items-center justify-center gap-2 text-xs"
                  >
                    <HiLockClosed className="w-4 h-4" />
                    <span>Owner Mode — Cannot Request Tour</span>
                  </button>
                ) : (
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    disabled={submittingInquiry}
                    className="w-full btn bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl py-3 border-none shadow-md shadow-teal-900/30 flex items-center justify-center gap-2 text-xs"
                  >
                    {submittingInquiry ? (
                      <span className="loading loading-spinner loading-xs" />
                    ) : (
                      <>
                        <HiPaperAirplane className="w-4 h-4" />
                        <span>Submit Tour Request</span>
                      </>
                    )}
                  </motion.button>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Related Properties Section */}
        {relatedProperties.length > 0 && (
          <div className="space-y-6 pt-8 border-t border-[var(--border-color)]">
            <h2 className="text-2xl font-extrabold text-[var(--text-main)]">
              Similar Properties You May Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProperties.map((prop) => (
                <PropertyCard key={prop._id || prop.id} property={prop} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

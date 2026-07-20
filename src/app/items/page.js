"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getProperties } from "@/api/properties";
import PropertyCard from "@/components/properties/PropertyCard";
import PropertySkeletonGrid from "@/components/properties/PropertySkeletonGrid";
import {
  HiMagnifyingGlass,
  HiFunnel,
  HiArrowsUpDown,
  HiXMark,
  HiSparkles,
  HiBuildingOffice2,
} from "react-icons/hi2";

const SAMPLE_FALLBACK_PROPERTIES = [
  {
    _id: "64f1a2b3c4d5e6f7a8b9c0d1",
    title: "Skyline Luxury Penthouse",
    type: "penthouse",
    price: 2450000,
    formattedPrice: "$2,450,000",
    location: "742 Evergreen Terrace, San Francisco, CA",
    shortDesc: "Modern skyline views with floor-to-ceiling glass and private elevator access.",
    beds: 3,
    baths: 3,
    sqft: "2,850 sqft",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    createdAt: "2026-07-19T10:00:00.000Z",
  },
  {
    _id: "64f1a2b3c4d5e6f7a8b9c0d2",
    title: "Emerald Bay Coastal Villa",
    type: "villa",
    price: 4800000,
    formattedPrice: "$4,800,000",
    location: "102 Ocean Drive, Malibu Beach, CA",
    shortDesc: "Oceanfront luxury estate featuring panoramic views and infinity pool.",
    beds: 5,
    baths: 4.5,
    sqft: "4,500 sqft",
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80",
    rating: 5.0,
    createdAt: "2026-07-18T10:00:00.000Z",
  },
  {
    _id: "64f1a2b3c4d5e6f7a8b9c0d3",
    title: "The Glass House Estate",
    type: "suburban",
    price: 1850000,
    formattedPrice: "$1,850,000",
    location: "45 Palo Alto Way, Palo Alto, CA",
    shortDesc: "Contemporary architectural masterpiece with smart automated solar panels.",
    beds: 4,
    baths: 3.5,
    sqft: "3,200 sqft",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    createdAt: "2026-07-17T10:00:00.000Z",
  },
  {
    _id: "64f1a2b3c4d5e6f7a8b9c0d4",
    title: "Highland Park Modern Residence",
    type: "apartment",
    price: 950000,
    formattedPrice: "$950,000",
    location: "88 Highland Blvd, Los Angeles, CA",
    shortDesc: "Sleek metropolitan residence with private garden terrace and gym access.",
    beds: 2,
    baths: 2,
    sqft: "1,450 sqft",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    createdAt: "2026-07-16T10:00:00.000Z",
  },
];

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function ExplorePropertiesContent() {
  const searchParams = useSearchParams();
  const initialType = searchParams.get("type") || "";
  const initialSearch = searchParams.get("search") || searchParams.get("location") || "";

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter & Search states
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedType, setSelectedType] = useState(initialType);
  const [priceRange, setPriceRange] = useState("all");
  const [minBeds, setMinBeds] = useState("0");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  useEffect(() => {
    const typeFromUrl = searchParams.get("type");
    const searchFromUrl = searchParams.get("search") || searchParams.get("location");
    if (typeFromUrl !== null) setSelectedType(typeFromUrl);
    if (searchFromUrl !== null) setSearchTerm(searchFromUrl);
  }, [searchParams]);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const res = await getProperties({
          search: searchTerm,
          type: selectedType,
          sort: sortBy,
          limit: 100,
        });

        if (res?.data && Array.isArray(res.data) && res.data.length > 0) {
          setProperties(res.data);
        } else {
          setProperties(SAMPLE_FALLBACK_PROPERTIES);
        }
      } catch (err) {
        setProperties(SAMPLE_FALLBACK_PROPERTIES);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [searchTerm, selectedType, sortBy]);

  // Client side filtering for price & beds
  const filteredProperties = properties.filter((prop) => {
    // Search matching
    const matchSearch =
      !searchTerm ||
      prop.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prop.location?.toLowerCase().includes(searchTerm.toLowerCase());

    // Type matching
    const matchType =
      !selectedType || prop.type?.toLowerCase() === selectedType.toLowerCase();

    // Beds matching
    const bedsNum = Number(minBeds);
    const matchBeds = bedsNum === 0 || (prop.beds && prop.beds >= bedsNum);

    // Price range matching
    const price = typeof prop.price === "number" ? prop.price : 1500000;
    let matchPrice = true;
    if (priceRange === "under1m") matchPrice = price < 1000000;
    if (priceRange === "1m-3m") matchPrice = price >= 1000000 && price <= 3000000;
    if (priceRange === "over3m") matchPrice = price > 3000000;

    return matchSearch && matchType && matchBeds && matchPrice;
  });

  // Client side sorting
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    const priceA = typeof a.price === "number" ? a.price : 1000000;
    const priceB = typeof b.price === "number" ? b.price : 1000000;

    if (sortBy === "price-asc") return priceA - priceB;
    if (sortBy === "price-desc") return priceB - priceA;
    if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
    return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
  });

  // Pagination calculation
  const totalPages = Math.ceil(sortedProperties.length / itemsPerPage) || 1;
  const paginatedProperties = sortedProperties.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedType("");
    setPriceRange("all");
    setMinBeds("0");
    setSortBy("newest");
    setCurrentPage(1);
  };

  const hasActiveFilters =
    searchTerm || selectedType || priceRange !== "all" || minBeds !== "0";

  return (
    <div className="space-y-12 py-10 bg-[var(--bg-main)] text-[var(--text-main)] transition-colors duration-300 min-h-screen">
      {/* Hero Header Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--bg-card)] border border-teal-500/30 text-teal-500 text-xs font-semibold shadow-md">
            <HiSparkles className="w-4 h-4 text-amber-500" />
            <span>AI Verified Marketplace</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Explore Premium Real Estate Listings
          </h1>
          <p className="text-sm sm:text-base text-[var(--text-muted)]">
            Discover luxury homes, skyline penthouses, coastal villas, and smart residences verified by AI.
          </p>
        </div>

        {/* Live Search & Filter Bar */}
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] p-4 sm:p-6 rounded-3xl shadow-xl space-y-4">
          {/* Main Search Input */}
          <div className="relative flex items-center">
            <HiMagnifyingGlass className="absolute left-4 text-teal-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Search properties by title, neighborhood, or city..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-[var(--bg-card-subtle)] border border-[var(--border-color)] text-[var(--text-main)] text-sm rounded-2xl pl-12 pr-4 py-3.5 focus:outline-none focus:border-teal-500 transition-colors placeholder:text-[var(--text-muted)]"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-4 text-[var(--text-muted)] hover:text-[var(--text-main)]"
              >
                <HiXMark className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Filter Controls Row */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
            {/* Type Filter */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1">
                Property Type
              </label>
              <select
                value={selectedType}
                onChange={(e) => {
                  setSelectedType(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full bg-[var(--bg-card-subtle)] border border-[var(--border-color)] text-[var(--text-main)] text-xs font-medium rounded-xl px-3 py-2.5 focus:outline-none focus:border-teal-500 cursor-pointer"
              >
                <option value="">All Types</option>
                <option value="apartment">Apartment</option>
                <option value="villa">Villa</option>
                <option value="penthouse">Penthouse</option>
                <option value="suburban">Suburban Home</option>
              </select>
            </div>

            {/* Price Range Filter */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1">
                Price Range
              </label>
              <select
                value={priceRange}
                onChange={(e) => {
                  setPriceRange(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full bg-[var(--bg-card-subtle)] border border-[var(--border-color)] text-[var(--text-main)] text-xs font-medium rounded-xl px-3 py-2.5 focus:outline-none focus:border-teal-500 cursor-pointer"
              >
                <option value="all">Any Price</option>
                <option value="under1m">Under $1,000,000</option>
                <option value="1m-3m">$1,000,000 – $3,000,000</option>
                <option value="over3m">Above $3,000,000</option>
              </select>
            </div>

            {/* Bedrooms Filter */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1">
                Min Bedrooms
              </label>
              <select
                value={minBeds}
                onChange={(e) => {
                  setMinBeds(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full bg-[var(--bg-card-subtle)] border border-[var(--border-color)] text-[var(--text-main)] text-xs font-medium rounded-xl px-3 py-2.5 focus:outline-none focus:border-teal-500 cursor-pointer"
              >
                <option value="0">Any Beds</option>
                <option value="2">2+ Bedrooms</option>
                <option value="3">3+ Bedrooms</option>
                <option value="4">4+ Bedrooms</option>
              </select>
            </div>

            {/* Sorting */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-[var(--bg-card-subtle)] border border-[var(--border-color)] text-[var(--text-main)] text-xs font-medium rounded-xl px-3 py-2.5 focus:outline-none focus:border-teal-500 cursor-pointer"
              >
                <option value="newest">Newest First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            {/* Items Per Page */}
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1">
                Show Per Page
              </label>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="w-full bg-[var(--bg-card-subtle)] border border-[var(--border-color)] text-[var(--text-main)] text-xs font-medium rounded-xl px-3 py-2.5 focus:outline-none focus:border-teal-500 cursor-pointer"
              >
                <option value={8}>8 per page</option>
                <option value={12}>12 per page</option>
                <option value={24}>24 per page</option>
              </select>
            </div>
          </div>

          {/* Active Filter Tags */}
          {hasActiveFilters && (
            <div className="flex items-center justify-between pt-3 border-t border-[var(--border-color)] text-xs">
              <span className="text-[var(--text-muted)] font-medium">
                Showing {sortedProperties.length} matching properties
              </span>
              <button
                onClick={resetFilters}
                className="text-red-500 hover:underline font-bold flex items-center gap-1"
              >
                <HiXMark className="w-4 h-4" /> Reset All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Property Cards Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {loading ? (
          <PropertySkeletonGrid count={8} />
        ) : paginatedProperties.length === 0 ? (
          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] p-12 rounded-3xl text-center space-y-4 shadow-xl">
            <div className="w-14 h-14 rounded-2xl bg-[var(--bg-card-subtle)] flex items-center justify-center text-[var(--text-muted)] mx-auto">
              <HiBuildingOffice2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-[var(--text-main)]">No properties found</h3>
            <p className="text-xs text-[var(--text-muted)] max-w-sm mx-auto">
              No real estate listings match your search criteria. Try clearing filters or adjusting your keywords.
            </p>
            <button
              onClick={resetFilters}
              className="btn btn-sm bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl px-6 border-none mt-2"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {paginatedProperties.map((property) => (
              <PropertyCard key={property._id || property.id} property={property} />
            ))}
          </div>
        )}

        {/* Pagination Bar */}
        {sortedProperties.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-[var(--border-color)]">
            <p className="text-xs font-semibold text-[var(--text-muted)]">
              Showing <span className="text-[var(--text-main)] font-bold">{(currentPage - 1) * itemsPerPage + 1}</span> to{" "}
              <span className="text-[var(--text-main)] font-bold">{Math.min(currentPage * itemsPerPage, sortedProperties.length)}</span> of{" "}
              <span className="text-[var(--text-main)] font-bold">{sortedProperties.length}</span> properties
            </p>

            <div className="flex items-center gap-1.5">
              <button
                disabled={currentPage === 1}
                onClick={() => {
                  setCurrentPage((prev) => Math.max(prev - 1, 1));
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="btn btn-sm bg-[var(--bg-card-subtle)] hover:bg-[var(--bg-card)] text-[var(--text-main)] border border-[var(--border-color)] rounded-xl px-3 text-xs disabled:opacity-30"
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => {
                    setCurrentPage(pageNum);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className={`w-8 h-8 rounded-xl text-xs font-bold transition-all border ${
                    currentPage === pageNum
                      ? "bg-teal-600 border-teal-500 text-white shadow-md shadow-teal-900/30"
                      : "bg-[var(--bg-card-subtle)] border-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--text-main)]"
                  }`}
                >
                  {pageNum}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => {
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages));
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="btn btn-sm bg-[var(--bg-card-subtle)] hover:bg-[var(--bg-card)] text-[var(--text-main)] border border-[var(--border-color)] rounded-xl px-3 text-xs disabled:opacity-30"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default function ExplorePropertiesPage() {
  return (
    <Suspense
      fallback={
        <div className="p-12 text-center text-teal-500 font-bold">
          Loading Explore Marketplace...
        </div>
      }
    >
      <ExplorePropertiesContent />
    </Suspense>
  );
}

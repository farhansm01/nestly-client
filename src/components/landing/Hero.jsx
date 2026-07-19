"use client";

import { useState } from "react";
import Link from "next/link";
import { HiSparkles, HiMapPin, HiBuildingOffice2, HiCurrencyDollar, HiFunnel, HiMagnifyingGlass } from "react-icons/hi2";
import { ChevronDown } from "@gravity-ui/icons";

export default function Hero() {
  const [activeTab, setActiveTab] = useState("buy");
  const [searchLocation, setSearchLocation] = useState("");
  const [propertyType, setPropertyType] = useState("all");

  return (
    <section className="relative min-h-[70vh] flex flex-col justify-center bg-[var(--bg-main)] overflow-hidden py-16 lg:py-24 transition-colors duration-300">
      {/* Background Decorative Gradient Blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          {/* AI Feature Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--bg-card)] border border-teal-500/30 text-teal-600 dark:text-teal-300 text-sm font-medium shadow-lg backdrop-blur-md">
            <HiSparkles className="w-4 h-4 text-amber-500 animate-pulse" />
            <span>AI-Powered Property Matching & Smart Valuations</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[var(--text-main)] tracking-tight leading-tight">
            Find Your Dream Home with <span className="bg-gradient-to-r from-teal-500 via-amber-500 to-teal-400 bg-clip-text text-transparent">AI Precision</span>
          </h1>

          <p className="text-lg text-[var(--text-muted)] leading-relaxed font-normal max-w-2xl mx-auto">
            Discover curated luxury properties, intelligent price predictions, and seamless lease intelligence tailored to your lifestyle.
          </p>

          {/* Search Card Container */}
          <div className="mt-8 bg-[var(--bg-card)] p-4 sm:p-6 rounded-3xl border border-[var(--border-color)] shadow-2xl backdrop-blur-xl max-w-4xl mx-auto text-left">
            {/* Search Type Tabs */}
            <div className="flex items-center gap-2 mb-4">
              <button
                onClick={() => setActiveTab("buy")}
                className={`px-5 py-2 rounded-xl font-medium text-sm transition-all ${
                  activeTab === "buy"
                    ? "bg-teal-600 text-white shadow-md shadow-teal-900/40"
                    : "text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-card-subtle)]"
                }`}
              >
                Buy Property
              </button>
              <button
                onClick={() => setActiveTab("rent")}
                className={`px-5 py-2 rounded-xl font-medium text-sm transition-all ${
                  activeTab === "rent"
                    ? "bg-teal-600 text-white shadow-md shadow-teal-900/40"
                    : "text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-card-subtle)]"
                }`}
              >
                Rent Property
              </button>
            </div>

            {/* Filter Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Location Input */}
              <div className="bg-[var(--bg-card-subtle)] border border-[var(--border-color)] rounded-2xl p-3 flex items-center gap-3">
                <HiMapPin className="w-5 h-5 text-teal-500 shrink-0" />
                <div className="w-full">
                  <label className="block text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                    Location
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. San Francisco, CA"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    className="w-full bg-transparent text-[var(--text-main)] text-sm focus:outline-none placeholder:text-[var(--text-muted)]"
                  />
                </div>
              </div>

              {/* Property Type Dropdown */}
              <div className="bg-[var(--bg-card-subtle)] border border-[var(--border-color)] rounded-2xl p-3 flex items-center gap-3">
                <HiBuildingOffice2 className="w-5 h-5 text-amber-500 shrink-0" />
                <div className="w-full">
                  <label className="block text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                    Property Type
                  </label>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full bg-transparent text-[var(--text-main)] text-sm focus:outline-none cursor-pointer"
                  >
                    <option value="all" className="bg-[var(--bg-card)] text-[var(--text-main)]">All Types</option>
                    <option value="apartment" className="bg-[var(--bg-card)] text-[var(--text-main)]">Apartment</option>
                    <option value="villa" className="bg-[var(--bg-card)] text-[var(--text-main)]">Villa</option>
                    <option value="penthouse" className="bg-[var(--bg-card)] text-[var(--text-main)]">Penthouse</option>
                  </select>
                </div>
              </div>

              {/* Submit CTA Button */}
              <Link
                href={`/items?type=${propertyType}&location=${encodeURIComponent(searchLocation)}`}
                className="btn h-full bg-gradient-to-r from-teal-500 to-amber-500 hover:from-teal-400 hover:to-amber-400 border-none text-slate-950 font-bold text-base rounded-2xl flex items-center justify-center gap-2 shadow-lg"
              >
                <HiMagnifyingGlass className="w-5 h-5 text-slate-950" />
                <span>Search Properties</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-12 flex justify-center">
          <a
            href="#featured"
            className="flex flex-col items-center gap-1 text-[var(--text-muted)] hover:text-teal-500 text-xs font-medium transition-colors group"
          >
            <span>Explore Listings</span>
            <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}

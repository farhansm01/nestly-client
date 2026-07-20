"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { HiSparkles, HiMapPin, HiBuildingOffice2, HiCurrencyDollar, HiFunnel, HiMagnifyingGlass } from "react-icons/hi2";
import { ChevronDown } from "@gravity-ui/icons";

export default function Hero() {
  const [activeTab, setActiveTab] = useState("buy");
  const [searchLocation, setSearchLocation] = useState("");
  const [propertyType, setPropertyType] = useState("all");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section className="relative min-h-[70vh] flex flex-col justify-center bg-[var(--bg-main)] overflow-hidden py-16 lg:py-24 transition-colors duration-300">
      {/* Background Decorative Gradient Blobs with Floating Motion */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.18, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-0 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10"
      >
        <div className="text-center max-w-3xl mx-auto space-y-6">
          {/* AI Feature Pill Badge */}
          <motion.div variants={itemVariants} className="inline-block">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--bg-card)] border border-teal-500/30 text-teal-600 dark:text-teal-300 text-sm font-medium shadow-lg backdrop-blur-md">
              <HiSparkles className="w-4 h-4 text-amber-500 animate-pulse" />
              <span>AI-Powered Property Matching & Smart Valuations</span>
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[var(--text-main)] tracking-tight leading-tight"
          >
            Find Your Dream Home with{" "}
            <span className="bg-gradient-to-r from-teal-500 via-amber-500 to-teal-400 bg-clip-text text-transparent">
              AI Precision
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg text-[var(--text-muted)] leading-relaxed font-normal max-w-2xl mx-auto"
          >
            Discover curated luxury properties, intelligent price predictions, and smart property intelligence tailored to your lifestyle.
          </motion.p>

          {/* Search Card Container */}
          <motion.div
            variants={itemVariants}
            className="mt-8 bg-[var(--bg-card)] p-4 sm:p-6 rounded-3xl border border-[var(--border-color)] shadow-2xl backdrop-blur-xl max-w-4xl mx-auto text-left"
          >
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
                onClick={() => setActiveTab("sell")}
                className={`px-5 py-2 rounded-xl font-medium text-sm transition-all ${
                  activeTab === "sell"
                    ? "bg-teal-600 text-white shadow-md shadow-teal-900/40"
                    : "text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-card-subtle)]"
                }`}
              >
                Sell / List Property
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
                    <option value="suburban" className="bg-[var(--bg-card)] text-[var(--text-main)]">Suburban Home</option>
                  </select>
                </div>
              </div>

              {/* Submit CTA Button */}
              <motion.div whileTap={{ scale: 0.97 }} className="h-full">
                <Link
                  href={
                    activeTab === "sell"
                      ? "/dashboard/add"
                      : `/items?type=${propertyType === "all" ? "" : propertyType}&search=${encodeURIComponent(searchLocation)}`
                  }
                  className="btn h-full bg-gradient-to-r from-teal-500 to-amber-500 hover:from-teal-400 hover:to-amber-400 border-none text-slate-950 font-bold text-base rounded-2xl flex items-center justify-center gap-2 shadow-lg"
                >
                  <HiMagnifyingGlass className="w-5 h-5 text-slate-950" />
                  <span>{activeTab === "sell" ? "Post Your Listing" : "Search Properties"}</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator with Bounce Animation */}
        <motion.div
          variants={itemVariants}
          className="mt-12 flex justify-center"
        >
          <motion.a
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            href="#featured"
            className="flex flex-col items-center gap-1 text-[var(--text-muted)] hover:text-teal-500 text-xs font-medium transition-colors"
          >
            <span>Explore Listings</span>
            <ChevronDown className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}

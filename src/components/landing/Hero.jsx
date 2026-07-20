"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { HiSparkles, HiMapPin, HiBuildingOffice2, HiMagnifyingGlass, HiStar } from "react-icons/hi2";
import { ChevronDown } from "@gravity-ui/icons";

const heroSlides = [
  {
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=900&q=80&auto=format&fit=crop",
    label: "Luxury Penthouse",
    location: "Manhattan, New York",
    price: "$4,200,000",
    badge: "⭐ 99% Match",
    badgeColor: "from-amber-500 to-yellow-400",
  },
  {
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&q=80&auto=format&fit=crop",
    label: "Modern Villa",
    location: "Beverly Hills, CA",
    price: "$7,800,000",
    badge: "🔥 Top Pick",
    badgeColor: "from-orange-500 to-red-400",
  },
  {
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=900&q=80&auto=format&fit=crop",
    label: "Oceanfront Estate",
    location: "Malibu, CA",
    price: "$12,500,000",
    badge: "🌊 Ocean View",
    badgeColor: "from-teal-500 to-cyan-400",
  },
  {
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&q=80&auto=format&fit=crop",
    label: "Contemporary Home",
    location: "Palo Alto, CA",
    price: "$3,400,000",
    badge: "🏡 Smart Home",
    badgeColor: "from-violet-500 to-purple-400",
  },
];

export default function Hero() {
  const [activeTab, setActiveTab] = useState("buy");
  const [searchLocation, setSearchLocation] = useState("");
  const [propertyType, setPropertyType] = useState("all");
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance image slider every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

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

  const slide = heroSlides[currentSlide];

  return (
    <section className="relative min-h-[80vh] flex flex-col justify-center bg-[var(--bg-main)] overflow-hidden py-12 lg:py-20 transition-colors duration-300">
      {/* Background Gradient Blobs */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.18, 0.1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.15, 0.1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ===== LEFT: Text + Search ===== */}
          <div className="space-y-6 text-center lg:text-left">
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
              className="text-lg text-[var(--text-muted)] leading-relaxed font-normal max-w-xl mx-auto lg:mx-0"
            >
              Discover curated luxury properties, intelligent price predictions, and smart property intelligence tailored to your lifestyle.
            </motion.p>

            {/* Search Card */}
            <motion.div
              variants={itemVariants}
              className="mt-4 bg-[var(--bg-card)] p-4 sm:p-5 rounded-3xl border border-[var(--border-color)] shadow-2xl backdrop-blur-xl text-left"
            >
              {/* Tabs */}
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

              {/* Filter Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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

            {/* Scroll Indicator */}
            <motion.div variants={itemVariants} className="flex justify-center lg:justify-start">
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
          </div>

          {/* ===== RIGHT: Image Slider ===== */}
          <motion.div variants={itemVariants} className="hidden lg:block relative">
            {/* Main Slider Frame */}
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden border border-[var(--border-color)] shadow-2xl shadow-teal-900/20">
              {/* Glow ring */}
              <div className="absolute inset-0 rounded-3xl ring-1 ring-teal-500/20 pointer-events-none z-10" />

              {/* Slides */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={slide.image}
                    alt={slide.label}
                    className="w-full h-full object-cover"
                  />
                  {/* Dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                </motion.div>
              </AnimatePresence>

              {/* Property Info Overlay */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`info-${currentSlide}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="absolute bottom-0 left-0 right-0 p-6 z-20"
                >
                  {/* Badge */}
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${slide.badgeColor} text-white shadow-lg mb-3`}>
                    {slide.badge}
                  </span>
                  <h3 className="text-white text-xl font-extrabold tracking-tight leading-snug">
                    {slide.label}
                  </h3>
                  <p className="text-white/70 text-sm mt-0.5 flex items-center gap-1">
                    <HiMapPin className="w-3.5 h-3.5 text-teal-400" />
                    {slide.location}
                  </p>
                  <p className="text-teal-300 text-lg font-bold mt-1">{slide.price}</p>
                </motion.div>
              </AnimatePresence>

              {/* Dot Indicators */}
              <div className="absolute top-4 right-4 z-20 flex gap-1.5">
                {heroSlides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`transition-all duration-300 rounded-full ${
                      idx === currentSlide
                        ? "w-6 h-2 bg-teal-400"
                        : "w-2 h-2 bg-white/40 hover:bg-white/70"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Floating Stats Cards */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -left-6 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl px-4 py-3 shadow-xl flex items-center gap-3"
            >
              <div className="w-9 h-9 rounded-xl bg-teal-500/15 flex items-center justify-center">
                <HiBuildingOffice2 className="w-5 h-5 text-teal-500" />
              </div>
              <div>
                <p className="text-[var(--text-main)] font-bold text-sm">1,200+</p>
                <p className="text-[var(--text-muted)] text-xs">Active Listings</p>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-6 -right-6 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl px-4 py-3 shadow-xl flex items-center gap-3"
            >
              <div className="w-9 h-9 rounded-xl bg-amber-500/15 flex items-center justify-center">
                <HiStar className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <p className="text-[var(--text-main)] font-bold text-sm">98% Match</p>
                <p className="text-[var(--text-muted)] text-xs">AI Precision Score</p>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}

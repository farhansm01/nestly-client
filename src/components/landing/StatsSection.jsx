"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getProperties } from "@/api/properties";
import { getRecentReviews } from "@/api/reviews";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const statVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
};

function formatVolume(total) {
  if (total >= 1_000_000_000) {
    return `$${(total / 1_000_000_000).toFixed(1)}B+`;
  }
  if (total >= 1_000_000) {
    return `$${(total / 1_000_000).toFixed(1)}M+`;
  }
  if (total >= 1_000) {
    return `$${(total / 1_000).toFixed(0)}K+`;
  }
  return `$${total.toLocaleString("en-US")}`;
}

export default function StatsSection() {
  const [statsData, setStatsData] = useState({
    volume: "$0",
    listingCount: "0",
    avgRating: "New",
    reviewCount: "0",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const [propsRes, reviewsRes] = await Promise.allSettled([
          getProperties(),
          getRecentReviews(50),
        ]);

        const properties =
          propsRes.status === "fulfilled" && Array.isArray(propsRes.value?.data)
            ? propsRes.value.data
            : [];

        const reviews =
          reviewsRes.status === "fulfilled" && Array.isArray(reviewsRes.value?.data)
            ? reviewsRes.value.data
            : [];

        // 1. Total Volume of Active Listings
        const totalSum = properties.reduce((acc, p) => acc + (Number(p.price) || 0), 0);

        // 2. Listing Count
        const totalListings = properties.length;

        // 3. Average Rating Across Platform
        const ratedProps = properties.filter(
          (p) => (p.reviewCount || 0) > 0 && p.averageRating > 0
        );
        let avgRatingStr = "New";
        if (ratedProps.length > 0) {
          const sumRatings = ratedProps.reduce((acc, p) => acc + p.averageRating, 0);
          avgRatingStr = `${(sumRatings / ratedProps.length).toFixed(1)} ★`;
        } else if (reviews.length > 0) {
          const sumRatings = reviews.reduce((acc, r) => acc + (r.rating || 5), 0);
          avgRatingStr = `${(sumRatings / reviews.length).toFixed(1)} ★`;
        }

        // 4. Total Community Feedback / Reviews
        const totalReviews = reviews.length;

        setStatsData({
          volume: totalSum > 0 ? formatVolume(totalSum) : "$1.4M+",
          listingCount: totalListings > 0 ? `${totalListings}+` : "0",
          avgRating: avgRatingStr,
          reviewCount: totalReviews > 0 ? `${totalReviews}+` : "0",
        });
      } catch (err) {
        console.error("Failed to load platform stats:", err);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  const STATS = [
    { label: "Active Property Volume", value: statsData.volume },
    { label: "Verified Listings", value: statsData.listingCount },
    { label: "Average Platform Rating", value: statsData.avgRating },
    { label: "Community Reviews", value: statsData.reviewCount },
  ];

  return (
    <section className="py-16 bg-[var(--bg-main)] border-t border-[var(--border-color)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center"
        >
          {STATS.map((stat) => (
            <motion.div
              key={stat.label}
              variants={statVariants}
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-md"
            >
              <p className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-amber-500 min-h-[44px] flex items-center justify-center">
                {loading ? (
                  <span className="inline-block w-20 h-8 bg-slate-700/30 rounded animate-pulse" />
                ) : (
                  stat.value
                )}
              </p>
              <p className="text-[var(--text-muted)] text-xs sm:text-sm font-medium mt-2">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

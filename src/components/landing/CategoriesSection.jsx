"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { getProperties } from "@/api/properties";

const CATEGORIES = [
  {
    name: "Modern Apartments",
    icon: "🏢",
    type: "apartment",
    desc: "Sleek city center apartments with luxury amenities.",
  },
  {
    name: "Luxury Villas",
    icon: "🏡",
    type: "villa",
    desc: "Spacious private estates with infinity pools and sprawling gardens.",
  },
  {
    name: "Urban Penthouses",
    icon: "🏙️",
    type: "penthouse",
    desc: "High-floor penthouses featuring panoramic skyline views.",
  },
  {
    name: "Suburban Family Homes",
    icon: "🏠",
    type: "suburban",
    desc: "Charming family residences in quiet, top-rated school districts.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function CategoriesSection() {
  const [counts, setCounts] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCounts() {
      try {
        const res = await getProperties();
        const properties = res?.data && Array.isArray(res.data) ? res.data : [];

        const countsMap = {};
        CATEGORIES.forEach((cat) => {
          const matchCount = properties.filter((p) => {
            const pType = (p.type || "").toLowerCase();
            const cType = cat.type.toLowerCase();
            return pType.includes(cType) || cType.includes(pType);
          }).length;
          countsMap[cat.type] = matchCount;
        });

        setCounts(countsMap);
      } catch (err) {
        console.error("Failed to fetch category property counts:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchCounts();
  }, []);

  return (
    <section className="py-20 bg-[var(--bg-main)] border-t border-[var(--border-color)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="text-teal-500 font-semibold text-sm tracking-wider uppercase">
            Curated Categories
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-main)] mt-1">
            Browse by Property Type
          </h2>
          <p className="text-[var(--text-muted)] text-sm mt-2">
            Explore homes tailored to your exact architectural and lifestyle preferences.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {CATEGORIES.map((cat) => {
            const count = counts[cat.type];
            return (
              <motion.div
                key={cat.type}
                variants={itemVariants}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Link
                  href={`/items?type=${cat.type}`}
                  className="bg-[var(--bg-card)] border border-[var(--border-color)] hover:border-teal-500/50 p-6 rounded-2xl transition-colors duration-300 group flex flex-col justify-between h-full shadow-md"
                >
                  <div>
                    <motion.div
                      whileHover={{ rotate: 10, scale: 1.1 }}
                      className="text-4xl mb-4 p-3 bg-[var(--bg-card-subtle)] rounded-2xl w-fit border border-[var(--border-color)]"
                    >
                      {cat.icon}
                    </motion.div>
                    <h3 className="text-xl font-bold text-[var(--text-main)] group-hover:text-teal-500 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-[var(--text-muted)] text-xs mt-2 leading-relaxed">
                      {cat.desc}
                    </p>
                  </div>
                  <div className="mt-6 flex items-center justify-between pt-4 border-t border-[var(--border-color)] text-xs font-semibold">
                    <span className="text-amber-500 font-bold">
                      {loading ? (
                        <span className="inline-block w-16 h-4 bg-slate-700/30 rounded animate-pulse" />
                      ) : (
                        `${count ?? 0} ${count === 1 ? "Listing" : "Listings"}`
                      )}
                    </span>
                    <span className="text-teal-500 group-hover:translate-x-1 transition-transform">
                      Explore →
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

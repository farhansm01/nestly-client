"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { getProperties } from "@/api/properties";
import PropertyCard from "@/components/properties/PropertyCard";
import PropertySkeletonGrid from "@/components/properties/PropertySkeletonGrid";
import { HiSparkles } from "react-icons/hi2";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

export default function FeaturedProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProperties() {
      try {
        setLoading(true);
        const res = await getProperties({ limit: 4, sort: "rating" });
        if (res?.data && Array.isArray(res.data) && res.data.length > 0) {
          setProperties(res.data.slice(0, 4));
        }
      } catch (err) {
        console.error("Failed to fetch featured properties:", err);
      } finally {
        setLoading(false);
      }
    }
    loadProperties();
  }, []);

  return (
    <section id="featured" className="py-20 bg-[var(--bg-main)] border-t border-[var(--border-color)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4"
        >
          <div>
            <span className="text-teal-500 font-semibold text-sm tracking-wider uppercase flex items-center gap-1">
              <HiSparkles className="w-4 h-4 text-amber-500" /> Handpicked Selection
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-main)] mt-1">
              Featured Properties
            </h2>
          </div>
          <Link
            href="/items"
            className="btn btn-outline border-[var(--border-color)] hover:border-teal-500 text-[var(--text-main)] rounded-xl"
          >
            View All Properties
          </Link>
        </motion.div>

        {loading ? (
          <PropertySkeletonGrid count={4} />
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {properties.map((property) => (
              <PropertyCard key={property._id || property.id} property={property} />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}

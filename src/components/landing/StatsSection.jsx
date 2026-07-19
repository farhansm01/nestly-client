"use client";

import { motion } from "framer-motion";

const STATS = [
  { label: "Active Property Volume", value: "$1.4B+" },
  { label: "Verified Listings", value: "15,000+" },
  { label: "AI Valuation Accuracy", value: "99.2%" },
  { label: "Happy Homeowners", value: "8,500+" },
];

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

export default function StatsSection() {
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
              <p className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-amber-500">
                {stat.value}
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

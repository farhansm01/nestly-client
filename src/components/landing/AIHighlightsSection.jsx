"use client";

import { motion } from "framer-motion";
import { HiSparkles } from "react-icons/hi2";

const AI_FEATURES = [
  {
    title: "AI Recommendation Engine",
    desc: "Ranked property recommendations based on historical browsing behavior, budget constraints, and neighborhood preferences.",
    badge: "Smart Match",
  },
  {
    title: "Lease Document Intelligence",
    desc: "Upload complex lease agreements to generate instant key highlights, term summaries, and risk flags.",
    badge: "Doc Intel",
  },
  {
    title: "24/7 AI Real Estate Assistant",
    desc: "Conversational assistant ready to answer questions about pricing history, tax rates, school districts, and mortgage calculations.",
    badge: "AI Assistant",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function AIHighlightsSection() {
  return (
    <section id="ai-features" className="py-20 bg-[var(--bg-main)] border-t border-[var(--border-color)] relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-300 border border-teal-500/30 text-xs font-semibold mb-3">
            <HiSparkles className="w-3.5 h-3.5 text-amber-500" /> Powered by Advanced AI
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-main)]">
            Intelligent Features Made for Modern Buyers
          </h2>
          <p className="text-[var(--text-muted)] text-sm mt-2">
            Experience next-generation tools designed to save time and give you a competitive edge.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {AI_FEATURES.map((feat) => (
            <motion.div
              key={feat.title}
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="p-8 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-color)] backdrop-blur-md flex flex-col justify-between hover:border-teal-500/50 transition-colors shadow-xl"
            >
              <div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-[var(--bg-card-subtle)] text-[var(--text-main)] border border-[var(--border-color)]">
                  {feat.badge}
                </span>
                <h3 className="text-2xl font-bold text-[var(--text-main)] mt-4 mb-3">
                  {feat.title}
                </h3>
                <p className="text-[var(--text-muted)] text-sm leading-relaxed">
                  {feat.desc}
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-[var(--border-color)] flex items-center gap-2 text-xs font-semibold text-teal-500">
                <HiSparkles className="w-4 h-4 text-amber-500" />
                <span>Integrated in Nestly Core</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

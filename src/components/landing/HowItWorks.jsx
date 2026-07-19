"use client";

import { motion } from "framer-motion";

const STEPS = [
  {
    num: "01",
    title: "Set Your Preferences",
    desc: "Specify desired location, budget range, and property specs. Nestly's AI customizes your recommendation stream.",
    icon: "🎯",
  },
  {
    num: "02",
    title: "AI Valuation & Document Check",
    desc: "Analyze instant market valuation estimates and upload lease documents for automated intelligence summaries.",
    icon: "⚡",
  },
  {
    num: "03",
    title: "Seamless Tour & Closing",
    desc: "Connect directly with verified sellers, schedule private tours, and execute agreements effortlessly.",
    icon: "🔑",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const stepVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5 } },
};

export default function HowItWorks() {
  return (
    <section className="py-20 bg-[var(--bg-main)] border-t border-[var(--border-color)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-teal-500 font-semibold text-sm tracking-wider uppercase">
            Simple Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-main)] mt-1">
            How Nestly Works
          </h2>
          <p className="text-[var(--text-muted)] text-sm mt-2">
            Three simple steps to finding, evaluating, and securing your next real estate investment.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 relative"
        >
          {STEPS.map((step) => (
            <motion.div
              key={step.num}
              variants={stepVariants}
              whileHover={{ y: -6 }}
              className="bg-[var(--bg-card)] border border-[var(--border-color)] p-8 rounded-3xl relative hover:border-teal-500/40 transition-colors shadow-md"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="text-3xl">{step.icon}</span>
                <span className="text-4xl font-black text-teal-500/20 font-mono">
                  {step.num}
                </span>
              </div>
              <h3 className="text-xl font-bold text-[var(--text-main)] mb-2">
                {step.title}
              </h3>
              <p className="text-[var(--text-muted)] text-sm leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

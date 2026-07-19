"use client";

import { motion } from "framer-motion";
import { Star } from "@gravity-ui/icons";

const TESTIMONIALS = [
  {
    name: "Sarah Jenkins",
    role: "Homeowner in San Francisco",
    content: "The AI recommendation matched me with a penthouse in Pacific Heights that wasn't even on my radar. The valuation summary saved us $40,000 during closing!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Marcus Vance",
    role: "Real Estate Investor",
    content: "Document Intelligence is a game changer. Uploading complex agreements and getting instant summaries made due diligence 10x faster.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Elena Rostova",
    role: "First-time Buyer",
    content: "Nestly's AI Assistant answered all my questions about tax rates and mortgage breakdowns cleanly. Super intuitive and transparent platform!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
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
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function TestimonialsSection() {
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
            User Stories
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-main)] mt-1">
            Loved by Buyers & Investors
          </h2>
          <p className="text-[var(--text-muted)] text-sm mt-2">
            See how Nestly's AI real estate platform helps people make confident decisions.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {TESTIMONIALS.map((t) => (
            <motion.div
              key={t.name}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              className="bg-[var(--bg-card)] border border-[var(--border-color)] p-8 rounded-3xl flex flex-col justify-between hover:border-teal-500/40 transition-colors shadow-lg"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <p className="text-[var(--text-muted)] text-sm leading-relaxed italic">
                  "{t.content}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-6 mt-6 border-t border-[var(--border-color)]">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover border border-teal-500/40"
                />
                <div>
                  <h4 className="text-[var(--text-main)] font-bold text-sm">{t.name}</h4>
                  <p className="text-[var(--text-muted)] text-xs">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

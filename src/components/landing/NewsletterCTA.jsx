"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { HiSparkles } from "react-icons/hi2";

export default function NewsletterCTA() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter a valid email address");
      return;
    }
    toast.success("Subscribed! You will receive AI market alerts.");
    setEmail("");
  };

  return (
    <section className="py-20 bg-[var(--bg-main)] border-t border-[var(--border-color)] relative transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[var(--bg-card)] border border-[var(--border-color)] p-8 sm:p-12 rounded-3xl text-center shadow-2xl relative overflow-hidden"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-300 text-xs font-semibold mb-4 border border-teal-500/30">
            <HiSparkles className="w-4 h-4 text-amber-500" /> Never Miss a Deal
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-main)] tracking-tight">
            Get Instant AI Real Estate Market Alerts
          </h2>
          <p className="text-[var(--text-muted)] text-sm max-w-xl mx-auto mt-3 leading-relaxed">
            Subscribe to receive personalized price drop notifications, high-value investment alerts, and new listing matches.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Enter your email address..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full sm:flex-1 bg-[var(--bg-card-subtle)] border border-[var(--border-color)] focus:border-teal-500 text-[var(--text-main)] text-sm rounded-xl px-4 py-3.5 focus:outline-none placeholder:text-[var(--text-muted)]"
            />
            <motion.button
              whileTap={{ scale: 0.96 }}
              type="submit"
              className="w-full sm:w-auto btn bg-teal-600 hover:bg-teal-500 text-white font-bold px-6 py-3.5 rounded-xl border-none shadow-md shadow-teal-900/30"
            >
              Subscribe Now
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

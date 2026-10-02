"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { HiSparkles, HiCheckCircle } from "react-icons/hi2";
import { subscribeToNewsletter } from "@/actions/newsletter";

export default function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      setLoading(true);
      const res = await subscribeToNewsletter(email);
      if (res?.success) {
        toast.success(res.message || "Subscribed to AI market alerts!");
        setSubscribed(true);
        setEmail("");
      } else {
        toast.error(res?.message || "Failed to subscribe. Please try again.");
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
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

          {subscribed ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-8 p-4 bg-teal-500/10 border border-teal-500/30 rounded-2xl max-w-md mx-auto flex items-center justify-center gap-3 text-teal-400 font-semibold text-sm"
            >
              <HiCheckCircle className="w-6 h-6 text-teal-400 shrink-0" />
              <span>You're subscribed! We'll notify you on new listing alerts.</span>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-lg mx-auto">
              <input
                type="email"
                required
                disabled={loading}
                placeholder="Enter your email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full sm:flex-1 bg-[var(--bg-card-subtle)] border border-[var(--border-color)] focus:border-teal-500 text-[var(--text-main)] text-sm rounded-xl px-4 py-3.5 focus:outline-none placeholder:text-[var(--text-muted)] disabled:opacity-50"
              />
              <motion.button
                whileTap={{ scale: 0.96 }}
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto btn bg-teal-600 hover:bg-teal-500 text-white font-bold px-6 py-3.5 rounded-xl border-none shadow-md shadow-teal-900/30 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Subscribing...</span>
                  </>
                ) : (
                  <span>Subscribe Now</span>
                )}
              </motion.button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}

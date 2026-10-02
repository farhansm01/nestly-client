"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { getRecentReviews } from "@/api/reviews";
import { HiStar, HiChatBubbleLeftRight, HiBuildingOffice2, HiUser } from "react-icons/hi2";

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
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadReviews() {
      try {
        setLoading(true);
        const res = await getRecentReviews(6);
        if (res?.success && Array.isArray(res.data)) {
          setReviews(res.data);
        }
      } catch (err) {
        console.error("Failed to load homepage testimonials:", err);
      } finally {
        setLoading(false);
      }
    }
    loadReviews();
  }, []);

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
          <span className="text-teal-500 font-semibold text-sm tracking-wider uppercase flex items-center justify-center gap-1">
            <HiChatBubbleLeftRight className="w-4 h-4 text-amber-500" /> Buyer Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-main)] mt-1">
            Verified Reviews & Feedback
          </h2>
          <p className="text-[var(--text-muted)] text-sm mt-2">
            Real experiences and ratings from buyers on the Nestly real estate platform.
          </p>
        </motion.div>

        {loading ? (
          <div className="py-12 text-center text-xs text-[var(--text-muted)] space-y-2">
            <span className="loading loading-spinner loading-md text-teal-500" />
            <p>Loading buyer reviews...</p>
          </div>
        ) : reviews.length === 0 ? (
          <div className="py-12 text-center bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl p-8 max-w-lg mx-auto space-y-3 shadow-lg">
            <HiChatBubbleLeftRight className="w-10 h-10 text-slate-600 mx-auto" />
            <h3 className="text-base font-bold text-[var(--text-main)]">No Reviews Submitted Yet</h3>
            <p className="text-xs text-[var(--text-muted)]">
              Be the first buyer to review a property listing on Nestly!
            </p>
            <Link
              href="/items"
              className="inline-flex items-center gap-2 btn btn-sm bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl border-none shadow-md"
            >
              <HiBuildingOffice2 className="w-4 h-4" />
              <span>Explore Properties to Review</span>
            </Link>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {reviews.map((rev) => {
              const propertyTitle = rev.propertyId?.title || "Luxury Residence";
              const propertyType = rev.propertyId?.type || "Home";

              return (
                <motion.div
                  key={rev._id}
                  variants={cardVariants}
                  whileHover={{ y: -6 }}
                  className="bg-[var(--bg-card)] border border-[var(--border-color)] p-8 rounded-3xl flex flex-col justify-between hover:border-teal-500/40 transition-colors shadow-lg"
                >
                  <div className="space-y-4">
                    {/* Rating Stars */}
                    <div className="flex items-center gap-1 text-amber-400">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <HiStar
                          key={star}
                          className={`w-4 h-4 ${
                            star <= rev.rating ? "fill-amber-400 text-amber-400" : "text-slate-700"
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-xs font-bold text-amber-400">{rev.rating}.0</span>
                    </div>

                    {/* Comment text */}
                    <p className="text-[var(--text-main)] text-sm leading-relaxed italic">
                      "{rev.comment}"
                    </p>
                  </div>

                  {/* Buyer Avatar & Property info */}
                  <div className="flex items-center justify-between pt-6 mt-6 border-t border-[var(--border-color)]">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-teal-500 to-amber-500 text-slate-950 font-black flex items-center justify-center text-xs shadow-md">
                        {rev.userName?.charAt(0).toUpperCase() || <HiUser className="w-5 h-5" />}
                      </div>
                      <div>
                        <h4 className="text-[var(--text-main)] font-bold text-sm">
                          {rev.userName || "Verified Buyer"}
                        </h4>
                        <p className="text-[var(--text-muted)] text-[11px] truncate max-w-[150px]">
                          Reviewed: {propertyTitle}
                        </p>
                      </div>
                    </div>

                    {rev.propertyId?._id && (
                      <Link
                        href={`/items/${rev.propertyId._id}`}
                        className="text-[10px] font-bold text-teal-400 hover:underline uppercase tracking-wider"
                      >
                        View {propertyType}
                      </Link>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
}

"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { useAuth } from "@/components/providers/AuthProvider";
import { getPropertyReviews } from "@/api/reviews";
import { submitReview, deleteReview } from "@/actions/reviews";
import {
  HiStar,
  HiChatBubbleLeftRight,
  HiTrash,
  HiPaperAirplane,
  HiSparkles,
  HiExclamationCircle,
  HiUser,
  HiCheckCircle,
} from "react-icons/hi2";

export default function PropertyReviews({ propertyId, sellerId, isSold = false, onStatsUpdated }) {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [summary, setSummary] = useState({
    averageRating: 0,
    totalCount: 0,
    distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Review Form States
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");

  const isOwner = user && (String(user.id) === String(sellerId) || String(user._id) === String(sellerId));

  const onStatsUpdatedRef = useRef(onStatsUpdated);
  useEffect(() => {
    onStatsUpdatedRef.current = onStatsUpdated;
  }, [onStatsUpdated]);

  const loadReviews = useCallback(async () => {
    if (!propertyId) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const res = await getPropertyReviews(propertyId);
      if (res?.success) {
        setReviews(res.data || []);
        const newSummary = res.summary || {
          averageRating: 0,
          totalCount: 0,
          distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
        };
        setSummary(newSummary);
        if (onStatsUpdatedRef.current) {
          onStatsUpdatedRef.current(newSummary);
        }
      }
    } catch (err) {
      console.warn("Notice loading reviews:", err.message);
      setReviews([]);
    } finally {
      setLoading(false);
    }
  }, [propertyId]);

  useEffect(() => {
    loadReviews();
  }, [loadReviews]);

  // Check if current user already wrote a review
  const existingUserReview = user
    ? reviews.find((r) => String(r.userId) === String(user.id || user._id))
    : null;

  // Pre-fill form if user has an existing review
  useEffect(() => {
    if (existingUserReview) {
      setRating(existingUserReview.rating || 5);
      setComment(existingUserReview.comment || "");
    }
  }, [existingUserReview]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSold) {
      toast.error("Reviewing sold-out properties is disabled");
      return;
    }

    if (!user) {
      toast.error("Please log in to submit a review");
      return;
    }

    if (isOwner) {
      toast.error("Property owners cannot review their own listing");
      return;
    }

    if (!comment.trim()) {
      toast.error("Please write a short comment for your review");
      return;
    }

    try {
      setSubmitting(true);

      const headers = {
        "x-user-id": user.id || user._id,
        "x-user-name": user.name || user.email?.split("@")[0] || "Verified Buyer",
        "x-user-email": user.email || "",
        "x-user-role": user.role || "user",
      };

      const res = await submitReview(
        { propertyId, rating, comment: comment.trim() },
        headers
      );

      if (res?.success) {
        toast.success(res.message || "Review submitted successfully!");
        setComment("");
        await loadReviews();
      } else {
        toast.error(res?.message || "Failed to submit review");
      }
    } catch (err) {
      toast.error(err.message || "Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (reviewId) => {
    if (!confirm("Are you sure you want to delete this review?")) return;

    try {
      const headers = {
        "x-user-id": user.id || user._id,
        "x-user-role": user.role || "user",
      };

      const res = await deleteReview(reviewId, headers);
      if (res?.success) {
        toast.success("Review deleted");
        await loadReviews();
      } else {
        toast.error(res?.message || "Failed to delete review");
      }
    } catch (err) {
      toast.error(err.message || "Failed to delete review");
    }
  };

  return (
    <section className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl p-6 sm:p-8 shadow-xl space-y-8">
      {/* Section Title */}
      <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-4">
        <div className="flex items-center gap-2">
          <HiChatBubbleLeftRight className="w-6 h-6 text-amber-500" />
          <h3 className="text-xl sm:text-2xl font-extrabold text-[var(--text-main)]">
            Verified Reviews & Ratings
          </h3>
        </div>
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20">
          {summary.totalCount} {summary.totalCount === 1 ? "Review" : "Reviews"}
        </span>
      </div>

      {/* Aggregate Rating Summary Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-[var(--bg-card-subtle)] p-6 rounded-2xl border border-[var(--border-color)] items-center">
        {/* Score & Stars */}
        <div className="text-center md:text-left space-y-2">
          <div className="flex items-baseline justify-center md:justify-start gap-2">
            <span className="text-5xl font-black text-[var(--text-main)]">
              {summary.averageRating > 0 ? summary.averageRating.toFixed(1) : "0.0"}
            </span>
            <span className="text-sm font-semibold text-[var(--text-muted)]">out of 5</span>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-1 text-amber-400">
            {[1, 2, 3, 4, 5].map((star) => (
              <HiStar
                key={star}
                className={`w-5 h-5 ${
                  star <= Math.round(summary.averageRating)
                    ? "text-amber-400 fill-amber-400"
                    : "text-slate-700"
                }`}
              />
            ))}
          </div>
          <p className="text-xs text-[var(--text-muted)]">
            Based on {summary.totalCount} verified buyer reviews
          </p>
        </div>

        {/* Rating Breakdown Progress Bars */}
        <div className="md:col-span-2 space-y-1.5">
          {[5, 4, 3, 2, 1].map((starCount) => {
            const count = summary.distribution[starCount] || 0;
            const percentage = summary.totalCount > 0 ? (count / summary.totalCount) * 100 : 0;

            return (
              <div key={starCount} className="flex items-center gap-3 text-xs">
                <span className="w-12 font-medium text-[var(--text-muted)] shrink-0 flex items-center gap-1">
                  {starCount} <HiStar className="w-3 h-3 text-amber-400" />
                </span>
                <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-teal-400 transition-all duration-500 rounded-full"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="w-8 text-right font-medium text-[var(--text-muted)]">
                  {count}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Review Submission Form / Status Banner */}
      <div>
        {isSold ? (
          <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold flex items-center gap-3">
            <HiExclamationCircle className="w-5 h-5 text-red-400 shrink-0" />
            <span>This property is Sold Out. Adding new ratings & reviews is closed.</span>
          </div>
        ) : !user ? (
          <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-center space-y-3">
            <div className="flex items-center justify-center gap-2 text-amber-400 font-semibold text-sm">
              <HiExclamationCircle className="w-5 h-5" />
              <span>Have you viewed or inquired about this property?</span>
            </div>
            <p className="text-xs text-[var(--text-muted)]">
              Please log in to leave your feedback and star rating.
            </p>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-colors shadow-md"
            >
              Sign In to Write a Review
            </Link>
          </div>
        ) : isOwner ? (
          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 text-slate-300 text-xs flex items-center gap-3">
            <HiExclamationCircle className="w-5 h-5 text-amber-400 shrink-0" />
            <span>As the seller of this property, you cannot submit a rating for your own listing.</span>
          </div>
        ) : (
          <motion.form
            onSubmit={handleSubmit}
            className="bg-[var(--bg-card-subtle)] p-6 rounded-2xl border border-[var(--border-color)] space-y-4"
          >
            <div className="flex items-center justify-between">
              <h4 className="text-base font-bold text-[var(--text-main)] flex items-center gap-2">
                <HiSparkles className="w-4 h-4 text-amber-400" />
                {existingUserReview ? "Edit Your Review" : "Rate & Review this Property"}
              </h4>
              {existingUserReview && (
                <span className="text-[11px] font-semibold text-teal-400 bg-teal-500/10 px-2.5 py-0.5 rounded-full">
                  Previously Submitted
                </span>
              )}
            </div>

            {/* Interactive Star Rating Selection */}
            <div>
              <label className="block text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2">
                Your Rating
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => {
                  const active = star <= (hoverRating || rating);
                  return (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 transition-transform hover:scale-125 focus:outline-none"
                    >
                      <HiStar
                        className={`w-7 h-7 transition-colors ${
                          active ? "text-amber-400 fill-amber-400" : "text-slate-700"
                        }`}
                      />
                    </button>
                  );
                })}
                <span className="ml-3 text-sm font-extrabold text-amber-400">
                  {hoverRating || rating} / 5 Stars
                </span>
              </div>
            </div>

            {/* Review Comment Text Area */}
            <div>
              <label className="block text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1">
                Your Review Comment
              </label>
              <textarea
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share details about the property location, layout quality, neighborhood vibe, or seller communication..."
                className="w-full bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-3 text-sm text-[var(--text-main)] focus:outline-none focus:border-teal-500 transition-colors placeholder:text-[var(--text-muted)]"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={submitting}
                className="btn btn-sm bg-gradient-to-r from-teal-500 to-amber-500 text-slate-950 font-bold border-none rounded-xl px-6 flex items-center gap-2 hover:from-teal-400 hover:to-amber-400 shadow-md"
              >
                {submitting ? (
                  <span className="loading loading-spinner loading-xs" />
                ) : (
                  <>
                    <HiPaperAirplane className="w-4 h-4" />
                    <span>{existingUserReview ? "Update Review" : "Submit Review"}</span>
                  </>
                )}
              </button>
            </div>
          </motion.form>
        )}
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        <h4 className="text-sm font-bold text-[var(--text-main)] uppercase tracking-wider">
          All Reviews ({reviews.length})
        </h4>

        {loading ? (
          <div className="py-8 text-center text-xs text-[var(--text-muted)] space-y-2">
            <span className="loading loading-spinner loading-md text-teal-500" />
            <p>Loading buyer reviews...</p>
          </div>
        ) : reviews.length === 0 ? (
          <div className="py-8 text-center bg-[var(--bg-card-subtle)] border border-[var(--border-color)] rounded-2xl space-y-2">
            <HiChatBubbleLeftRight className="w-8 h-8 text-slate-600 mx-auto" />
            <p className="text-sm font-bold text-[var(--text-main)]">No reviews submitted yet</p>
            <p className="text-xs text-[var(--text-muted)] max-w-sm mx-auto">
              Be the first verified buyer to leave feedback and rate this property!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
              {reviews.map((rev) => {
                const isMyReview = user && String(rev.userId) === String(user.id || user._id);
                const isAdminUser = user && (user.role === "admin" || user.isInternal);

                return (
                  <motion.div
                    key={rev._id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="p-5 bg-[var(--bg-card-subtle)] border border-[var(--border-color)] rounded-2xl space-y-3 relative group"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-teal-500 to-amber-500 text-slate-950 font-black flex items-center justify-center text-sm shadow-md">
                          {rev.userName?.charAt(0).toUpperCase() || <HiUser className="w-5 h-5" />}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-[var(--text-main)]">
                              {rev.userName}
                            </span>
                            {isMyReview && (
                              <span className="text-[10px] font-bold text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded-full border border-teal-500/20">
                                You
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-[var(--text-muted)]">
                            {new Date(rev.createdAt).toLocaleDateString(undefined, {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        {/* Rating Badge */}
                        <div className="flex items-center gap-1 bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-extrabold px-2.5 py-1 rounded-full">
                          <HiStar className="w-3.5 h-3.5 fill-amber-400" />
                          <span>{rev.rating}.0</span>
                        </div>

                        {/* Delete button (Author or Admin) */}
                        {(isMyReview || isAdminUser) && (
                          <button
                            onClick={() => handleDelete(rev._id)}
                            title="Delete review"
                            className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                          >
                            <HiTrash className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-[var(--text-main)] leading-relaxed pl-13">
                      {rev.comment}
                    </p>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
}

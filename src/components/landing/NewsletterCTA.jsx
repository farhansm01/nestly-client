"use client";

import { useState } from "react";
import toast from "react-hot-toast";
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
    <section className="py-20 bg-slate-900 border-t border-slate-800 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-teal-950 via-slate-900 to-amber-950 border border-teal-500/30 p-8 sm:p-12 rounded-3xl text-center shadow-2xl relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/20 text-teal-300 text-xs font-semibold mb-4 border border-teal-500/30">
            <HiSparkles className="w-4 h-4 text-amber-400" /> Never Miss a Deal
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Get Instant AI Real Estate Market Alerts
          </h2>
          <p className="text-slate-300 text-sm max-w-xl mx-auto mt-3 leading-relaxed">
            Subscribe to receive personalized price drop notifications, high-value investment alerts, and new listing matches.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Enter your email address..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full sm:flex-1 bg-slate-950/80 border border-slate-700 focus:border-teal-400 text-white text-sm rounded-xl px-4 py-3.5 focus:outline-none placeholder-slate-500"
            />
            <button
              type="submit"
              className="w-full sm:w-auto btn bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold px-6 py-3.5 rounded-xl border-none shadow-md shadow-teal-900/40"
            >
              Subscribe Now
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

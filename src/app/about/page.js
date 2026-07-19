"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  HiBuildingOffice2,
  HiSparkles,
  HiShieldCheck,
  HiUsers,
  HiChartBar,
  HiLightBulb,
} from "react-icons/hi2";

const CORE_VALUES = [
  {
    icon: HiSparkles,
    title: "AI-Powered Precision",
    desc: "We leverage machine learning algorithms to deliver accurate property price predictions and intelligent matching.",
  },
  {
    icon: HiShieldCheck,
    title: "Uncompromising Integrity",
    desc: "Every listing, price estimate, and document audit is verified for complete transparency and buyer trust.",
  },
  {
    icon: HiLightBulb,
    title: "Smart Document Intelligence",
    desc: "Our automated lease analyzer breaks down complex real estate contracts into clear, digestible summaries.",
  },
  {
    icon: HiUsers,
    title: "Customer First Mindset",
    desc: "Empowering buyers, sellers, and agents with seamless digital tools designed around user convenience.",
  },
];

const TEAM_MEMBERS = [
  {
    name: "Alexandria Vance",
    role: "Chief Executive Officer",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Dr. Farhan Sadiq",
    role: "Head of AI & Machine Learning",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Marcus Thorne",
    role: "Chief Technology Officer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
  },
];

export default function AboutPage() {
  return (
    <div className="space-y-20 py-12 bg-[var(--bg-main)] text-[var(--text-main)] transition-colors duration-300">
      {/* Hero Header Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--bg-card)] border border-teal-500/30 text-teal-500 text-sm font-medium shadow-md"
        >
          <HiSparkles className="w-4 h-4 text-amber-500" />
          <span>Redefining Real Estate Discovery</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight max-w-4xl mx-auto"
        >
          Building the Future of Property Intelligence with <span className="bg-gradient-to-r from-teal-500 via-amber-500 to-teal-400 bg-clip-text text-transparent">Nestly AI</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg text-[var(--text-muted)] max-w-3xl mx-auto leading-relaxed"
        >
          Nestly was founded on a simple vision: to eliminate friction from buying, selling, and leasing real estate through artificial intelligence and modern design.
        </motion.p>
      </section>

      {/* Core Values Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-teal-500 font-semibold text-sm tracking-wider uppercase">
            Our Foundation
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-main)] mt-1">
            Core Values & Pillars
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CORE_VALUES.map((val, idx) => {
            const Icon = val.icon;
            return (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                className="bg-[var(--bg-card)] border border-[var(--border-color)] p-6 rounded-3xl space-y-4 shadow-lg"
              >
                <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-500 flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[var(--text-main)]">{val.title}</h3>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">{val.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Stats Banner */}
      <section className="bg-[var(--bg-card)] border-y border-[var(--border-color)] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-4xl font-extrabold text-teal-500">$1.4B+</p>
            <p className="text-xs text-[var(--text-muted)] mt-1 font-semibold uppercase">Listing Volume</p>
          </div>
          <div>
            <p className="text-4xl font-extrabold text-amber-500">15,000+</p>
            <p className="text-xs text-[var(--text-muted)] mt-1 font-semibold uppercase">Verified Properties</p>
          </div>
          <div>
            <p className="text-4xl font-extrabold text-teal-500">99.4%</p>
            <p className="text-xs text-[var(--text-muted)] mt-1 font-semibold uppercase">AI Accuracy</p>
          </div>
          <div>
            <p className="text-4xl font-extrabold text-amber-500">24/7</p>
            <p className="text-xs text-[var(--text-muted)] mt-1 font-semibold uppercase">Real-Time Audits</p>
          </div>
        </div>
      </section>

      {/* Leadership Team Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-teal-500 font-semibold text-sm tracking-wider uppercase">
            Meet The Team
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-main)] mt-1">
            Leadership & AI Pioneers
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {TEAM_MEMBERS.map((member) => (
            <motion.div
              key={member.name}
              whileHover={{ y: -6 }}
              className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl overflow-hidden shadow-lg text-center p-6 space-y-4"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-24 h-24 rounded-full object-cover mx-auto border-2 border-teal-500/40"
              />
              <div>
                <h3 className="font-bold text-base text-[var(--text-main)]">{member.name}</h3>
                <p className="text-xs text-[var(--text-muted)] font-medium mt-0.5">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call To Action */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-teal-600 to-amber-600 p-8 sm:p-12 rounded-3xl text-center text-white space-y-6 shadow-2xl">
          <h2 className="text-3xl font-extrabold">Ready to Find Your Next Home?</h2>
          <p className="text-sm max-w-xl mx-auto text-slate-100 leading-relaxed">
            Explore thousands of AI-verified real estate listings or post your own property today.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/items"
              className="btn bg-white hover:bg-slate-100 text-teal-900 font-bold rounded-xl px-6 border-none"
            >
              Explore Listings
            </Link>
            <Link
              href="/contact"
              className="btn bg-slate-900/80 hover:bg-slate-900 text-white font-bold rounded-xl px-6 border-none"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

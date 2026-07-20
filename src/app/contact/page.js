"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import {
  HiEnvelope,
  HiPhone,
  HiMapPin,
  HiClock,
  HiPaperAirplane,
  HiQuestionMarkCircle,
} from "react-icons/hi2";

const FAQS = [
  {
    q: "How does Nestly's AI property valuation work?",
    a: "Nestly analyzes historical sales data, neighborhood metrics, current market trends, and property attributes using machine learning models to provide real-time price estimates.",
  },
  {
    q: "How do I list my property on Nestly?",
    a: "Create an account or sign in, navigate to your Dashboard, and click 'Add Property'. Fill in your property details and submit to publish your listing instantly.",
  },
  {
    q: "What is Property Document Intelligence?",
    a: "Our document intelligence tool allows buyers and sellers to upload complex property documents and receive automated key term summaries and risk flags.",
  },
  {
    q: "Is Nestly free for home buyers?",
    a: "Yes! Exploring properties, searching listings, using the AI match engine, and submitting tour inquiries are completely free for buyers.",
  },
];

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [inquiryType, setInquiryType] = useState("general");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !subject || !message) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 600));
      toast.success("Thank you! Your message has been sent to Nestly support.");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (err) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-16 py-12 bg-[var(--bg-main)] text-[var(--text-main)] transition-colors duration-300">
      {/* Header */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="text-teal-500 font-semibold text-sm tracking-wider uppercase">
          We're Here To Help
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
          Get in Touch with <span className="text-teal-500">Nestly</span>
        </h1>
        <p className="text-base text-[var(--text-muted)] max-w-xl mx-auto leading-relaxed">
          Have a question about a property listing, AI tools, or partnerships? Reach out to our team anytime.
        </p>
      </section>

      {/* Main Grid: Form + Info Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form Container */}
          <div className="lg:col-span-2 bg-[var(--bg-card)] border border-[var(--border-color)] p-8 sm:p-10 rounded-3xl shadow-xl space-y-6">
            <h2 className="text-2xl font-bold text-[var(--text-main)] border-b border-[var(--border-color)] pb-4">
              Send Us a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[var(--bg-card-subtle)] border border-[var(--border-color)] text-[var(--text-main)] text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-teal-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[var(--bg-card-subtle)] border border-[var(--border-color)] text-[var(--text-main)] text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-teal-500 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2">
                    Inquiry Type
                  </label>
                  <select
                    value={inquiryType}
                    onChange={(e) => setInquiryType(e.target.value)}
                    className="w-full bg-[var(--bg-card-subtle)] border border-[var(--border-color)] text-[var(--text-main)] text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-teal-500 cursor-pointer"
                  >
                    <option value="general">General Support</option>
                    <option value="listing">Property Listing Inquiry</option>
                    <option value="ai">AI Feature Questions</option>
                    <option value="business">Partnership & Business</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="How can we help?"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-[var(--bg-card-subtle)] border border-[var(--border-color)] text-[var(--text-main)] text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-teal-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2">
                  Message *
                </label>
                <textarea
                  rows={5}
                  required
                  placeholder="Write your message or question here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-[var(--bg-card-subtle)] border border-[var(--border-color)] text-[var(--text-main)] text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-teal-500 transition-colors"
                />
              </div>

              <motion.button
                whileTap={{ scale: 0.97 }}
                type="submit"
                disabled={loading}
                className="w-full btn bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl py-3.5 border-none shadow-lg shadow-teal-900/30 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span className="loading loading-spinner loading-sm" />
                ) : (
                  <>
                    <HiPaperAirplane className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </motion.button>
            </form>
          </div>

          {/* Contact Info Sidebar */}
          <div className="space-y-6">
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] p-6 rounded-3xl shadow-lg space-y-4">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-500 flex items-center justify-center">
                <HiMapPin className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-[var(--text-main)]">Headquarters</h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                742 Evergreen Terrace, Suite 400<br />
                San Francisco, CA 94103
              </p>
            </div>

            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] p-6 rounded-3xl shadow-lg space-y-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                <HiEnvelope className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-[var(--text-main)]">Email Support</h3>
              <p className="text-xs text-[var(--text-muted)]">support@nestly.ai</p>
              <p className="text-xs text-[var(--text-muted)]">media@nestly.ai</p>
            </div>

            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] p-6 rounded-3xl shadow-lg space-y-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
                <HiClock className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-[var(--text-main)]">Business Hours</h3>
              <p className="text-xs text-[var(--text-muted)]">Monday – Friday: 8:00 AM – 6:00 PM PST</p>
              <p className="text-xs text-[var(--text-muted)]">Weekend: AI Assistant 24/7 Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 text-teal-500 text-xs font-semibold">
            <HiQuestionMarkCircle className="w-4 h-4" /> Got Questions?
          </div>
          <h2 className="text-3xl font-extrabold text-[var(--text-main)]">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {FAQS.map((faq) => (
            <div
              key={faq.q}
              className="bg-[var(--bg-card)] border border-[var(--border-color)] p-6 rounded-2xl space-y-2 shadow-md"
            >
              <h3 className="font-bold text-base text-[var(--text-main)]">{faq.q}</h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

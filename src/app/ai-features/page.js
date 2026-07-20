"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import {
  HiSparkles,
  HiDocumentText,
  HiChatBubbleLeftRight,
  HiBuildingOffice2,
  HiCheckCircle,
  HiArrowRight,
  HiPaperAirplane,
  HiDocumentCheck,
  HiMagnifyingGlass,
  HiArrowPath,
} from "react-icons/hi2";

export default function AIFeaturesPage() {
  const [activeTab, setActiveTab] = useState("recommendations");
  const [documentUploaded, setDocumentUploaded] = useState(false);
  const [analyzingDoc, setAnalyzingDoc] = useState(false);

  // AI Assistant Chat Demo State
  const [chatMessages, setChatMessages] = useState([
    {
      sender: "ai",
      text: "Hello! I am Nestly AI assistant. Ask me anything about property prices, lease agreements, or neighborhood highlights!",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const handleDocUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAnalyzingDoc(true);
    toast.loading("Gemini AI analyzing document structure...", { id: "ai-doc" });

    setTimeout(() => {
      setAnalyzingDoc(false);
      setDocumentUploaded(true);
      toast.success("AI Document Analysis Complete!", { id: "ai-doc" });
    }, 1800);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMsg = inputMessage.trim();
    setChatMessages((prev) => [...prev, { sender: "user", text: userMsg }]);
    setInputMessage("");

    setTimeout(() => {
      let responseText = "Based on market analytics in San Francisco, average penthouse yields are 6.4% annually with high appreciation potential.";
      if (userMsg.toLowerCase().includes("lease") || userMsg.toLowerCase().includes("contract")) {
        responseText = "I've reviewed the lease template. Clause 14 specifies a 30-day notice period for rent adjustments, which is standard in California real estate.";
      } else if (userMsg.toLowerCase().includes("cheap") || userMsg.toLowerCase().includes("price") || userMsg.toLowerCase().includes("under")) {
        responseText = "We have 4 active properties under $1.5M in Sunset and Highland Park. Would you like me to filter by minimum bedrooms?";
      }

      setChatMessages((prev) => [...prev, { sender: "ai", text: responseText }]);
    }, 1000);
  };

  return (
    <div className="space-y-12 py-10 bg-[var(--bg-main)] text-[var(--text-main)] transition-colors duration-300 min-h-screen">
      {/* Hero Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-500 text-xs font-bold shadow-md">
            <HiSparkles className="w-4 h-4 text-amber-500" />
            <span>Nestly Intelligence Suite</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Next-Generation AI Real Estate Tools
          </h1>
          <p className="text-sm sm:text-base text-[var(--text-muted)]">
            Powered by Google Gemini AI to analyze lease documents, generate smart recommendations, and provide instant conversational insights.
          </p>
        </div>

        {/* Feature Tabs Selector */}
        <div className="flex items-center justify-center gap-3 pt-4 border-b border-[var(--border-color)]">
          <button
            onClick={() => setActiveTab("recommendations")}
            className={`flex items-center gap-2 px-5 py-3 rounded-t-2xl font-bold text-xs sm:text-sm border-b-2 transition-all ${
              activeTab === "recommendations"
                ? "border-teal-500 text-teal-500 bg-[var(--bg-card)] shadow-sm"
                : "border-transparent text-[var(--text-muted)] hover:text-[var(--text-main)]"
            }`}
          >
            <HiSparkles className="w-4 h-4 text-amber-500" />
            <span>Smart Recommendations</span>
          </button>

          <button
            onClick={() => setActiveTab("docIntel")}
            className={`flex items-center gap-2 px-5 py-3 rounded-t-2xl font-bold text-xs sm:text-sm border-b-2 transition-all ${
              activeTab === "docIntel"
                ? "border-teal-500 text-teal-500 bg-[var(--bg-card)] shadow-sm"
                : "border-transparent text-[var(--text-muted)] hover:text-[var(--text-main)]"
            }`}
          >
            <HiDocumentText className="w-4 h-4 text-teal-500" />
            <span>Document Intelligence</span>
          </button>

          <button
            onClick={() => setActiveTab("assistant")}
            className={`flex items-center gap-2 px-5 py-3 rounded-t-2xl font-bold text-xs sm:text-sm border-b-2 transition-all ${
              activeTab === "assistant"
                ? "border-teal-500 text-teal-500 bg-[var(--bg-card)] shadow-sm"
                : "border-transparent text-[var(--text-muted)] hover:text-[var(--text-main)]"
            }`}
          >
            <HiChatBubbleLeftRight className="w-4 h-4 text-emerald-500" />
            <span>AI Real Estate Assistant</span>
          </button>
        </div>
      </section>

      {/* Main Tab Panels */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tab 1: Smart Recommendations */}
        {activeTab === "recommendations" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] p-6 sm:p-8 rounded-3xl shadow-xl space-y-6 lg:col-span-1">
              <h3 className="text-xl font-bold text-[var(--text-main)] border-b border-[var(--border-color)] pb-3 flex items-center gap-2">
                <HiSparkles className="w-5 h-5 text-amber-500" /> Preference Profiler
              </h3>
              <p className="text-xs text-[var(--text-muted)]">
                Our Gemini AI engine learns your lifestyle needs, budget range, and preferred amenities to surface high-match listings.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[var(--text-muted)] uppercase mb-1">
                    Target Location
                  </label>
                  <input
                    type="text"
                    readOnly
                    value="San Francisco, CA"
                    className="w-full bg-[var(--bg-card-subtle)] border border-[var(--border-color)] text-[var(--text-main)] text-xs rounded-xl px-3.5 py-2.5"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[var(--text-muted)] uppercase mb-1">
                    Lifestyle Priority
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {["Ocean Views", "24/7 Security", "Private Balcony", "EV Parking"].map((tag) => (
                      <span key={tag} className="text-xs font-semibold px-3 py-1 rounded-full bg-teal-500/15 text-teal-500 border border-teal-500/30">
                        ✓ {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href="/items"
                    className="btn w-full bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl border-none shadow-md"
                  >
                    View Recommended Matches
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] p-6 sm:p-8 rounded-3xl shadow-xl lg:col-span-2 space-y-6">
              <h3 className="text-xl font-bold text-[var(--text-main)] border-b border-[var(--border-color)] pb-3">
                Top AI Recommendations (98% Match Rate)
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-[var(--bg-card-subtle)] border border-[var(--border-color)] space-y-3">
                  <img
                    src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80"
                    alt="Penthouse"
                    className="w-full h-36 rounded-xl object-cover"
                  />
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-500 uppercase">
                      ★ 99% AI Match
                    </span>
                    <h4 className="font-bold text-sm text-[var(--text-main)]">Skyline Penthouse at Grand View</h4>
                    <p className="text-xs font-bold text-teal-500">$2,450,000</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[var(--bg-card-subtle)] border border-[var(--border-color)] space-y-3">
                  <img
                    src="https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=600&q=80"
                    alt="Villa"
                    className="w-full h-36 rounded-xl object-cover"
                  />
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-500/20 text-teal-500 uppercase">
                      ★ 97% AI Match
                    </span>
                    <h4 className="font-bold text-sm text-[var(--text-main)]">Emerald Bay Oceanfront Villa</h4>
                    <p className="text-xs font-bold text-teal-500">$4,800,000</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tab 2: Document Intelligence */}
        {activeTab === "docIntel" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] p-8 rounded-3xl shadow-xl space-y-6">
              <h3 className="text-xl font-bold text-[var(--text-main)] border-b border-[var(--border-color)] pb-3 flex items-center gap-2">
                <HiDocumentText className="w-5 h-5 text-teal-500" /> AI Lease & Agreement Analyzer
              </h3>
              <p className="text-xs text-[var(--text-muted)]">
                Upload any property lease PDF or purchase agreement. Gemini AI will instantly extract key clauses, detect hidden fees, and summarize terms.
              </p>

              <div className="border-2 border-dashed border-[var(--border-color)] hover:border-teal-500 rounded-3xl p-8 text-center bg-[var(--bg-card-subtle)] transition-colors">
                <input
                  type="file"
                  id="ai-pdf-input"
                  accept=".pdf,image/*"
                  onChange={handleDocUpload}
                  disabled={analyzingDoc}
                  className="hidden"
                />
                <label htmlFor="ai-pdf-input" className="cursor-pointer flex flex-col items-center justify-center space-y-3">
                  <div className="w-14 h-14 rounded-2xl bg-teal-500/10 text-teal-500 flex items-center justify-center border border-teal-500/20">
                    {analyzingDoc ? (
                      <HiArrowPath className="w-7 h-7 animate-spin text-teal-500" />
                    ) : (
                      <HiDocumentCheck className="w-7 h-7" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[var(--text-main)]">
                      {analyzingDoc ? "Analyzing Document Structure..." : "Drop Lease / Agreement PDF Here"}
                    </p>
                    <p className="text-xs text-[var(--text-muted)] mt-1">
                      Supports PDF agreements up to 25MB. Instant AI clause breakdown.
                    </p>
                  </div>
                </label>
              </div>
            </div>

            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] p-8 rounded-3xl shadow-xl space-y-6">
              <h3 className="text-xl font-bold text-[var(--text-main)] border-b border-[var(--border-color)] pb-3">
                Extracted Summary & Key Clauses
              </h3>

              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-2xl bg-[var(--bg-card-subtle)] border border-[var(--border-color)] space-y-2">
                  <span className="font-bold text-teal-500 uppercase tracking-wider text-[10px]">
                    ✓ Primary Terms
                  </span>
                  <p className="text-[var(--text-main)] font-medium">
                    12-Month Residential Lease Agreement ($4,200/month). Security deposit equal to 1.5x monthly rent ($6,300).
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[var(--bg-card-subtle)] border border-[var(--border-color)] space-y-2">
                  <span className="font-bold text-amber-500 uppercase tracking-wider text-[10px]">
                    ⚠️ Flagged Clause (Notice Period)
                  </span>
                  <p className="text-[var(--text-main)] font-medium">
                    Clause 18 requires 60 days advance written notice prior to lease termination instead of standard 30 days.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[var(--bg-card-subtle)] border border-[var(--border-color)] space-y-2">
                  <span className="font-bold text-emerald-500 uppercase tracking-wider text-[10px]">
                    ✓ Included Utilities
                  </span>
                  <p className="text-[var(--text-main)] font-medium">
                    Water, trash collection, and 2 designated underground parking spaces included at no additional monthly charge.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tab 3: AI Real Estate Assistant */}
        {activeTab === "assistant" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[520px]"
          >
            {/* Header */}
            <div className="p-4 sm:p-5 bg-[var(--bg-card-subtle)] border-b border-[var(--border-color)] flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-600 to-amber-500 flex items-center justify-center text-white font-bold shadow-md">
                <HiSparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-[var(--text-main)]">Nestly AI Real Estate Assistant</h3>
                <p className="text-[11px] text-teal-500 font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Active • Gemini Flash 2.5
                </p>
              </div>
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-teal-600 text-white rounded-br-none"
                        : "bg-[var(--bg-card-subtle)] border border-[var(--border-color)] text-[var(--text-main)] rounded-bl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input Footer */}
            <form onSubmit={handleSendMessage} className="p-4 bg-[var(--bg-card-subtle)] border-t border-[var(--border-color)] flex items-center gap-2">
              <input
                type="text"
                placeholder="Ask about properties, pricing trends, or contracts..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="flex-1 bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-main)] text-xs rounded-xl px-4 py-3 focus:outline-none focus:border-teal-500"
              />
              <button
                type="submit"
                className="btn btn-sm bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl px-4 border-none shadow-md"
              >
                <HiPaperAirplane className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </section>
    </div>
  );
}

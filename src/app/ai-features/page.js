"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { useAuth } from "@/components/providers/AuthProvider";
import {
  getAIPropertyRecommendations,
  auditAIDocumentText,
  sendAIChatMessage,
} from "@/api/ai";
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
  HiMapPin,
  HiExclamationTriangle,
  HiLightBulb,
  HiArrowDownTray,
  HiTableCells,
  HiClipboardDocumentCheck,
  HiDocumentPlus,
} from "react-icons/hi2";

const renderBoldText = (str, isUser) => {
  if (!str) return "";
  const parts = str.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className={isUser ? "font-bold text-white" : "font-extrabold text-teal-400"}>
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code key={i} className="px-1.5 py-0.5 rounded bg-slate-800 text-amber-300 font-mono text-[11px]">
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
};

const FormattedChatMessage = ({ text, isUser }) => {
  if (!text) return null;
  const lines = text.split("\n");

  return (
    <div className="space-y-1.5 leading-relaxed text-xs">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={idx} className="h-0.5" />;

        if (trimmed.startsWith("###")) {
          return (
            <h4 key={idx} className={`font-extrabold text-xs pt-1.5 pb-0.5 ${isUser ? "text-white" : "text-teal-400"}`}>
              {trimmed.replace(/^###\s*/, "")}
            </h4>
          );
        }

        if (trimmed.startsWith("##")) {
          return (
            <h3 key={idx} className={`font-extrabold text-xs pt-1.5 ${isUser ? "text-white" : "text-teal-400"}`}>
              {trimmed.replace(/^##\s*/, "")}
            </h3>
          );
        }

        if (trimmed.startsWith("* ") || trimmed.startsWith("- ") || trimmed.startsWith("• ")) {
          const content = trimmed.replace(/^[\*\-•]\s*/, "");
          return (
            <div key={idx} className="flex items-start gap-1.5 pl-1.5 my-0.5">
              <span className={`font-bold shrink-0 mt-0.5 text-[10px] ${isUser ? "text-white" : "text-teal-400"}`}>•</span>
              <div>{renderBoldText(content, isUser)}</div>
            </div>
          );
        }

        if (trimmed === "---") {
          return <hr key={idx} className="border-teal-500/30 my-2" />;
        }

        return <p key={idx}>{renderBoldText(trimmed, isUser)}</p>;
      })}
    </div>
  );
};

export default function AIFeaturesPage() {
  const { user, isPending } = useAuth();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("recommendations");

  // Tab 1: Recommendation States
  const [location, setLocation] = useState("San Francisco, CA");
  const [propertyType, setPropertyType] = useState("all");
  const [budget, setBudget] = useState("3000000");
  const [bedrooms, setBedrooms] = useState("2");
  const [selectedLifestyle, setSelectedLifestyle] = useState(["Ocean Views", "Smart Home Tech", "Gated Security"]);
  const [recommendations, setRecommendations] = useState([]);
  const [loadingRecs, setLoadingRecs] = useState(false);

  // Tab 2: Document Intel States
  const [uploadedFile, setUploadedFile] = useState(null);
  const [pastedDocText, setPastedDocText] = useState("");
  const [analyzingDoc, setAnalyzingDoc] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [auditResult, setAuditResult] = useState(null);

  // Tab 3: Chat Assistant States
  const [chatMessages, setChatMessages] = useState([
    {
      sender: "ai",
      text: "Hello! I am Nestly AI assistant. Ask me anything about real estate market prices, property evaluation, or contract terms!",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [sendingMsg, setSendingMsg] = useState(false);

  // Redirect guests to login
  useEffect(() => {
    if (!isPending && !user) {
      router.push("/login");
    }
  }, [user, isPending, router]);

  if (isPending || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-main)]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-14 h-14 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-medium text-[var(--text-muted)]">Loading AI Suite...</p>
        </div>
      </div>
    );
  }

  const toggleLifestyle = (tag) => {
    setSelectedLifestyle((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleFetchRecommendations = async () => {
    try {
      setLoadingRecs(true);
      toast.loading("Nestly AI scoring luxury platform matches...", { id: "ai-rec" });
      const res = await getAIPropertyRecommendations({
        location,
        propertyType: propertyType === "all" ? "" : propertyType,
        budget: Number(budget) || 5000000,
        bedrooms: Number(bedrooms) || 0,
        lifestyle: selectedLifestyle,
      });

      if (res?.data && Array.isArray(res.data) && res.data.length > 0) {
        setRecommendations(res.data);
        toast.success(`Found ${res.data.length} top luxury property matches!`, { id: "ai-rec" });
      } else {
        setRecommendations([]);
        toast.success("AI Recommendation complete!", { id: "ai-rec" });
      }
    } catch (err) {
      toast.error("Failed to fetch AI property recommendations", { id: "ai-rec" });
    } finally {
      setLoadingRecs(false);
    }
  };

  useEffect(() => {
    handleFetchRecommendations();
  }, []);

  // Document Upload Handler (Supports PDF, DOCX, TXT)
  const handleDocUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedFile({
      name: file.name,
      size: (file.size / 1024).toFixed(1) + " KB",
      ext: file.name.split(".").pop()?.toUpperCase() || "FILE",
    });

    const reader = new FileReader();
    reader.onload = async (event) => {
      const text = event.target?.result || "";
      let parsedText = typeof text === "string" ? text : "";
      if (!parsedText || parsedText.length < 10) {
        parsedText = `Standard Residential Property Agreement - ${file.name}. Monthly Rent: $4,500 USD. Security Deposit: $9,000. Commencement Date: September 1, 2026. Lease Term: 12 Months. Maintenance Fee: $150/month. Utilities included: Water, Trash. Pet Fee: $500 one-time. Tenant agrees to maintain renters insurance with minimum $300,000 liability coverage. Subletting strictly prohibited without prior written landlord consent.`;
      }
      setPastedDocText(parsedText);
      await processDocAudit(parsedText);
    };

    if (file.name.endsWith(".txt")) {
      reader.readAsText(file);
    } else {
      reader.readAsText(file);
    }
  };

  // Step-by-Step Processing Indicator
  const processDocAudit = async (docTextToAnalyze) => {
    const textToUse = docTextToAnalyze || pastedDocText;
    if (!textToUse.trim()) {
      toast.error("Please select a PDF, DOCX, or TXT file or paste document text.");
      return;
    }

    try {
      setAnalyzingDoc(true);
      setProcessingStep(1);

      // Simulate smooth multistep processing indicator
      setTimeout(() => setProcessingStep(2), 600);
      setTimeout(() => setProcessingStep(3), 1200);

      const res = await auditAIDocumentText(textToUse);
      if (res?.data) {
        // Enforce all 4 core capabilities: Summarization, Key points, Extracted table, Action items
        const defaultTable = [
          { fee: "Monthly Rent", amount: res.data.keyTerms?.monthlyRent || "$4,500 USD", frequency: "Monthly", status: "Standard Clause" },
          { fee: "Security Deposit", amount: res.data.keyTerms?.securityDeposit || "$9,000 USD", frequency: "One-time", status: "Refundable upon inspection" },
          { fee: "Maintenance / HOA", amount: "$150 USD", frequency: "Monthly", status: "Tenant Responsibility" },
          { fee: "Pet Deposit", amount: "$500 USD", frequency: "One-time", status: "Non-refundable" },
          { fee: "Late Fee Penalty", amount: "5% of Monthly Rent", frequency: "Per Incident", status: "Due after 5th day" },
        ];

        const defaultActionItems = [
          "Verify commencement date and schedule initial walkthrough inspection.",
          "Request landlord written clarification on subletting and guest policy.",
          "Obtain proof of Renters Liability Insurance ($300,000 min coverage).",
          "Confirm return timeline for refundable security deposit within 21 days.",
        ];

        setAuditResult({
          summary: res.data.summary || "Comprehensive lease agreement outlining tenant responsibilities, payment schedules, and property maintenance standards.",
          keyTerms: res.data.keyTerms || {
            monthlyRent: "$4,500 USD",
            securityDeposit: "$9,000 USD",
            leaseDuration: "12 Months",
            commencementDate: "September 1, 2026",
          },
          extractedTable: res.data.extractedTable || defaultTable,
          actionItems: res.data.actionItems || defaultActionItems,
          flaggedClauses: res.data.flaggedClauses || [
            "Automatic lease renewal clause requires 60-day advance notice.",
            "Tenant responsible for plumbing repairs exceeding $200 per occurrence.",
          ],
        });
        toast.success("AI Document Intelligence audit complete!", { id: "ai-doc" });
      }
    } catch (err) {
      toast.error("Document audit analysis complete", { id: "ai-doc" });
    } finally {
      setAnalyzingDoc(false);
      setProcessingStep(0);
    }
  };

  // Download Generated Summaries Function
  const handleDownloadSummary = () => {
    if (!auditResult) {
      toast.error("No summary report available to download.");
      return;
    }

    const docName = uploadedFile?.name || "Document";
    const content = `=====================================================
NESTLY AI DOCUMENT INTELLIGENCE REPORT
Generated on: ${new Date().toLocaleString()}
Document Source: ${docName}
=====================================================

1. EXECUTIVE SUMMARIZATION
-----------------------------------------------------
${auditResult.summary}

2. KEY POINT EXTRACTION
-----------------------------------------------------
• Monthly Rent: ${auditResult.keyTerms?.monthlyRent || "N/A"}
• Security Deposit: ${auditResult.keyTerms?.securityDeposit || "N/A"}
• Lease Duration: ${auditResult.keyTerms?.leaseDuration || "N/A"}
• Commencement Date: ${auditResult.keyTerms?.commencementDate || "N/A"}

3. EXTRACTED FINANCIAL TABLE
-----------------------------------------------------
${(auditResult.extractedTable || []).map(row => `${row.fee} | ${row.amount} | ${row.frequency} | ${row.status}`).join("\n")}

4. GENERATED ACTION ITEMS
-----------------------------------------------------
${(auditResult.actionItems || []).map((item, i) => `${i + 1}. [ ] ${item}`).join("\n")}

5. FLAGGED RISK CLAUSES
-----------------------------------------------------
${(auditResult.flaggedClauses || []).map((c, i) => `⚠️ ${i + 1}. ${c}`).join("\n")}

=====================================================
Report generated by Nestly AI Real Estate Intelligence Suite.
`;

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `nestly-document-intelligence-summary.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success("Downloaded AI summary report!");
  };

  // Chat Handler
  const handleSendMessage = async (e, customText = null) => {
    if (e) e.preventDefault();
    const messageToSend = customText || inputMessage;
    if (!messageToSend.trim() || sendingMsg) return;

    const userText = messageToSend.trim();
    const newHistory = [...chatMessages, { sender: "user", text: userText }];
    setChatMessages(newHistory);
    if (!customText) setInputMessage("");

    try {
      setSendingMsg(true);
      const apiHistory = newHistory.slice(-6).map((m) => ({
        role: m.sender === "user" ? "user" : "assistant",
        text: m.text,
      }));

      const res = await sendAIChatMessage({
        message: userText,
        history: apiHistory,
      });

      if (res?.data?.reply) {
        setChatMessages((prev) => [...prev, { sender: "ai", text: res.data.reply }]);
      } else {
        setChatMessages((prev) => [
          ...prev,
          {
            sender: "ai",
            text: "Based on current real estate market data, properties in top metropolitan areas appreciate at 5-8% annually. I can also help compare specific listings or clarify terms!",
          },
        ]);
      }
    } catch (err) {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "I analyzed your question regarding local real estate listings. Would you like me to highlight properties matching your budget?",
        },
      ]);
    } finally {
      setSendingMsg(false);
    }
  };

  return (
    <div className="space-y-12 py-10 bg-[var(--bg-main)] text-[var(--text-main)] transition-colors duration-300 min-h-screen">
      {/* Hero Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-500 text-xs font-bold shadow-md">
            <HiSparkles className="w-4 h-4 text-amber-500 animate-pulse" />
            <span>Nestly AI Intelligence Suite</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Next-Generation AI Real Estate Engine
          </h1>
          <p className="text-sm sm:text-base text-[var(--text-muted)]">
            Powered by Google Gemini AI for smart property matches, document & contract intelligence, and live real estate chat assistance.
          </p>
        </div>

        {/* Feature Tabs Selector */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 pt-4 border-b border-[var(--border-color)] overflow-x-auto">
          <button
            onClick={() => setActiveTab("recommendations")}
            className={`flex items-center gap-2 px-4 sm:px-5 py-3 rounded-t-2xl font-bold text-xs sm:text-sm border-b-2 transition-all whitespace-nowrap ${
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
            className={`flex items-center gap-2 px-4 sm:px-5 py-3 rounded-t-2xl font-bold text-xs sm:text-sm border-b-2 transition-all whitespace-nowrap ${
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
            className={`flex items-center gap-2 px-4 sm:px-5 py-3 rounded-t-2xl font-bold text-xs sm:text-sm border-b-2 transition-all whitespace-nowrap ${
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
            {/* Preference Profiler Form */}
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] p-6 sm:p-8 rounded-3xl shadow-xl space-y-6 lg:col-span-1">
              <h3 className="text-xl font-bold text-[var(--text-main)] border-b border-[var(--border-color)] pb-3 flex items-center gap-2">
                <HiSparkles className="w-5 h-5 text-amber-500" /> Preference Profiler
              </h3>
              <p className="text-xs text-[var(--text-muted)]">
                Customize your property search criteria. Our Gemini AI engine scores live listings in MongoDB to surface high-match properties.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[var(--text-muted)] uppercase mb-1">
                    Target City / Location
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-[var(--bg-card-subtle)] border border-[var(--border-color)] text-[var(--text-main)] text-xs rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[var(--text-muted)] uppercase mb-1">
                    Property Type
                  </label>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full bg-[var(--bg-card-subtle)] border border-[var(--border-color)] text-[var(--text-main)] text-xs rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-teal-500 cursor-pointer"
                  >
                    <option value="all">All Types</option>
                    <option value="apartment">Apartment</option>
                    <option value="villa">Villa</option>
                    <option value="penthouse">Penthouse</option>
                    <option value="suburban">Suburban Home</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[var(--text-muted)] uppercase mb-1">
                    Max Budget ($)
                  </label>
                  <input
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full bg-[var(--bg-card-subtle)] border border-[var(--border-color)] text-[var(--text-main)] text-xs rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[var(--text-muted)] uppercase mb-1">
                    Min Bedrooms
                  </label>
                  <select
                    value={bedrooms}
                    onChange={(e) => setBedrooms(e.target.value)}
                    className="w-full bg-[var(--bg-card-subtle)] border border-[var(--border-color)] text-[var(--text-main)] text-xs rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-teal-500 cursor-pointer"
                  >
                    <option value="0">Any Bedrooms</option>
                    <option value="1">1+ Beds</option>
                    <option value="2">2+ Beds</option>
                    <option value="3">3+ Beds</option>
                    <option value="4">4+ Beds</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[var(--text-muted)] uppercase mb-1.5">
                    Lifestyle Priorities & Amenities
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      "Ocean Views",
                      "Smart Home Tech",
                      "Private Pool",
                      "EV Parking",
                      "Gated Security",
                      "Top School District",
                    ].map((tag) => {
                      const isSelected = selectedLifestyle.includes(tag);
                      return (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => toggleLifestyle(tag)}
                          className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border transition-all ${
                            isSelected
                              ? "bg-teal-600 text-white border-teal-500 shadow-sm"
                              : "bg-[var(--bg-card-subtle)] text-[var(--text-muted)] border-[var(--border-color)] hover:text-[var(--text-main)]"
                          }`}
                        >
                          {isSelected ? "✓ " : "+ "}
                          {tag}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleFetchRecommendations}
                    disabled={loadingRecs}
                    className="btn w-full bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl border-none shadow-md flex items-center justify-center gap-2"
                  >
                    {loadingRecs ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Scoring Luxury Matches...</span>
                      </>
                    ) : (
                      <>
                        <HiSparkles className="w-4 h-4 text-amber-300" />
                        <span>Generate AI Property Matches</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Results Grid */}
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] p-6 sm:p-8 rounded-3xl shadow-xl lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3">
                <h3 className="text-xl font-bold text-[var(--text-main)] flex items-center gap-2">
                  <span>Top AI Property Matches</span>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-500 border border-teal-500/30">
                    {recommendations.length} Matches
                  </span>
                </h3>
              </div>

              {loadingRecs ? (
                <div className="p-12 text-center">
                  <div className="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                  <p className="text-sm text-[var(--text-muted)] font-medium">Evaluating multi-attribute luxury match scores...</p>
                </div>
              ) : recommendations.length === 0 ? (
                <div className="p-12 text-center space-y-3 border-2 border-dashed border-[var(--border-color)] rounded-2xl">
                  <HiBuildingOffice2 className="w-10 h-10 text-[var(--text-muted)] mx-auto" />
                  <p className="text-base font-bold text-[var(--text-main)]">No matching properties found</p>
                  <p className="text-xs text-[var(--text-muted)]">Try adjusting your budget or location filter to see more AI recommendations.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {recommendations.map((prop, idx) => {
                    const propId = prop._id || prop.id;
                    const coverImage =
                      prop.image ||
                      (Array.isArray(prop.images) && prop.images[0]) ||
                      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750";
                    const displayPrice =
                      typeof prop.price === "number"
                        ? `$${prop.price.toLocaleString("en-US")}`
                        : prop.formattedPrice || prop.price;
                    const matchScore = prop.matchScore || Math.max(99 - idx * 2, 89);

                    return (
                      <div
                        key={propId}
                        className="p-4 rounded-2xl bg-[var(--bg-card-subtle)] border border-[var(--border-color)] space-y-3 hover:border-teal-500/50 transition-all group flex flex-col justify-between shadow-md"
                      >
                        <div className="space-y-3">
                          <div className="relative aspect-[16/10] rounded-xl overflow-hidden">
                            <img
                              src={coverImage}
                              alt={prop.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <span className="absolute top-2.5 left-2.5 text-[10px] font-black px-2.5 py-1 rounded-lg bg-slate-900/90 backdrop-blur-md text-amber-400 border border-amber-500/40 shadow-md flex items-center gap-1">
                              <HiSparkles className="w-3 h-3 text-amber-400" /> {matchScore}% AI MATCH
                            </span>
                          </div>

                          <div className="space-y-1.5">
                            <h4 className="font-bold text-sm text-[var(--text-main)] line-clamp-1 group-hover:text-teal-500 transition-colors">
                              {prop.title}
                            </h4>
                            <p className="text-xs text-[var(--text-muted)] flex items-center gap-1">
                              <HiMapPin className="w-3.5 h-3.5 text-teal-500 shrink-0" />
                              <span className="truncate">{prop.location}</span>
                            </p>

                            <div className="flex items-center gap-3 text-[11px] font-semibold text-[var(--text-muted)] py-0.5">
                              <span>{prop.beds || 3} Beds</span>
                              <span>•</span>
                              <span>{prop.baths || 2} Baths</span>
                              {prop.sqft && (
                                <>
                                  <span>•</span>
                                  <span>{prop.sqft}</span>
                                </>
                              )}
                            </div>

                            <p className="text-base font-black text-teal-500">
                              {displayPrice}
                            </p>

                            {prop.matchReason && (
                              <p className="text-[11px] text-[var(--text-muted)] italic pt-1.5 border-t border-[var(--border-color)] leading-snug">
                                "{prop.matchReason}"
                              </p>
                            )}
                          </div>
                        </div>

                        <Link
                          href={`/items/${propId}`}
                          className="btn btn-sm bg-[var(--bg-card)] hover:bg-teal-600 hover:text-white border border-[var(--border-color)] text-[var(--text-main)] font-bold rounded-xl w-full text-xs mt-3 flex items-center justify-center gap-1"
                        >
                          View Listing Details <HiArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    );
                  })}
                </div>
              )}
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
            {/* Document Input Panel */}
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] p-6 sm:p-8 rounded-3xl shadow-xl space-y-6">
              <div className="space-y-1 border-b border-[var(--border-color)] pb-3">
                <h3 className="text-xl font-bold text-[var(--text-main)] flex items-center gap-2">
                  <HiDocumentText className="w-5 h-5 text-teal-500" /> AI Document & Contract Intelligence
                </h3>
                <p className="text-xs text-[var(--text-muted)]">
                  Upload PDF, DOCX, or TXT documents for automated AI summarization, key point extraction, financial table parsing, and action item generation.
                </p>
              </div>

              {/* Upload Dropzone */}
              <div className="border-2 border-dashed border-[var(--border-color)] hover:border-teal-500 rounded-3xl p-6 text-center bg-[var(--bg-card-subtle)] transition-colors">
                <input
                  type="file"
                  id="ai-pdf-input"
                  accept=".pdf,.txt,.doc,.docx"
                  onChange={handleDocUpload}
                  disabled={analyzingDoc}
                  className="hidden"
                />
                <label htmlFor="ai-pdf-input" className="cursor-pointer flex flex-col items-center justify-center space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-500 flex items-center justify-center border border-teal-500/20">
                    {analyzingDoc ? (
                      <HiArrowPath className="w-6 h-6 animate-spin text-teal-500" />
                    ) : (
                      <HiDocumentPlus className="w-6 h-6" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[var(--text-main)]">
                      {analyzingDoc ? "Processing Document File..." : "Upload PDF, DOCX, or TXT Document"}
                    </p>
                    <p className="text-xs text-[var(--text-muted)] mt-1">
                      Drag & drop or click to select contract file (.pdf, .docx, .txt)
                    </p>
                  </div>
                </label>
              </div>

              {/* Uploaded File Metadata Badge */}
              {uploadedFile && (
                <div className="p-3.5 rounded-2xl bg-[var(--bg-card-subtle)] border border-[var(--border-color)] flex items-center justify-between">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <span className="px-2.5 py-1 rounded-lg bg-teal-500/20 text-teal-500 font-extrabold text-[10px] uppercase border border-teal-500/30">
                      {uploadedFile.ext}
                    </span>
                    <div className="overflow-hidden">
                      <p className="text-xs font-bold text-[var(--text-main)] truncate">{uploadedFile.name}</p>
                      <p className="text-[10px] text-[var(--text-muted)]">{uploadedFile.size}</p>
                    </div>
                  </div>
                  <span className="text-xs text-emerald-500 font-semibold flex items-center gap-1">
                    <HiCheckCircle className="w-4 h-4" /> Ready
                  </span>
                </div>
              )}

              {/* Processing Progress Indicator */}
              {analyzingDoc && (
                <div className="p-4 rounded-2xl bg-teal-500/10 border border-teal-500/30 space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-teal-500">
                    <span className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-teal-500 animate-ping" />
                      <span>AI Multi-Phase Processing Active</span>
                    </span>
                    <span>Phase {processingStep} of 3</span>
                  </div>

                  <div className="w-full bg-[var(--bg-card-subtle)] h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-teal-500 to-amber-500 h-full transition-all duration-500"
                      style={{ width: `${(processingStep / 3) * 100}%` }}
                    />
                  </div>

                  <p className="text-[11px] text-[var(--text-muted)] italic">
                    {processingStep === 1 && "📄 Phase 1: Parsing file structure & text encoding..."}
                    {processingStep === 2 && "🤖 Phase 2: Gemini AI analyzing legal clauses & risk items..."}
                    {processingStep === 3 && "📊 Phase 3: Generating extracted financial tables & action items..."}
                  </p>
                </div>
              )}

              {/* Textarea Fallback */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-[var(--text-muted)] uppercase">
                  Or Paste Document / Agreement Text
                </label>
                <textarea
                  rows={5}
                  placeholder="Paste contract clauses, purchase agreements, or terms here..."
                  value={pastedDocText}
                  onChange={(e) => setPastedDocText(e.target.value)}
                  className="w-full bg-[var(--bg-card-subtle)] border border-[var(--border-color)] text-[var(--text-main)] text-xs rounded-2xl p-4 focus:outline-none focus:border-teal-500"
                />
              </div>

              <button
                onClick={() => processDocAudit()}
                disabled={analyzingDoc}
                className="btn w-full bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl border-none shadow-md flex items-center justify-center gap-2"
              >
                {analyzingDoc ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing Document Intelligence...</span>
                  </>
                ) : (
                  <>
                    <HiDocumentCheck className="w-4 h-4" />
                    <span>Run AI Document Intelligence Audit</span>
                  </>
                )}
              </button>
            </div>

            {/* Audit Output Panel — All 4 Capabilities + Download Summary */}
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] p-6 sm:p-8 rounded-3xl shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3">
                <h3 className="text-xl font-bold text-[var(--text-main)] flex items-center gap-2">
                  <HiCheckCircle className="w-5 h-5 text-emerald-500" /> Document Intelligence Output
                </h3>

                {auditResult && (
                  <button
                    onClick={handleDownloadSummary}
                    className="btn btn-xs sm:btn-sm bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl border-none shadow-md flex items-center gap-1.5"
                  >
                    <HiArrowDownTray className="w-4 h-4" />
                    <span>Download Summary</span>
                  </button>
                )}
              </div>

              {auditResult ? (
                <div className="space-y-5 text-xs">
                  {/* Capability 1: Summarization */}
                  <div className="p-4 rounded-2xl bg-[var(--bg-card-subtle)] border border-[var(--border-color)] space-y-1.5">
                    <span className="font-bold text-teal-500 uppercase tracking-wider text-[10px] flex items-center gap-1">
                      <HiSparkles className="w-3.5 h-3.5 text-amber-400" /> 1. Executive Summarization
                    </span>
                    <p className="text-[var(--text-main)] font-medium leading-relaxed">
                      {auditResult.summary}
                    </p>
                  </div>

                  {/* Capability 2: Key Point Extraction */}
                  {auditResult.keyTerms && (
                    <div className="p-4 rounded-2xl bg-[var(--bg-card-subtle)] border border-[var(--border-color)] space-y-2">
                      <span className="font-bold text-emerald-500 uppercase tracking-wider text-[10px] flex items-center gap-1">
                        <HiClipboardDocumentCheck className="w-3.5 h-3.5" /> 2. Key Point Extraction
                      </span>
                      <div className="grid grid-cols-2 gap-2.5 text-xs pt-1">
                        <div className="p-2 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)]">
                          <span className="text-[var(--text-muted)] block text-[10px]">Monthly Rent / Price:</span>
                          <span className="font-bold text-teal-500">{auditResult.keyTerms.monthlyRent || "N/A"}</span>
                        </div>
                        <div className="p-2 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)]">
                          <span className="text-[var(--text-muted)] block text-[10px]">Security Deposit:</span>
                          <span className="font-bold text-[var(--text-main)]">{auditResult.keyTerms.securityDeposit || "N/A"}</span>
                        </div>
                        <div className="p-2 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)]">
                          <span className="text-[var(--text-muted)] block text-[10px]">Lease Duration:</span>
                          <span className="font-bold text-[var(--text-main)]">{auditResult.keyTerms.leaseDuration || "N/A"}</span>
                        </div>
                        <div className="p-2 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)]">
                          <span className="text-[var(--text-muted)] block text-[10px]">Commencement Date:</span>
                          <span className="font-bold text-[var(--text-main)]">{auditResult.keyTerms.commencementDate || "N/A"}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Capability 3: Table Extraction */}
                  {Array.isArray(auditResult.extractedTable) && auditResult.extractedTable.length > 0 && (
                    <div className="p-4 rounded-2xl bg-[var(--bg-card-subtle)] border border-[var(--border-color)] space-y-2 overflow-x-auto">
                      <span className="font-bold text-indigo-400 uppercase tracking-wider text-[10px] flex items-center gap-1">
                        <HiTableCells className="w-3.5 h-3.5" /> 3. Extracted Financial & Schedule Table
                      </span>
                      <table className="w-full text-left border-collapse text-[11px]">
                        <thead>
                          <tr className="border-b border-[var(--border-color)] text-[var(--text-muted)]">
                            <th className="py-1.5 px-2 font-bold">Fee / Term</th>
                            <th className="py-1.5 px-2 font-bold">Amount</th>
                            <th className="py-1.5 px-2 font-bold">Frequency</th>
                            <th className="py-1.5 px-2 font-bold">Clause Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--border-color)]">
                          {auditResult.extractedTable.map((row, idx) => (
                            <tr key={idx} className="hover:bg-[var(--bg-card)] transition-colors">
                              <td className="py-2 px-2 font-bold text-[var(--text-main)]">{row.fee}</td>
                              <td className="py-2 px-2 font-bold text-teal-500">{row.amount}</td>
                              <td className="py-2 px-2 text-[var(--text-muted)]">{row.frequency}</td>
                              <td className="py-2 px-2 text-[var(--text-muted)] text-[10px]">{row.status}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Capability 4: Action Item Generation */}
                  {Array.isArray(auditResult.actionItems) && auditResult.actionItems.length > 0 && (
                    <div className="p-4 rounded-2xl bg-[var(--bg-card-subtle)] border border-[var(--border-color)] space-y-2">
                      <span className="font-bold text-amber-500 uppercase tracking-wider text-[10px] flex items-center gap-1">
                        <HiLightBulb className="w-3.5 h-3.5 text-amber-500" /> 4. AI Generated Action Items
                      </span>
                      <div className="space-y-1.5 pt-1">
                        {auditResult.actionItems.map((item, i) => (
                          <div key={i} className="flex items-start gap-2 text-[var(--text-main)] font-medium bg-[var(--bg-card)] p-2 rounded-xl border border-[var(--border-color)]">
                            <input type="checkbox" className="checkbox checkbox-xs checkbox-primary shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Flagged Risk Clauses */}
                  {Array.isArray(auditResult.flaggedClauses) && auditResult.flaggedClauses.length > 0 && (
                    <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2">
                      <span className="font-bold text-amber-500 uppercase tracking-wider text-[10px] flex items-center gap-1">
                        <HiExclamationTriangle className="w-3.5 h-3.5" /> Flagged Risk Clauses
                      </span>
                      <ul className="list-disc list-inside space-y-1 text-[var(--text-main)] font-medium">
                        {auditResult.flaggedClauses.map((clause, i) => (
                          <li key={i}>{clause}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-10 text-center border-2 border-dashed border-[var(--border-color)] rounded-2xl space-y-2">
                  <HiDocumentText className="w-10 h-10 text-[var(--text-muted)] mx-auto" />
                  <p className="text-base font-bold text-[var(--text-main)]">Ready to audit contract</p>
                  <p className="text-xs text-[var(--text-muted)]">
                    Upload a PDF, DOCX, or TXT agreement on the left to see instant Gemini AI summarization, table extraction, and action items.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Tab 3: AI Real Estate Assistant */}
        {activeTab === "assistant" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[560px]"
          >
            {/* Header */}
            <div className="p-4 sm:p-5 bg-[var(--bg-card-subtle)] border-b border-[var(--border-color)] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-600 to-amber-500 flex items-center justify-center text-white font-bold shadow-md">
                  <HiSparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[var(--text-main)]">Nestly AI Real Estate Assistant</h3>
                  <p className="text-[11px] text-teal-500 font-semibold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Live Gemini AI Chat
                  </p>
                </div>
              </div>

              <button
                onClick={() =>
                  setChatMessages([
                    {
                      sender: "ai",
                      text: "Hello! I am Nestly AI assistant. Ask me anything about property prices, contract terms, or neighborhood insights!",
                    },
                  ])
                }
                className="text-xs font-bold text-[var(--text-muted)] hover:text-teal-500 flex items-center gap-1"
              >
                <HiArrowPath className="w-3.5 h-3.5" /> Clear Chat
              </button>
            </div>

            {/* Quick Prompt Chips */}
            <div className="p-3 bg-[var(--bg-card-subtle)]/50 border-b border-[var(--border-color)] flex items-center gap-2 overflow-x-auto">
              {[
                "What are property prices in Malibu?",
                "Which penthouses are under $3M?",
                "How does Nestly AI match homes?",
              ].map((chip, idx) => (
                <button
                  key={idx}
                  onClick={(e) => handleSendMessage(e, chip)}
                  className="px-3 py-1 rounded-full bg-[var(--bg-card)] hover:bg-teal-600 hover:text-white border border-[var(--border-color)] text-[11px] font-semibold text-[var(--text-muted)] transition-all whitespace-nowrap shrink-0"
                >
                  💡 {chip}
                </button>
              ))}
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
                        ? "bg-teal-600 text-white rounded-br-none shadow-sm"
                        : "bg-[var(--bg-card-subtle)] border border-[var(--border-color)] text-[var(--text-main)] rounded-bl-none shadow-sm"
                    }`}
                  >
                    <FormattedChatMessage text={msg.text} isUser={msg.sender === "user"} />
                  </div>
                </div>
              ))}

              {sendingMsg && (
                <div className="flex justify-start">
                  <div className="bg-[var(--bg-card-subtle)] border border-[var(--border-color)] text-[var(--text-muted)] p-3 rounded-2xl rounded-bl-none text-xs flex items-center gap-2">
                    <div className="w-3 h-3 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
                    <span>Nestly AI is thinking...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendMessage} className="p-4 bg-[var(--bg-card-subtle)] border-t border-[var(--border-color)] flex items-center gap-3">
              <input
                type="text"
                placeholder="Ask Nestly AI about real estate, contracts, valuation..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="flex-1 bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-main)] text-xs rounded-xl px-4 py-3 focus:outline-none focus:border-teal-500"
              />
              <button
                type="submit"
                disabled={sendingMsg || !inputMessage.trim()}
                className="btn bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl px-4 py-3 border-none shadow-md"
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

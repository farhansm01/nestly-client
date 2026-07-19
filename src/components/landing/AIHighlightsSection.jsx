import { HiSparkles, HiBuildingOffice2, HiCurrencyDollar } from "react-icons/hi2";

const AI_FEATURES = [
  {
    title: "AI Recommendation Engine",
    desc: "Ranked property recommendations based on historical browsing behavior, budget constraints, and neighborhood preferences.",
    badge: "Smart Match",
    gradient: "from-teal-600/20 to-teal-900/40 border-teal-500/30",
  },
  {
    title: "Lease Document Intelligence",
    desc: "Upload complex lease agreements to generate instant key highlights, term summaries, and risk flags.",
    badge: "Doc Intel",
    gradient: "from-amber-600/20 to-amber-900/40 border-amber-500/30",
  },
  {
    title: "24/7 AI Real Estate Assistant",
    desc: "Conversational assistant ready to answer questions about pricing history, tax rates, school districts, and mortgage calculations.",
    badge: "AI Assistant",
    gradient: "from-indigo-600/20 to-indigo-900/40 border-indigo-500/30",
  },
];

export default function AIHighlightsSection() {
  return (
    <section id="ai-features" className="py-20 bg-slate-950 border-t border-slate-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/30 text-xs font-semibold mb-3">
            <HiSparkles className="w-3.5 h-3.5 text-amber-400" /> Powered by Advanced AI
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Intelligent Features Made for Modern Buyers
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            Experience next-generation tools designed to save time and give you a competitive edge.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {AI_FEATURES.map((feat) => (
            <div
              key={feat.title}
              className={`p-8 rounded-3xl bg-gradient-to-b ${feat.gradient} border backdrop-blur-md flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300`}
            >
              <div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-900/80 text-white border border-slate-700">
                  {feat.badge}
                </span>
                <h3 className="text-2xl font-bold text-white mt-4 mb-3">
                  {feat.title}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {feat.desc}
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-slate-700/50 flex items-center gap-2 text-xs font-semibold text-teal-300">
                <HiSparkles className="w-4 h-4 text-amber-400" />
                <span>Integrated in Nestly Core</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

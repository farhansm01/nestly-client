import { HiSparkles, HiBuildingOffice2, HiCurrencyDollar } from "react-icons/hi2";
import { Check } from "@gravity-ui/icons";

const STEPS = [
  {
    num: "01",
    title: "Set Your Preferences",
    desc: "Specify desired location, budget range, and property specs. Nestly's AI customizes your recommendation stream.",
    icon: "🎯",
  },
  {
    num: "02",
    title: "AI Valuation & Document Check",
    desc: "Analyze instant market valuation estimates and upload lease documents for automated intelligence summaries.",
    icon: "⚡",
  },
  {
    num: "03",
    title: "Seamless Tour & Closing",
    desc: "Connect directly with verified sellers, schedule private tours, and execute agreements effortlessly.",
    icon: "🔑",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-teal-400 font-semibold text-sm tracking-wider uppercase">
            Simple Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
            How Nestly Works
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            Three simple steps to finding, evaluating, and securing your next real estate investment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {STEPS.map((step) => (
            <div
              key={step.num}
              className="bg-slate-950 border border-slate-800 p-8 rounded-3xl relative hover:border-teal-500/40 transition-colors"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="text-3xl">{step.icon}</span>
                <span className="text-4xl font-black text-slate-800 font-mono">
                  {step.num}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                {step.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const STATS = [
  { label: "Active Property Volume", value: "$1.4B+" },
  { label: "Verified Listings", value: "15,000+" },
  { label: "AI Valuation Accuracy", value: "99.2%" },
  { label: "Happy Homeowners", value: "8,500+" },
];

export default function StatsSection() {
  return (
    <section className="py-16 bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {STATS.map((stat) => (
            <div key={stat.label} className="p-6 rounded-2xl bg-slate-950/60 border border-slate-800/60">
              <p className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-amber-300">
                {stat.value}
              </p>
              <p className="text-slate-400 text-xs sm:text-sm font-medium mt-2">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

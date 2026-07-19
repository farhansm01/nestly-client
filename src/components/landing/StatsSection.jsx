const STATS = [
  { label: "Active Property Volume", value: "$1.4B+" },
  { label: "Verified Listings", value: "15,000+" },
  { label: "AI Valuation Accuracy", value: "99.2%" },
  { label: "Happy Homeowners", value: "8,500+" },
];

export default function StatsSection() {
  return (
    <section className="py-16 bg-[var(--bg-main)] border-t border-[var(--border-color)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {STATS.map((stat) => (
            <div key={stat.label} className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-md">
              <p className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-amber-500">
                {stat.value}
              </p>
              <p className="text-[var(--text-muted)] text-xs sm:text-sm font-medium mt-2">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

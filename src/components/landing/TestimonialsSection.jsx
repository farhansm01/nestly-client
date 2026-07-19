import { Star } from "@gravity-ui/icons";

const TESTIMONIALS = [
  {
    name: "Sarah Jenkins",
    role: "Homeowner in San Francisco",
    content: "The AI recommendation matched me with a penthouse in Pacific Heights that wasn't even on my radar. The valuation summary saved us $40,000 during closing!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Marcus Vance",
    role: "Real Estate Investor",
    content: "Document Intelligence is a game changer. Uploading complex agreements and getting instant summaries made due diligence 10x faster.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Elena Rostova",
    role: "First-time Buyer",
    content: "Nestly's AI Assistant answered all my questions about tax rates and mortgage breakdowns cleanly. Super intuitive and transparent platform!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-slate-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-teal-400 font-semibold text-sm tracking-wider uppercase">
            User Stories
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
            Loved by Buyers & Investors
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            See how Nestly's AI real estate platform helps people make confident decisions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="bg-slate-900 border border-slate-800 p-8 rounded-3xl flex flex-col justify-between hover:border-teal-500/40 transition-colors"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed italic">
                  "{t.content}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-6 mt-6 border-t border-slate-800">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover border border-teal-500/40"
                />
                <div>
                  <h4 className="text-white font-bold text-sm">{t.name}</h4>
                  <p className="text-slate-400 text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

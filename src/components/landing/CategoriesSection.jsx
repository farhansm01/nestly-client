import Link from "next/link";
import { HiBuildingOffice2 } from "react-icons/hi2";

const CATEGORIES = [
  {
    name: "Modern Apartments",
    count: "420+ Listings",
    icon: "🏢",
    type: "apartment",
    desc: "Sleek city center apartments with luxury amenities.",
  },
  {
    name: "Luxury Villas",
    count: "185+ Listings",
    icon: "🏡",
    type: "villa",
    desc: "Spacious private estates with infinity pools and sprawling gardens.",
  },
  {
    name: "Urban Penthouses",
    count: "95+ Listings",
    icon: "🏙️",
    type: "penthouse",
    desc: "High-floor penthouses featuring panoramic skyline views.",
  },
  {
    name: "Suburban Family Homes",
    count: "310+ Listings",
    icon: "🏠",
    type: "suburban",
    desc: "Charming family residences in quiet, top-rated school districts.",
  },
];

export default function CategoriesSection() {
  return (
    <section className="py-20 bg-slate-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-teal-400 font-semibold text-sm tracking-wider uppercase">
            Curated Categories
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
            Browse by Property Type
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            Explore homes tailored to your exact architectural and lifestyle preferences.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.type}
              href={`/items?type=${cat.type}`}
              className="bg-slate-900 border border-slate-800 hover:border-teal-500/50 p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between"
            >
              <div>
                <div className="text-4xl mb-4 p-3 bg-slate-950 rounded-2xl w-fit border border-slate-800 group-hover:scale-110 transition-transform">
                  {cat.icon}
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-teal-400 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-slate-400 text-xs mt-2 leading-relaxed">
                  {cat.desc}
                </p>
              </div>
              <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-800 text-xs font-semibold">
                <span className="text-amber-400">{cat.count}</span>
                <span className="text-teal-400 group-hover:translate-x-1 transition-transform">
                  Explore →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

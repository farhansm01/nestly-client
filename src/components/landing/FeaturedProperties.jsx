import Link from "next/link";
import { HiMapPin, HiSparkles } from "react-icons/hi2";
import { Star } from "@gravity-ui/icons";

const FEATURED_PROPERTIES = [
  {
    id: "prop-1",
    title: "Skyline Luxury Penthouse",
    location: "Downtown, San Francisco, CA",
    price: "$2,450,000",
    type: "Penthouse",
    beds: 3,
    baths: 3,
    sqft: "2,850 sqft",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    aiMatch: "98% AI Match",
    rating: 4.9,
  },
  {
    id: "prop-2",
    title: "Emerald Bay Coastal Villa",
    location: "Malibu Beach, CA",
    price: "$4,800,000",
    type: "Villa",
    beds: 5,
    baths: 4.5,
    sqft: "4,500 sqft",
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80",
    aiMatch: "96% AI Match",
    rating: 5.0,
  },
  {
    id: "prop-3",
    title: "Urban Minimalist Residence",
    location: "SOMA District, San Francisco, CA",
    price: "$1,290,000",
    type: "Apartment",
    beds: 2,
    baths: 2,
    sqft: "1,420 sqft",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    aiMatch: "94% AI Match",
    rating: 4.8,
  },
  {
    id: "prop-4",
    title: "Highland Heights Modern Estate",
    location: "Pacific Heights, CA",
    price: "$3,650,000",
    type: "Villa",
    beds: 4,
    baths: 4,
    sqft: "3,600 sqft",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
    aiMatch: "97% AI Match",
    rating: 4.9,
  },
];

export default function FeaturedProperties() {
  return (
    <section id="featured" className="py-20 bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-teal-400 font-semibold text-sm tracking-wider uppercase flex items-center gap-1">
              <HiSparkles className="w-4 h-4 text-amber-400" /> Handpicked Selection
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
              Featured Properties
            </h2>
          </div>
          <Link
            href="/items"
            className="btn btn-outline border-slate-700 hover:border-teal-500 text-slate-200 hover:text-white rounded-xl"
          >
            View All Properties
          </Link>
        </div>

        {/* Responsive Grid: 4 cards per row desktop, 1 on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURED_PROPERTIES.map((property) => (
            <div
              key={property.id}
              className="bg-slate-950 border border-slate-800/80 rounded-2xl overflow-hidden hover:border-teal-500/50 transition-all duration-300 flex flex-col group shadow-lg"
            >
              {/* Image Container */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-800">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-slate-900/90 text-teal-300 border border-teal-500/30 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 backdrop-blur-md">
                  <HiSparkles className="w-3 h-3 text-amber-400" /> {property.aiMatch}
                </div>
                <div className="absolute top-3 right-3 bg-slate-900/80 text-amber-400 text-xs font-bold px-2 py-1 rounded-lg flex items-center gap-1 backdrop-blur-md">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {property.rating}
                </div>
                <div className="absolute bottom-3 left-3 bg-teal-600 text-white font-bold text-sm px-3 py-1 rounded-xl shadow-md">
                  {property.price}
                </div>
              </div>

              {/* Content Box */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                    {property.type}
                  </span>
                  <h3 className="text-lg font-bold text-white group-hover:text-teal-400 transition-colors line-clamp-1 mt-0.5">
                    {property.title}
                  </h3>
                  <div className="flex items-center gap-1 text-slate-400 text-xs mt-1">
                    <HiMapPin className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                    <span className="truncate">{property.location}</span>
                  </div>
                </div>

                {/* Meta Specs */}
                <div className="flex items-center justify-between py-2 border-y border-slate-800 text-xs text-slate-400">
                  <span>{property.beds} Beds</span>
                  <span>•</span>
                  <span>{property.baths} Baths</span>
                  <span>•</span>
                  <span>{property.sqft}</span>
                </div>

                <Link
                  href={`/items/${property.id}`}
                  className="btn btn-sm bg-slate-900 hover:bg-teal-600 text-slate-200 hover:text-white border-slate-800 hover:border-teal-600 rounded-xl w-full font-medium"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import { HiBuildingOffice2, HiSparkles, HiMapPin, HiCurrencyDollar } from "react-icons/hi2";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-600 to-amber-500 flex items-center justify-center text-white shadow-md shadow-teal-900/30">
                <HiBuildingOffice2 className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-bold tracking-tight text-white">
                  Nestly
                </span>
                <span className="text-[10px] font-semibold tracking-wider px-1.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 flex items-center gap-0.5">
                  <HiSparkles className="w-3 h-3 text-amber-400" /> AI
                </span>
              </div>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Empowering home buyers, sellers, and investors with AI-driven property valuations, intelligent matching, and verified real estate listings.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-teal-400 hover:border-teal-500/50 transition-colors">
                <span className="text-sm font-semibold">X</span>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-teal-400 hover:border-teal-500/50 transition-colors">
                <span className="text-sm font-semibold">in</span>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-teal-400 hover:border-teal-500/50 transition-colors">
                <span className="text-sm font-semibold">f</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Explore
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/items" className="hover:text-teal-400 transition-colors">
                  All Properties
                </Link>
              </li>
              <li>
                <Link href="/items?type=apartment" className="hover:text-teal-400 transition-colors">
                  Modern Apartments
                </Link>
              </li>
              <li>
                <Link href="/items?type=villa" className="hover:text-teal-400 transition-colors">
                  Luxury Villas
                </Link>
              </li>
              <li>
                <Link href="/items?type=penthouse" className="hover:text-teal-400 transition-colors">
                  Penthouses
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Platform Actions */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Platform
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/items/add" className="hover:text-teal-400 transition-colors">
                  Add New Listing
                </Link>
              </li>
              <li>
                <Link href="/items/manage" className="hover:text-teal-400 transition-colors">
                  Manage My Listings
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-teal-400 transition-colors">
                  About Nestly
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-teal-400 transition-colors">
                  Account Sign In
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <HiMapPin className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                <span>742 Evergreen Terrace, San Francisco, CA</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="text-teal-400 font-semibold">@</span>
                <span>support@nestly.ai</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Nestly AI Platform. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-slate-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-slate-400 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

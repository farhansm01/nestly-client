import Link from "next/link";
import { HiBuildingOffice2, HiSparkles, HiMapPin, HiEnvelope } from "react-icons/hi2";
import { FaTwitter, FaLinkedin, FaFacebook, FaInstagram, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[var(--bg-main)] text-[var(--text-muted)] border-t border-[var(--border-color)] pt-16 pb-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[var(--border-color)]">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-600 to-amber-500 flex items-center justify-center text-white shadow-md shadow-teal-900/30">
                <HiBuildingOffice2 className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-bold tracking-tight text-[var(--text-main)]">
                  Nestly
                </span>
                <span className="text-[10px] font-semibold tracking-wider px-1.5 py-0.5 rounded-full bg-teal-500/20 text-teal-500 dark:text-teal-300 border border-teal-500/30 flex items-center gap-0.5">
                  <HiSparkles className="w-3 h-3 text-amber-500" /> AI
                </span>
              </div>
            </Link>

            <p className="text-sm text-[var(--text-muted)] max-w-sm leading-relaxed">
              Empowering home buyers, sellers, and real estate investors with AI-driven property valuations, intelligent matching, and verified real estate listings.
            </p>

            {/* Social Media Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--border-color)] flex items-center justify-center text-[var(--text-muted)] hover:text-teal-500 hover:border-teal-500/50 transition-colors"
                title="Twitter / X"
              >
                <FaTwitter className="w-4 h-4" />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--border-color)] flex items-center justify-center text-[var(--text-muted)] hover:text-teal-500 hover:border-teal-500/50 transition-colors"
                title="LinkedIn"
              >
                <FaLinkedin className="w-4 h-4" />
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--border-color)] flex items-center justify-center text-[var(--text-muted)] hover:text-teal-500 hover:border-teal-500/50 transition-colors"
                title="Facebook"
              >
                <FaFacebook className="w-4 h-4" />
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--border-color)] flex items-center justify-center text-[var(--text-muted)] hover:text-teal-500 hover:border-teal-500/50 transition-colors"
                title="Instagram"
              >
                <FaInstagram className="w-4 h-4" />
              </a>

              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--border-color)] flex items-center justify-center text-[var(--text-muted)] hover:text-teal-500 hover:border-teal-500/50 transition-colors"
                title="GitHub"
              >
                <FaGithub className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--text-main)] tracking-wider uppercase mb-4">
              Explore Types
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/items" className="hover:text-teal-500 transition-colors">
                  All Properties
                </Link>
              </li>
              <li>
                <Link href="/items?type=apartment" className="hover:text-teal-500 transition-colors">
                  Modern Apartments
                </Link>
              </li>
              <li>
                <Link href="/items?type=villa" className="hover:text-teal-500 transition-colors">
                  Luxury Villas
                </Link>
              </li>
              <li>
                <Link href="/items?type=penthouse" className="hover:text-teal-500 transition-colors">
                  Penthouses
                </Link>
              </li>
              <li>
                <Link href="/items?type=suburban" className="hover:text-teal-500 transition-colors">
                  Suburban Homes
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Platform Actions */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--text-main)] tracking-wider uppercase mb-4">
              Platform & Features
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/ai-features" className="hover:text-teal-500 font-semibold text-amber-500 transition-colors flex items-center gap-1">
                  <HiSparkles className="w-3.5 h-3.5" /> AI Features
                </Link>
              </li>
              <li>
                <Link href="/dashboard/add" className="hover:text-teal-500 transition-colors">
                  Post New Property
                </Link>
              </li>
              <li>
                <Link href="/dashboard/manage" className="hover:text-teal-500 transition-colors">
                  Manage Listings
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-teal-500 transition-colors">
                  About Nestly
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-teal-500 transition-colors">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--text-main)] tracking-wider uppercase mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <HiMapPin className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                <span>742 Evergreen Terrace, San Francisco, CA</span>
              </li>
              <li className="flex items-center gap-2.5">
                <HiEnvelope className="w-5 h-5 text-teal-500 shrink-0" />
                <a href="mailto:support@nestly.ai" className="hover:text-teal-500 transition-colors">
                  support@nestly.ai
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[var(--text-muted)]">
          <p>© {new Date().getFullYear()} Nestly AI Platform. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-[var(--text-main)] transition-colors">
              About Platform
            </Link>
            <Link href="/contact" className="hover:text-[var(--text-main)] transition-colors">
              Help & Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

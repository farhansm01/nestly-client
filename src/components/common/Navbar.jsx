"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/components/providers/AuthProvider";
import { House, User, Plus, TrashBin, ChevronDown, Check } from "@gravity-ui/icons";
import { HiBuildingOffice2, HiSparkles, HiFunnel } from "react-icons/hi2";

export default function Navbar() {
  const pathname = usePathname();
  const { user, isPending } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Explore Properties", href: "/items" },
    { name: "AI Features", href: "/#ai-features" },
    { name: "About Us", href: "/about" },
  ];

  if (user) {
    navLinks.splice(2, 0, 
      { name: "Add Property", href: "/items/add" },
      { name: "Manage Listings", href: "/items/manage" }
    );
  }

  const isActive = (path) => pathname === path;

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-slate-900/90 backdrop-blur-md shadow-lg border-b border-slate-800"
          : "bg-slate-900 border-b border-slate-800/60"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-600 to-amber-500 flex items-center justify-center text-white shadow-md shadow-teal-900/30 group-hover:scale-105 transition-transform">
              <HiBuildingOffice2 className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-bold tracking-tight text-white">
                  Nestly
                </span>
                <span className="text-[10px] font-semibold tracking-wider px-1.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 flex items-center gap-0.5">
                  <HiSparkles className="w-3 h-3 text-amber-400" /> AI
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-800/50 p-1.5 rounded-full border border-slate-700/50">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                  isActive(link.href)
                    ? "bg-teal-600 text-white shadow-sm"
                    : "text-slate-300 hover:text-white hover:bg-slate-700/60"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* User Auth Buttons / Dropdown */}
          <div className="hidden md:flex items-center gap-3">
            {isPending ? (
              <div className="w-24 h-9 bg-slate-800 animate-pulse rounded-lg" />
            ) : user ? (
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost border border-slate-700 bg-slate-800/80 hover:bg-slate-800 text-white rounded-xl gap-2 px-3"
                >
                  <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center text-white font-semibold">
                    {user.name ? user.name[0].toUpperCase() : "U"}
                  </div>
                  <span className="max-w-[120px] truncate text-sm font-medium">
                    {user.name || "User"}
                  </span>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu p-2 shadow-xl bg-slate-900 border border-slate-800 rounded-2xl w-60 mt-2 text-slate-200 z-50"
                >
                  <li className="px-3 py-2 border-b border-slate-800">
                    <p className="font-semibold text-white truncate">{user.name}</p>
                    <p className="text-xs text-slate-400 truncate">{user.email}</p>
                  </li>
                  <li>
                    <Link href="/items/add" className="py-2.5 hover:bg-slate-800 rounded-xl">
                      <Plus className="w-4 h-4 text-teal-400" /> Add Property
                    </Link>
                  </li>
                  <li>
                    <Link href="/items/manage" className="py-2.5 hover:bg-slate-800 rounded-xl">
                      <HiBuildingOffice2 className="w-4 h-4 text-amber-400" /> Manage Listings
                    </Link>
                  </li>
                  <li className="border-t border-slate-800 mt-1 pt-1">
                    <button
                      onClick={() => alert("Logging out...")}
                      className="py-2.5 text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-xl"
                    >
                      Log Out
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="btn btn-sm bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-500 hover:to-teal-600 border-none text-white font-medium rounded-xl px-5 shadow-md shadow-teal-900/40"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 hover:text-white"
              aria-label="Toggle navigation menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 pt-3 pb-6 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                isActive(link.href)
                  ? "bg-teal-600 text-white"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              {link.name}
            </Link>
          ))}
          {!user && (
            <div className="pt-4 border-t border-slate-800 flex flex-col gap-2.5">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3 rounded-xl text-slate-300 bg-slate-800 font-medium"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3 rounded-xl text-white bg-teal-600 font-medium"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { useAuth } from "@/components/providers/AuthProvider";
import { useTheme } from "@/components/providers/ThemeProvider";
import { authClient } from "@/lib/auth-client";
import { ChevronDown, Plus } from "@gravity-ui/icons";
import { HiBuildingOffice2, HiSparkles, HiSun, HiMoon, HiArrowRightOnRectangle, HiSquares2X2 } from "react-icons/hi2";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isPending } = useAuth();
  const { theme, toggleTheme, mounted } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      toast.success("Logged out successfully");
      setMobileMenuOpen(false);
      router.push("/login");
      router.refresh();
    } catch (err) {
      toast.error(err.message || "Logout failed");
    }
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Explore Properties", href: "/items" },
    { name: "AI Features", href: "/#ai-features" },
    { name: "About Us", href: "/about" },
  ];

  const isActive = (path) => pathname === path;

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[var(--bg-main)]/90 backdrop-blur-md shadow-lg border-b border-[var(--border-color)]"
          : "bg-[var(--bg-main)] border-b border-[var(--border-color)]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ scale: 1.08, rotate: 3 }}
              transition={{ type: "spring", stiffness: 400 }}
              className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-600 to-amber-500 flex items-center justify-center text-white shadow-md shadow-teal-900/30"
            >
              <HiBuildingOffice2 className="w-6 h-6" />
            </motion.div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-bold tracking-tight text-[var(--text-main)]">
                  Nestly
                </span>
                <span className="text-[10px] font-semibold tracking-wider px-1.5 py-0.5 rounded-full bg-teal-500/20 text-teal-500 dark:text-teal-300 border border-teal-500/30 flex items-center gap-0.5">
                  <HiSparkles className="w-3 h-3 text-amber-500" /> AI
                </span>
              </div>
            </div>
          </Link>

          {/* Clean Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 bg-[var(--bg-card-subtle)] p-1.5 rounded-full border border-[var(--border-color)]">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                  isActive(link.href)
                    ? "bg-teal-600 text-white shadow-sm"
                    : "text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-teal-500/10"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* User Auth Controls & Profile Dropdown */}
          <div className="hidden md:flex items-center gap-3">
            {/* Dark/Light Theme Toggle Button */}
            <motion.button
              whileTap={{ scale: 0.9, rotate: 15 }}
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--border-color)] text-[var(--text-main)] hover:border-teal-500/50 transition-all"
              title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label="Toggle Theme"
            >
              {mounted && theme === "dark" ? (
                <HiSun className="w-5 h-5 text-amber-400" />
              ) : (
                <HiMoon className="w-5 h-5 text-teal-600" />
              )}
            </motion.button>

            {isPending ? (
              <div className="w-24 h-9 bg-[var(--bg-card-subtle)] animate-pulse rounded-lg" />
            ) : user ? (
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost border border-[var(--border-color)] bg-[var(--bg-card-subtle)] hover:bg-[var(--bg-card)] text-[var(--text-main)] rounded-xl gap-2 px-3"
                >
                  <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center text-white font-semibold">
                    {user.name ? user.name[0].toUpperCase() : "U"}
                  </div>
                  <span className="max-w-[120px] truncate text-sm font-medium">
                    {user.name || "User"}
                  </span>
                  <ChevronDown className="w-4 h-4 text-[var(--text-muted)]" />
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu p-2 shadow-xl bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl w-60 mt-2 text-[var(--text-main)] z-50"
                >
                  <li className="px-3 py-2 border-b border-[var(--border-color)]">
                    <p className="font-semibold text-[var(--text-main)] truncate">{user.name}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-[var(--text-muted)] truncate">{user.email}</p>
                      <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-teal-500/20 text-teal-500 uppercase">
                        {user.role || "buyer"}
                      </span>
                    </div>
                  </li>
                  <li>
                    <Link href="/dashboard" className="py-2.5 hover:bg-[var(--bg-card-subtle)] rounded-xl flex items-center gap-2">
                      <HiSquares2X2 className="w-4 h-4 text-teal-500" /> My Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link href="/items/add" className="py-2.5 hover:bg-[var(--bg-card-subtle)] rounded-xl flex items-center gap-2">
                      <Plus className="w-4 h-4 text-amber-500" /> Add Property
                    </Link>
                  </li>
                  <li className="border-t border-[var(--border-color)] mt-1 pt-1">
                    <button
                      onClick={handleLogout}
                      className="py-2.5 text-red-500 hover:bg-red-500/10 rounded-xl flex items-center gap-2"
                    >
                      <HiArrowRightOnRectangle className="w-4 h-4" /> Log Out
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
                >
                  Sign In
                </Link>
                <motion.div whileTap={{ scale: 0.96 }}>
                  <Link
                    href="/register"
                    className="btn btn-sm bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-500 hover:to-teal-600 border-none text-white font-medium rounded-xl px-5 shadow-md shadow-teal-900/30"
                  >
                    Get Started
                  </Link>
                </motion.div>
              </>
            )}
          </div>

          {/* Mobile Menu Button + Theme Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.9, rotate: 15 }}
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--border-color)] text-[var(--text-main)]"
              aria-label="Toggle Theme"
            >
              {mounted && theme === "dark" ? (
                <HiSun className="w-5 h-5 text-amber-400" />
              ) : (
                <HiMoon className="w-5 h-5 text-teal-600" />
              )}
            </motion.button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--border-color)] text-[var(--text-main)]"
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
                    d="M6 18L18 6"
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
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-[var(--bg-main)] border-b border-[var(--border-color)] px-4 pt-3 pb-6 space-y-3 overflow-hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                  isActive(link.href)
                    ? "bg-teal-600 text-white"
                    : "text-[var(--text-muted)] hover:bg-[var(--bg-card-subtle)] hover:text-[var(--text-main)]"
                }`}
              >
                {link.name}
              </Link>
            ))}
            {user ? (
              <div className="pt-4 border-t border-[var(--border-color)] flex flex-col gap-2.5">
                <div className="px-4 py-2">
                  <p className="font-semibold text-[var(--text-main)]">{user.name}</p>
                  <p className="text-xs text-[var(--text-muted)]">{user.email}</p>
                </div>
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-3 rounded-xl text-white bg-teal-600 font-medium flex items-center justify-center gap-2"
                >
                  <HiSquares2X2 className="w-5 h-5" /> My Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-center py-3 rounded-xl text-red-500 bg-red-500/10 font-medium flex items-center justify-center gap-2"
                >
                  <HiArrowRightOnRectangle className="w-5 h-5" /> Log Out
                </button>
              </div>
            ) : (
              <div className="pt-4 border-t border-[var(--border-color)] flex flex-col gap-2.5">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-3 rounded-xl text-[var(--text-main)] bg-[var(--bg-card-subtle)] font-medium"
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
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

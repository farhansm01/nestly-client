"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAuth } from "@/components/providers/AuthProvider";
import { useTheme } from "@/components/providers/ThemeProvider";
import { authClient } from "@/lib/auth-client";
import {
  HiBuildingOffice2,
  HiSparkles,
  HiSquares2X2,
  HiHeart,
  HiDocumentText,
  HiPlusCircle,
  HiUsers,
  HiChartBar,
  HiCog6Tooth,
  HiSun,
  HiMoon,
  HiArrowRightOnRectangle,
  HiListBullet,
} from "react-icons/hi2";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth();
  const { theme, toggleTheme, mounted } = useTheme();

  const userRole = user?.role || "buyer";

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      toast.success("Logged out successfully");
      router.push("/login");
      router.refresh();
    } catch (err) {
      toast.error(err.message || "Logout failed");
    }
  };

  // Define sidebar links based on role
  let navItems = [];
  if (userRole === "admin") {
    navItems = [
      { name: "Overview", href: "/dashboard/admin", icon: HiSquares2X2 },
      { name: "Manage Listings", href: "/dashboard/manage", icon: HiListBullet },
      { name: "Add Property", href: "/dashboard/add", icon: HiPlusCircle },
      { name: "Saved Homes", href: "/dashboard/saved", icon: HiHeart },
      { name: "Explore All", href: "/items", icon: HiBuildingOffice2 },
    ];
  } else if (userRole === "seller" || userRole === "agent") {
    navItems = [
      { name: "Overview", href: "/dashboard/seller", icon: HiSquares2X2 },
      { name: "Manage Listings", href: "/dashboard/manage", icon: HiListBullet },
      { name: "Add Property", href: "/dashboard/add", icon: HiPlusCircle },
      { name: "Saved Homes", href: "/dashboard/saved", icon: HiHeart },
      { name: "Explore All", href: "/items", icon: HiBuildingOffice2 },
    ];
  } else {
    // Default Buyer (No Add Property or Manage Listings)
    navItems = [
      { name: "Overview", href: "/dashboard/buyer", icon: HiSquares2X2 },
      { name: "Saved Homes", href: "/dashboard/saved", icon: HiHeart },
      { name: "Explore All", href: "/items", icon: HiBuildingOffice2 },
    ];
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[var(--bg-main)] text-[var(--text-main)] transition-colors duration-300">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-[var(--bg-card)] border-r border-[var(--border-color)] flex flex-col justify-between shrink-0 p-5 shadow-xl">
        <div className="space-y-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-600 to-amber-500 flex items-center justify-center text-white shadow-md">
              <HiBuildingOffice2 className="w-6 h-6" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-bold tracking-tight text-[var(--text-main)]">
                Nestly
              </span>
              <span className="text-[10px] font-semibold tracking-wider px-1.5 py-0.5 rounded-full bg-teal-500/20 text-teal-500 border border-teal-500/30 flex items-center gap-0.5">
                <HiSparkles className="w-3 h-3 text-amber-500" /> AI
              </span>
            </div>
          </Link>

          {/* User Profile Card in Sidebar */}
          {user && (
            <div className="p-3.5 rounded-2xl bg-[var(--bg-card-subtle)] border border-[var(--border-color)] flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center text-white font-bold text-base shadow-sm">
                {user.name ? user.name[0].toUpperCase() : "U"}
              </div>
              <div className="overflow-hidden">
                <p className="font-bold text-sm text-[var(--text-main)] truncate">
                  {user.name || "User"}
                </p>
                <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-500/15 text-teal-500 border border-teal-500/30 uppercase tracking-wider mt-0.5">
                  {userRole}
                </span>
              </div>
            </div>
          )}

          {/* Nav Items */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                    isActive
                      ? "bg-teal-600 text-white shadow-md shadow-teal-900/30"
                      : "text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-card-subtle)]"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Controls */}
        <div className="pt-6 border-t border-[var(--border-color)] space-y-3 mt-6">
          <button
            onClick={toggleTheme}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--border-color)] text-xs font-semibold text-[var(--text-main)]"
          >
            <span>Theme Mode</span>
            {mounted && theme === "dark" ? (
              <HiSun className="w-4 h-4 text-amber-400" />
            ) : (
              <HiMoon className="w-4 h-4 text-teal-600" />
            )}
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-red-500 bg-red-500/10 font-semibold text-xs hover:bg-red-500/20 transition-colors"
          >
            <HiArrowRightOnRectangle className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Workspace */}
      <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}

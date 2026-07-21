"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { authClient } from "@/lib/auth-client";
import GoogleLoginButton from "@/components/auth/GoogleLoginButton";
import { HiBuildingOffice2, HiEye, HiEyeSlash, HiSparkles, HiKey } from "react-icons/hi2";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setErrorMsg("");

    if (!email || !password) {
      setErrorMsg("Please fill in both email and password.");
      return;
    }

    try {
      setLoading(true);
      const res = await authClient.signIn.email({
        email,
        password,
      });

      if (res?.error) {
        setErrorMsg(res.error.message || "Invalid credentials.");
        toast.error(res.error.message || "Login failed");
      } else {
        toast.success("Signed in successfully!");
        router.push("/");
        router.refresh();
      }
    } catch (err) {
      setErrorMsg(err.message || "An unexpected error occurred.");
      toast.error(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    const demoEmail = "demo@nestly.com";
    const demoPassword = "demo1234";

    setEmail(demoEmail);
    setPassword(demoPassword);
    setErrorMsg("");
    toast.success("Demo credentials loaded!");

    try {
      setLoading(true);
      const res = await authClient.signIn.email({
        email: demoEmail,
        password: demoPassword,
      });

      if (res?.error) {
        setErrorMsg(res.error.message || "Invalid demo credentials.");
        toast.error(res.error.message || "Demo login failed");
      } else {
        toast.success("Signed in as Demo User!");
        router.push("/");
        router.refresh();
      }
    } catch (err) {
      setErrorMsg(err.message || "Unexpected error during demo login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-[var(--bg-main)] py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 bg-[var(--bg-card)] p-8 sm:p-10 rounded-3xl border border-[var(--border-color)] shadow-2xl"
      >
        {/* Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-600 to-amber-500 flex items-center justify-center text-white shadow-md">
              <HiBuildingOffice2 className="w-6 h-6" />
            </div>
            <span className="text-2xl font-bold text-[var(--text-main)]">Nestly</span>
          </Link>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-main)] mt-2">
            Welcome Back
          </h2>
          <p className="text-sm text-[var(--text-muted)]">
            Sign in to manage listings and access your AI dashboard
          </p>
        </div>

        {/* Quick Demo Login Banner */}
        <div className="p-4 rounded-2xl bg-teal-500/10 border border-teal-500/30 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-teal-500">
              <HiSparkles className="w-4 h-4 text-amber-500" />
              <span>1-Click Demo Login</span>
            </div>
            <span className="text-[10px] font-mono text-[var(--text-muted)]">demo@nestly.com</span>
          </div>

          <button
            type="button"
            onClick={handleDemoLogin}
            disabled={loading}
            className="w-full btn btn-xs sm:btn-sm bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 text-white font-bold rounded-xl border-none shadow-md flex items-center justify-center gap-2"
          >
            <HiKey className="w-4 h-4" />
            <span>Auto-Fill & Sign In with Demo Account</span>
          </button>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-sm font-medium">
            {errorMsg}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2">
              Email Address
            </label>
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[var(--bg-card-subtle)] border border-[var(--border-color)] text-[var(--text-main)] text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-teal-500 transition-colors"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                Password
              </label>
              <a href="#" className="text-xs text-teal-500 hover:underline">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[var(--bg-card-subtle)] border border-[var(--border-color)] text-[var(--text-main)] text-sm rounded-xl px-4 py-3 pr-11 focus:outline-none focus:border-teal-500 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-main)] p-1 rounded-lg transition-colors"
                title={showPassword ? "Hide password" : "Show password"}
                aria-label="Toggle password visibility"
              >
                {showPassword ? (
                  <HiEyeSlash className="w-5 h-5" />
                ) : (
                  <HiEye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={loading}
            className="w-full btn bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl py-3 border-none shadow-lg shadow-teal-900/30"
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm" />
            ) : (
              "Sign In"
            )}
          </motion.button>
        </form>

        {/* Divider */}
        <div className="relative flex items-center justify-center my-6">
          <div className="border-t border-[var(--border-color)] w-full" />
          <span className="bg-[var(--bg-card)] px-3 text-xs text-[var(--text-muted)] uppercase tracking-wider absolute">
            Or continue with
          </span>
        </div>

        {/* Social Auth */}
        <GoogleLoginButton label="Sign In with Google" />

        {/* Register Link */}
        <p className="text-center text-sm text-[var(--text-muted)]">
          Don't have an account?{" "}
          <Link href="/register" className="font-semibold text-teal-500 hover:underline">
            Create an account
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

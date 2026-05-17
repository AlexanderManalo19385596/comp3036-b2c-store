"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { StoreNav } from "../components/StoreNav";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      localStorage.setItem("user", JSON.stringify({ email, name }));
      router.push("/store");
    }, 800);
  };

  return (
    <div className="min-h-screen bg-wsu-cream font-serif">
      <StoreNav cartCount={0} />

      <div className="max-w-md mx-auto px-6 mt-16">

        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-wsu-red text-xs font-bold tracking-widest uppercase mb-2">
            Create Account
          </p>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Register</h1>
          <p className="text-gray-500 text-sm mt-2">
            Already have an account?{" "}
            <Link href="/store/login" className="text-wsu-red font-semibold no-underline">
              Sign In
            </Link>
          </p>
        </div>

        {/* Form card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8">
          <form onSubmit={handleSubmit}>

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-5 text-red-600 text-sm font-medium">
                {error}
              </div>
            )}

            {/* Name */}
            <div className="mb-5">
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alex M"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none bg-gray-50"
              />
            </div>

            {/* Email */}
            <div className="mb-5">
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none bg-gray-50"
              />
            </div>

            {/* Password */}
            <div className="mb-5">
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none bg-gray-50"
              />
            </div>

            {/* Confirm Password */}
            <div className="mb-6">
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none bg-gray-50"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3.5 rounded-xl font-bold text-base text-white border-none transition-all ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-wsu-red cursor-pointer hover:opacity-90"
              }`}
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>

          </form>
        </div>

        {/* Back to store */}
        <p className="text-center mt-6">
          <Link href="/store" className="text-gray-500 no-underline text-sm">
            ← Back to Store
          </Link>
        </p>
      </div>
    </div>
  );
}
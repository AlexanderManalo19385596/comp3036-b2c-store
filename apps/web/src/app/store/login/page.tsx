"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { StoreNav } from "../components/StoreNav";

const MOCK_USER = {
  email: "user@techstore.com",
  password: "password123",
  name: "Alex",
};

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      if (email.trim() === MOCK_USER.email && password === MOCK_USER.password) {
        localStorage.setItem("user", JSON.stringify({ email: MOCK_USER.email, name: MOCK_USER.name }));
        router.push("/store");
      } else {
        setError("Invalid email or password.");
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-wsu-cream font-serif">
      <StoreNav cartCount={0} />

      <div className="max-w-md mx-auto px-6 mt-16">

        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-wsu-red text-xs font-bold tracking-widest uppercase mb-2">
            Welcome Back
          </p>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Sign In</h1>
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

            {/* Email */}
            <div className="mb-5">
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@techstore.com"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none bg-gray-50"
              />
            </div>

            {/* Password */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-semibold text-gray-700">Password</label>
                <Link href="#" className="text-xs text-wsu-red no-underline">
                  Forgot password?
                </Link>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              {loading ? "Signing in..." : "Sign In"}
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
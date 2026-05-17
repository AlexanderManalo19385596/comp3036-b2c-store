"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const MOCK_ADMIN = {
  email: "admin@techstore.com",
  password: "admin123",
  name: "Admin",
};

export default function AdminLoginPage() {
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
      if (email.trim() === MOCK_ADMIN.email && password === MOCK_ADMIN.password) {
        localStorage.setItem("admin", JSON.stringify({ email: MOCK_ADMIN.email, name: MOCK_ADMIN.name }));
        router.push("/store");
      } else {
        setError("Invalid email or password.");
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-wsu-cream font-serif flex items-center justify-center px-6">
      <div className="w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-wsu-red text-xs font-bold tracking-widest uppercase mb-2">
            Admin Access
          </p>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Tech<span className="text-wsu-red">Store</span> Admin
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            Sign in to manage your store
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

            {/* Email */}
            <div className="mb-5">
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@techstore.com"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none bg-gray-50"
              />
            </div>

            {/* Password */}
            <div className="mb-6">
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
      </div>
    </div>
  );
}
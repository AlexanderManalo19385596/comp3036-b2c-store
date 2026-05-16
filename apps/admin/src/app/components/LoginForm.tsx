"use client";

import { useState } from "react";

export function LoginForm() {
  const [error, setError] = useState(false);
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      window.location.href = "/";
    } else {
      setError(true);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Sign in to your account</h2>
        </div>
        {error && (
          <p className="text-red-500 text-sm mb-4 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
            Wrong password. Try again.
          </p>
        )}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1.5">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 bg-white focus:outline-none focus:border-gray-400 transition-colors"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold text-sm transition-colors mt-2"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
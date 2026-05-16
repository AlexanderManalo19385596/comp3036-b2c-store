"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type StoreNavProps = {
  cartCount: number;
};

type User = {
  email: string;
  name: string;
};

export function StoreNav({ cartCount }: StoreNavProps) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("user");
    setUser(null);
    router.push("/store");
  };

  return (
    <nav className="border-b border-stone-200 bg-white sticky top-0 z-50 px-8 h-16 flex items-center justify-between">
      {/* Brand */}
      <Link href="/store" className="font-bold text-lg tracking-tight text-gray-900 no-underline">
        Tech<span className="text-wsu-red">Store</span>
      </Link>

      {/* Right */}
      <div className="flex items-center gap-4">
        {/* Cart */}
        <Link
          href="/store/cart"
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold no-underline transition-all ${
            cartCount > 0
              ? "bg-wsu-red text-white"
              : "border border-gray-300 text-gray-700"
          }`}
        >
          🛒 Cart {cartCount > 0 && `(${cartCount})`}
        </Link>

        {/* Auth */}
        {user ? (
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">Hi, {user.name}</span>
            <button
              onClick={handleSignOut}
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-700 cursor-pointer font-semibold bg-white"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <Link href="/store/login" className="text-gray-500 no-underline text-sm font-semibold">
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}
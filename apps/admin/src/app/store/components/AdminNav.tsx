"use client";

import { useRouter } from "next/navigation";

export function AdminNav() {
  const router = useRouter();

  const handleSignOut = () => {
    localStorage.removeItem("admin");
    router.push("/store/login");
  };

  return (
    <nav className="border-b border-stone-200 bg-white sticky top-0 z-50 px-8 h-16 flex items-center justify-between">
      <span className="font-bold text-lg tracking-tight text-gray-900">
        Tech<span className="text-wsu-red">Store</span>
        <span className="text-gray-400 text-sm font-normal ml-2">Admin</span>
      </span>
      <button
        onClick={handleSignOut}
        aria-label="Sign out of admin"
        className="border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-700 cursor-pointer font-semibold bg-white hover:bg-gray-50 transition-all"
      >
        Sign Out
      </button>
    </nav>
  );
}
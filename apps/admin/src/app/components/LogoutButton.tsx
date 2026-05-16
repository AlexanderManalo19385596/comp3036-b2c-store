"use client";

export function LogoutButton() {
  const handleLogout = async () => {
    await fetch("/api/auth", { method: "DELETE" });
    window.location.href = "/";
  };

  return (
    <button onClick={handleLogout} className="bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg font-semibold text-sm border border-gray-300 transition-colors cursor-pointer">
      Logout
    </button>
  );
}
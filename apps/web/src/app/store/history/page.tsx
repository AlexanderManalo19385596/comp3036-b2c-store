"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { StoreNav } from "../components/StoreNav";

type OrderItem = {
  name: string;
  quantity: number;
  price: number;
};

type Order = {
  id: string;
  date: string;
  status: "Delivered" | "Processing" | "Shipped";
  items: OrderItem[];
  total: number;
};

const statusColor: Record<string, string> = {
  Delivered: "bg-green-50 text-green-700 border-green-200",
  Shipped: "bg-blue-50 text-blue-700 border-blue-200",
  Processing: "bg-orange-50 text-orange-700 border-orange-200",
};

export default function HistoryPage() {
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));

    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      const cart = JSON.parse(storedCart);
      setCartCount(Object.values(cart).reduce((a: number, b) => a + (b as number), 0));
    }

    const token = localStorage.getItem("token");
    if (token) {
      fetch("/api/orders", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((r) => r.json())
        .then(setOrders)
        .catch(console.error)
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-wsu-cream font-serif">
      <StoreNav cartCount={cartCount} />

      <div className="max-w-3xl mx-auto px-8 py-12">

        {/* Header */}
        <div className="mb-8">
          <p className="text-wsu-red text-xs font-bold tracking-widest uppercase mb-2">
            Your Orders
          </p>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Purchase History
          </h1>
          {user && (
            <p className="text-gray-500 text-sm mt-2">
              Showing orders for {user.name}
            </p>
          )}
        </div>

        {/* Not logged in */}
        {!user && (
          <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center">
            <p className="text-5xl mb-4">🔒</p>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Sign in to view your orders</h2>
            <p className="text-gray-500 mb-8">You need to be logged in to see your purchase history.</p>
            <Link href="/store/login" className="bg-wsu-red text-white px-8 py-3 rounded-lg no-underline font-semibold text-sm">
              Sign In
            </Link>
          </div>
        )}

        {/* Loading */}
        {user && loading && (
          <div className="text-center py-12 text-gray-400">
            Loading orders...
          </div>
        )}

        {/* No orders */}
        {user && !loading && orders.length === 0 && (
          <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center">
            <p className="text-5xl mb-4">📦</p>
            <h2 className="text-xl font-bold text-gray-900 mb-2">No orders yet</h2>
            <p className="text-gray-500 mb-8">You haven't placed any orders yet.</p>
            <Link href="/store" className="bg-wsu-red text-white px-8 py-3 rounded-lg no-underline font-semibold text-sm">
              Start Shopping
            </Link>
          </div>
        )}

        {/* Orders list */}
        {user && !loading && orders.length > 0 && (
          <div className="flex flex-col gap-4">
            {orders.map((order) => (
              <div key={order.id} className="bg-white border border-gray-200 rounded-2xl p-6">

                {/* Order header */}
                <div className="flex justify-between items-start mb-4 pb-4 border-b border-gray-100">
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{order.id}</p>
                    <p className="text-gray-500 text-xs mt-0.5">{order.date}</p>
                  </div>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${statusColor[order.status]}`}>
                    {order.status}
                  </span>
                </div>

                {/* Order items */}
                <div className="flex flex-col gap-2 mb-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400 text-xs">×{item.quantity}</span>
                        <span className="text-gray-700 text-sm">{item.name}</span>
                      </div>
                      <span className="text-gray-500 text-sm">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                {/* Order total */}
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <span className="text-gray-500 text-sm">Total</span>
                  <span className="font-extrabold text-gray-900">${order.total.toFixed(2)}</span>
                </div>

              </div>
            ))}
          </div>
        )}

        {/* Back to store */}
        <p className="text-center mt-8">
          <Link href="/store" className="text-gray-500 no-underline text-sm">
            ← Back to Store
          </Link>
        </p>
      </div>
    </div>
  );
}
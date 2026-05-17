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

const MOCK_ORDERS: Order[] = [
  {
    id: "ORD-001",
    date: "12 May 2025",
    status: "Delivered",
    items: [
      { name: "MacBook Pro Stand", quantity: 1, price: 49.99 },
      { name: "Mechanical Keyboard", quantity: 1, price: 129.99 },
    ],
    total: 179.98,
  },
  {
    id: "ORD-002",
    date: "28 Apr 2025",
    status: "Delivered",
    items: [
      { name: "Wireless Mouse", quantity: 2, price: 44.99 },
      { name: "XL Desk Mat", quantity: 1, price: 34.99 },
    ],
    total: 124.97,
  },
  {
    id: "ORD-003",
    date: "2 May 2025",
    status: "Shipped",
    items: [
      { name: "USB-C Hub 7-in-1", quantity: 1, price: 59.99 },
    ],
    total: 59.99,
  },
  {
    id: "ORD-004",
    date: "14 May 2025",
    status: "Processing",
    items: [
      { name: "Monitor Light Bar", quantity: 1, price: 39.99 },
      { name: "Cable Management Kit", quantity: 2, price: 24.99 },
    ],
    total: 89.97,
  },
];

const statusColor: Record<Order["status"], string> = {
  Delivered: "bg-green-50 text-green-700 border-green-200",
  Shipped: "bg-blue-50 text-blue-700 border-blue-200",
  Processing: "bg-orange-50 text-orange-700 border-orange-200",
};

export default function HistoryPage() {
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));

    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      const cart = JSON.parse(storedCart);
      setCartCount(Object.values(cart).reduce((a: number, b) => a + (b as number), 0));
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

        {/* Orders list */}
        {user && (
          <div className="flex flex-col gap-4">
            {MOCK_ORDERS.map((order) => (
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
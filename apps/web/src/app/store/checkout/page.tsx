"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { StoreNav } from "../components/StoreNav";
import { OrderDetails } from "./components/OrderDetails";
import { PaymentForm } from "./components/PaymentForm";
import { PRODUCTS } from "../data";

type CartItem = {
  name: string;
  quantity: number;
  price: number;
};

export default function CheckoutPage() {
  const [cart, setCart] = useState<Record<number, number>>({});
  const [loading, setLoading] = useState(false);
  const [paid, setPaid] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) setCart(JSON.parse(stored));
  }, []);

  const cartItems: CartItem[] = Object.entries(cart)
    .map(([id, quantity]) => {
      const product = PRODUCTS.find((p) => p.id === Number(id));
      return product ? { name: product.name, quantity, price: product.price } : null;
    })
    .filter((item): item is CartItem => item !== null);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);

  const handlePay = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setPaid(true);
      localStorage.removeItem("cart");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-wsu-cream font-serif">
      <StoreNav cartCount={cartCount} />

      <div className="max-w-4xl mx-auto px-8 py-12">

        {/* Header */}
        <div className="mb-8">
          <p className="text-wsu-red text-xs font-bold tracking-widest uppercase mb-2">
            Checkout
          </p>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            {paid ? "Order Confirmed!" : "Complete Your Order"}
          </h1>
        </div>

        {/* Success state */}
        {paid && (
          <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center">
            <p className="text-5xl mb-4">✅</p>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
            <p className="text-gray-500 mb-2">Thank you for your order.</p>
            <p className="text-gray-400 text-sm mb-8">
              Order confirmation has been sent to your email.
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/store/history"
                className="bg-wsu-red text-white px-8 py-3 rounded-lg no-underline font-semibold text-sm"
              >
                View Orders
              </Link>
              <Link
                href="/store"
                className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg no-underline font-semibold text-sm"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        )}

        {/* Empty cart */}
        {!paid && cartItems.length === 0 && (
          <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center">
            <p className="text-5xl mb-4">🛒</p>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-8">Add some products before checking out.</p>
            <Link href="/store" className="bg-wsu-red text-white px-8 py-3 rounded-lg no-underline font-semibold text-sm">
              Browse Products
            </Link>
          </div>
        )}

        {/* Checkout layout */}
        {!paid && cartItems.length > 0 && (
          <div className="grid grid-cols-2 gap-6">
            <PaymentForm onPay={handlePay} loading={loading} />
            <OrderDetails items={cartItems} total={total} />
          </div>
        )}

      </div>
    </div>
  );
}
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { StoreNav } from "../components/StoreNav";
import { CartItem } from "./components/CartItem";
import { OrderSummary } from "./components/OrderSummary";
import { PRODUCTS } from "../data";
import type { Product } from "../types";

type CartItemType = {
  product: Product;
  quantity: number;
};

export default function CartPage() {
  const [cart, setCart] = useState<Record<number, number>>({});
  const [checkedOut, setCheckedOut] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) setCart(JSON.parse(stored));
  }, []);

  const updateCart = (newCart: Record<number, number>) => {
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const increaseQuantity = (productId: number) => {
    updateCart({ ...cart, [productId]: (cart[productId] ?? 0) + 1 });
  };

  const decreaseQuantity = (productId: number) => {
    const currentQty = cart[productId] ?? 0;
    if (currentQty <= 1) {
      const newCart = { ...cart };
      delete newCart[productId];
      updateCart(newCart);
    } else {
      updateCart({ ...cart, [productId]: currentQty - 1 });
    }
  };

  const removeItem = (productId: number) => {
    const newCart = { ...cart };
    delete newCart[productId];
    updateCart(newCart);
  };

  const handleCheckout = () => {
    localStorage.removeItem("cart");
    setCart({});
    setCheckedOut(true);
  };

  const cartItems: CartItemType[] = Object.entries(cart)
    .map(([id, quantity]) => {
      const product = PRODUCTS.find((p) => p.id === Number(id));
      return product ? { product, quantity } : null;
    })
    .filter((item): item is CartItemType => item !== null);

  const total = cartItems.reduce(
    (sum, { product, quantity }) => sum + product.price * quantity,
    0
  );

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen bg-wsu-cream font-serif">
      <StoreNav cartCount={cartCount} />

      <div className="max-w-3xl mx-auto px-8 py-12">

        {/* Header */}
        <div className="mb-8">
          <p className="text-wsu-red text-xs font-bold tracking-widest uppercase mb-2">
            Your Cart
          </p>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            {checkedOut ? "Order Placed!" : `${cartCount} item${cartCount !== 1 ? "s" : ""}`}
          </h1>
        </div>

        {/* Checkout success */}
        {checkedOut && (
          <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center">
            <p className="text-5xl mb-4">✅</p>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank you for your order!</h2>
            <p className="text-gray-500 mb-8">Your order has been placed successfully.</p>
            <Link href="/store" className="bg-wsu-red text-white px-8 py-3 rounded-lg no-underline font-semibold text-sm">
              Continue Shopping
            </Link>
          </div>
        )}

        {/* Empty cart */}
        {!checkedOut && cartItems.length === 0 && (
          <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center">
            <p className="text-5xl mb-4">🛒</p>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-8">Add some products to get started.</p>
            <Link href="/store" className="bg-wsu-red text-white px-8 py-3 rounded-lg no-underline font-semibold text-sm">
              Browse Products
            </Link>
          </div>
        )}

        {/* Cart items + summary */}
        {!checkedOut && cartItems.length > 0 && (
          <div className="flex flex-col gap-4">
            {cartItems.map(({ product, quantity }) => (
              <CartItem
                key={product.id}
                product={product}
                quantity={quantity}
                onIncrease={increaseQuantity}
                onDecrease={decreaseQuantity}
                onRemove={removeItem}
              />
            ))}
            <OrderSummary
              total={total}
              cartCount={cartCount}
              onCheckout={handleCheckout}
            />
          </div>
        )}
      </div>
    </div>
  );
}
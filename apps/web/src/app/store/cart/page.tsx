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
    <div style={{ minHeight: "100vh", background: "#f0ede8", fontFamily: "'Georgia', serif" }}>
      <StoreNav cartCount={cartCount} />

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "3rem 2rem" }}>

        <div style={{ marginBottom: "2rem" }}>
          <p style={{
            color: "#a31631",
            fontSize: "0.75rem",
            fontWeight: "700",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: "0.5rem",
          }}>
            Your Cart
          </p>
          <h1 style={{
            fontSize: "2.5rem",
            fontWeight: "800",
            color: "#111827",
            letterSpacing: "-0.03em",
          }}>
            {checkedOut ? "Order Placed!" : `${cartCount} item${cartCount !== 1 ? "s" : ""}`}
          </h1>
        </div>

        {checkedOut && (
          <div style={{
            background: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "16px",
            padding: "3rem",
            textAlign: "center",
          }}>
            <p style={{ fontSize: "3rem", marginBottom: "1rem" }}>✅</p>
            <h2 style={{ fontSize: "1.5rem", fontWeight: "700", color: "#111827", marginBottom: "0.5rem" }}>
              Thank you for your order!
            </h2>
            <p style={{ color: "#6b7280", marginBottom: "2rem" }}>
              Your order has been placed successfully.
            </p>
            <Link href="/store" style={{
              background: "#a31631",
              color: "white",
              padding: "0.75rem 2rem",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: "600",
              fontSize: "0.9rem",
            }}>
              Continue Shopping
            </Link>
          </div>
        )}

        {!checkedOut && cartItems.length === 0 && (
          <div style={{
            background: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "16px",
            padding: "3rem",
            textAlign: "center",
          }}>
            <p style={{ fontSize: "3rem", marginBottom: "1rem" }}>🛒</p>
            <h2 style={{ fontSize: "1.2rem", fontWeight: "700", color: "#111827", marginBottom: "0.5rem" }}>
              Your cart is empty
            </h2>
            <p style={{ color: "#6b7280", marginBottom: "2rem" }}>
              Add some products to get started.
            </p>
            <Link href="/store" style={{
              background: "#a31631",
              color: "white",
              padding: "0.75rem 2rem",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: "600",
              fontSize: "0.9rem",
            }}>
              Browse Products
            </Link>
          </div>
        )}

        {!checkedOut && cartItems.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
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
"use client";

import { useState } from "react";
import { StoreNav } from "./components/StoreNav";
import { SearchBar } from "./components/SearchBar";
import { CategoryFilter } from "./components/CategoryFilter";
import { ProductCard } from "./components/ProductCard";
import type { Product } from "./types";

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "MacBook Pro Stand",
    description: "Aluminium laptop stand with ergonomic tilt for improved posture and airflow.",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400",
    category: "Accessories",
    stock: 12,
  },
  {
    id: 2,
    name: "Mechanical Keyboard",
    description: "Compact TKL mechanical keyboard with tactile switches and RGB backlight.",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400",
    category: "Keyboards",
    stock: 8,
  },
  {
    id: 3,
    name: "USB-C Hub 7-in-1",
    description: "Expand your ports with HDMI 4K, 3x USB-A, SD card, and 100W PD charging.",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1616578273461-3a99ce422de6?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Accessories",
    stock: 20,
  },
  {
    id: 4,
    name: "4K Webcam",
    description: "Ultra HD webcam with autofocus, built-in mic, and privacy shutter.",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1623949556303-b0d17d198863?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Cameras",
    stock: 5,
  },
  {
    id: 5,
    name: "XL Desk Mat",
    description: "900x400mm premium stitched desk mat with non-slip rubber base.",
    price: 34.99,
    image: "https://plus.unsplash.com/premium_photo-1664699099191-f67e1f4aef40?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Accessories",
    stock: 30,
  },
  {
    id: 6,
    name: "Wireless Mouse",
    description: "Ergonomic wireless mouse with silent clicks and 12-month battery life.",
    price: 44.99,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400",
    category: "Mice",
    stock: 15,
  },
  {
    id: 7,
    name: "Monitor Light Bar",
    description: "Asymmetric screen light bar with auto-dimming and USB-C power.",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1618133030686-e1186525ebcc?q=80&w=1372&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Lighting",
    stock: 10,
  },
  {
    id: 8,
    name: "Cable Management Kit",
    description: "Complete cable management solution with clips, velcro, and cable box.",
    price: 24.99,
    image: "https://plus.unsplash.com/premium_photo-1732730224748-f25e801ce6cf?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Accessories",
    stock: 25,
  },
];

export default function StorePage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cart, setCart] = useState<{ [id: number]: number }>({});

  const filteredProducts = PRODUCTS.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (productId: number) => {
    setCart((prev) => ({ ...prev, [productId]: (prev[productId] || 0) + 1 }));
  };

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);

  return (
    <div style={{ minHeight: "100vh", background: "#f0ede8", fontFamily: "'Georgia', serif" }}>

      <StoreNav cartCount={cartCount} />

      <div style={{ padding: "4rem 2rem 2rem", maxWidth: "1200px", margin: "0 auto" }}>
        <p style={{
          color: "#a31631",
          fontSize: "0.75rem",
          fontWeight: "700",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          marginBottom: "0.75rem",
        }}>
          Premium Tech Accessories
        </p>
        <h1 style={{
          fontSize: "clamp(2rem, 5vw, 3.5rem)",
          fontWeight: "800",
          letterSpacing: "-0.03em",
          lineHeight: 1.1,
          marginBottom: "1rem",
          color: "#111827",
        }}>
          Upgrade Your Setup
        </h1>
        <p style={{ color: "#6b7280", fontSize: "1rem", maxWidth: "500px" }}>
          Handpicked accessories for developers, designers, and creators.
        </p>
      </div>

      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0 2rem 2rem",
        display: "flex",
        flexWrap: "wrap",
        gap: "1rem",
        alignItems: "center",
      }}>
        <SearchBar search={search} onSearch={setSearch} />
        <CategoryFilter selected={selectedCategory} onSelect={setSelectedCategory} />
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem 1rem" }}>
        <p style={{ color: "#9ca3af", fontSize: "0.8rem", fontWeight: "500" }}>
          {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0 2rem 4rem",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        gap: "1.5rem",
      }}>
        {filteredProducts.length === 0 && (
          <div style={{
            gridColumn: "1 / -1",
            textAlign: "center",
            padding: "4rem",
            color: "#9ca3af",
            background: "white",
            borderRadius: "16px",
            border: "1px solid #e5e7eb",
          }}>
            <p style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>◌</p>
            <p style={{ fontSize: "0.9rem" }}>No products found.</p>
          </div>
        )}

        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={addToCart}
          />
        ))}
      </div>
    </div>
  );
}
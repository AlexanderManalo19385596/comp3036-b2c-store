"use client";

import { useState } from "react";
import { useEffect } from "react";
import { StoreNav } from "./components/StoreNav";
import { SearchBar } from "./components/SearchBar";
import { CategoryFilter } from "./components/CategoryFilter";
import { ProductCard } from "./components/ProductCard";
import { PRODUCTS } from "./data";


export default function StorePage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cart, setCart] = useState<{ [id: number]: number }>({});

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) setCart(JSON.parse(stored));
  }, []);

  const filteredProducts = PRODUCTS.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (productId: number) => {
    setCart((prev) => {
      const newCart = { ...prev, [productId]: (prev[productId] || 0) + 1 };
      localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    });
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
"use client";

import { useState, useEffect } from "react";
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
    <div className="min-h-screen bg-wsu-cream font-serif">
      <StoreNav cartCount={cartCount} />

      {/* Hero */}
      <div className="max-w-7xl mx-auto px-8 pt-16 pb-8">
        <p className="text-wsu-red text-xs font-bold tracking-widest uppercase mb-3">
          Premium Tech Accessories
        </p>
        <h1 className="text-5xl font-extrabold tracking-tight leading-tight mb-4 text-gray-900">
          Upgrade Your Setup
        </h1>
        <p className="text-gray-500 text-base max-w-lg">
          Handpicked accessories for developers, designers, and creators.
        </p>
      </div>

      {/* Search + Filter */}
      <div className="max-w-7xl mx-auto px-8 pb-8 flex flex-wrap gap-4 items-center">
        <SearchBar search={search} onSearch={setSearch} />
        <CategoryFilter selected={selectedCategory} onSelect={setSelectedCategory} />
      </div>

      {/* Product count */}
      <div className="max-w-7xl mx-auto px-8 pb-4">
        <p className="text-gray-400 text-xs font-medium">
          {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Product grid */}
      <div className="max-w-7xl mx-auto px-8 pb-16 grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-6">
        {filteredProducts.length === 0 && (
          <div className="col-span-full text-center p-16 text-gray-400 bg-white rounded-2xl border border-gray-200">
            <p className="text-3xl mb-2">◌</p>
            <p className="text-sm">No products found.</p>
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
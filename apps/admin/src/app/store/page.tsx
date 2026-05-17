"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PRODUCTS, ORDERS, type Product } from "./data";
import { AdminNav } from "./components/AdminNav";
import { StatsBar } from "./components/StatsBar";
import { ProductsTable } from "./components/ProductsTable";
import { AddProductForm } from "./components/AddProductForm";
import { OrdersTable } from "./components/OrdersTable";

export default function AdminStorePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"products" | "orders">("products");
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    const admin = localStorage.getItem("admin");
    if (!admin) router.push("/store/login");
  }, [router]);

  const handleDelete = (id: number) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const handleAdd = (product: Product) => {
    setProducts([...products, product]);
    setShowAddForm(false);
  };

  const totalRevenue = ORDERS.reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="min-h-screen bg-wsu-cream font-serif">
      <AdminNav />

      <div className="max-w-6xl mx-auto px-8 py-12">

        {/* Header */}
        <div className="mb-8">
          <p className="text-wsu-red text-xs font-bold tracking-widest uppercase mb-2">
            Dashboard
          </p>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Store Management
          </h1>
        </div>

        {/* Stats */}
        <StatsBar
          totalProducts={products.length}
          outOfStock={products.filter((p) => p.stock === 0).length}
          totalOrders={ORDERS.length}
          totalRevenue={totalRevenue}
        />

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab("products")}
            className={`px-6 py-2.5 rounded-xl font-semibold text-sm cursor-pointer border transition-all ${
              activeTab === "products"
                ? "bg-wsu-red text-white border-wsu-red"
                : "bg-white text-gray-600 border-gray-200"
            }`}
          >
            Products
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`px-6 py-2.5 rounded-xl font-semibold text-sm cursor-pointer border transition-all ${
              activeTab === "orders"
                ? "bg-wsu-red text-white border-wsu-red"
                : "bg-white text-gray-600 border-gray-200"
            }`}
          >
            Orders
          </button>
        </div>

        {/* Products Tab */}
        {activeTab === "products" && (
          <div>
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="bg-wsu-red text-white px-6 py-2.5 rounded-xl font-semibold text-sm cursor-pointer hover:opacity-90 transition-all"
              >
                {showAddForm ? "Cancel" : "+ Add Product"}
              </button>
            </div>
            {showAddForm && (
              <AddProductForm
                onAdd={handleAdd}
                onCancel={() => setShowAddForm(false)}
                nextId={products.length + 1}
              />
            )}
            <ProductsTable products={products} onDelete={handleDelete} />
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && <OrdersTable orders={ORDERS} />}

      </div>
    </div>
  );
}
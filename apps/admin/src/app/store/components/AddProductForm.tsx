import { useState } from "react";
import type { Product } from "../data";

type AddProductFormProps = {
  onAdd: (product: Product) => void;
  onCancel: () => void;
  nextId: number;
};

export function AddProductForm({ onAdd, onCancel, nextId }: AddProductFormProps) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    image: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      id: nextId,
      name: form.name,
      description: form.description,
      price: parseFloat(form.price),
      category: form.category,
      stock: parseInt(form.stock),
      image: form.image || "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400",
    });
    setForm({ name: "", description: "", price: "", category: "", stock: "", image: "" });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6">
      <h3 className="font-bold text-gray-900 mb-4">Add New Product</h3>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Product name"
              required
              aria-label="Product name"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Category</label>
            <input
              type="text"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              placeholder="e.g. Accessories"
              required
              aria-label="Product category"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Price ($)</label>
            <input
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              placeholder="0.00"
              required
              aria-label="Product price"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Stock</label>
            <input
              type="number"
              value={form.stock}
              onChange={(e) => setForm({ ...form, stock: e.target.value })}
              placeholder="0"
              required
              aria-label="Product stock quantity"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none bg-gray-50"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Description</label>
            <input
              type="text"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Product description"
              required
              aria-label="Product description"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none bg-gray-50"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Image URL (optional)</label>
            <input
              type="text"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              placeholder="https://..."
              aria-label="Product image URL"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none bg-gray-50"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-wsu-red text-white px-6 py-2.5 rounded-xl font-semibold text-sm cursor-pointer hover:opacity-90"
          >
            Add Product
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-100 text-gray-700 px-6 py-2.5 rounded-xl font-semibold text-sm cursor-pointer hover:bg-gray-200"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
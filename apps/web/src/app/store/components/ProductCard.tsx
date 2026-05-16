import type { Product } from "../types";

type ProductCardProps = {
  product: Product;
  onAddToCart: (id: number) => void;
};

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const stockColor =
    product.stock === 0
      ? "text-red-600"
      : product.stock <= 4
      ? "text-orange-500"
      : "text-green-600";

  const stockText =
    product.stock === 0
      ? "Out of stock"
      : product.stock <= 4
      ? `Only ${product.stock} left!`
      : `${product.stock} in stock`;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all hover:shadow-md hover:border-wsu-red hover:-translate-y-0.5 cursor-pointer">
      {/* Image */}
      <div className="w-full h-44 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Category + Stock */}
        <div className="flex justify-between items-center mb-2">
          <span className="bg-red-50 text-wsu-red border border-red-200 text-xs font-semibold px-2 py-0.5 rounded-full">
            {product.category}
          </span>
          <span className={`text-xs font-semibold ${stockColor}`}>
            {stockText}
          </span>
        </div>

        {/* Name */}
        <h3 className="text-sm font-bold text-gray-900 mb-1 tracking-tight">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-xs text-gray-500 leading-relaxed mb-4">
          {product.description}
        </p>

        {/* Price + Button */}
        <div className="flex justify-between items-center">
          <span className="text-xl font-extrabold text-gray-900 tracking-tight">
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={() => onAddToCart(product.id)}
            disabled={product.stock === 0}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              product.stock === 0
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-wsu-red text-white cursor-pointer hover:opacity-90"
            }`}
          >
            {product.stock === 0 ? "Out of Stock" : "+ Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
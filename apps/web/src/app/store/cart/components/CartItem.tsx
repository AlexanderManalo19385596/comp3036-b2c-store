import type { Product } from "../../types";

type CartItemProps = {
  product: Product;
  quantity: number;
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
  onRemove: (id: number) => void;
};

export function CartItem({ product, quantity, onIncrease, onDecrease, onRemove }: CartItemProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 flex gap-4 items-center">
      {/* Image */}
      <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-sm text-gray-900 mb-1">{product.name}</h3>
        <p className="text-gray-500 text-xs">${product.price.toFixed(2)} each</p>
      </div>

      {/* Quantity controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => onDecrease(product.id)}
          className="w-7 h-7 rounded-full border border-gray-200 bg-white cursor-pointer flex items-center justify-center text-base"
        >
          −
        </button>
        <span className="font-bold min-w-[20px] text-center">{quantity}</span>
        <button
          onClick={() => onIncrease(product.id)}
          className="w-7 h-7 rounded-full border border-gray-200 bg-white cursor-pointer flex items-center justify-center text-base"
        >
          +
        </button>
      </div>

      {/* Item total */}
      <div className="text-right min-w-[80px]">
        <p className="font-extrabold text-base text-gray-900">
          ${(product.price * quantity).toFixed(2)}
        </p>
      </div>

      {/* Remove */}
      <button
        onClick={() => onRemove(product.id)}
        className="bg-transparent border-none text-gray-400 cursor-pointer text-lg p-1"
      >
        ✕
      </button>
    </div>
  );
}
import Link from "next/link";

type OrderSummaryProps = {
  total: number;
  cartCount: number;
  onCheckout: () => void;
};

export function OrderSummary({ total, cartCount, onCheckout }: OrderSummaryProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 mt-2">
      <h3 className="font-bold text-base text-gray-900 mb-4 pb-3 border-b border-gray-100">
        Order Summary
      </h3>

      <div className="flex justify-between mb-2">
        <span className="text-gray-500 text-sm">Subtotal ({cartCount} item{cartCount !== 1 ? "s" : ""})</span>
        <span className="font-semibold text-sm">${total.toFixed(2)}</span>
      </div>

      <div className="flex justify-between mb-6">
        <span className="text-gray-500 text-sm">Shipping</span>
        <span className="font-semibold text-sm text-green-600">Free</span>
      </div>

      <div className="flex justify-between pt-3 border-t border-gray-100 mb-6">
        <span className="font-extrabold text-lg text-gray-900">Total</span>
        <span className="font-extrabold text-lg text-gray-900">${total.toFixed(2)}</span>
      </div>

      <button
        onClick={onCheckout}
        className="w-full bg-wsu-red text-white border-none py-3.5 rounded-xl font-bold text-base cursor-pointer transition-opacity hover:opacity-90"
      >
        Complete Purchase
      </button>

      <Link href="/store" className="block text-center mt-3 text-gray-500 no-underline text-sm">
        ← Continue Shopping
      </Link>
    </div>
  );
}
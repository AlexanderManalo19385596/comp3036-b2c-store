type OrderItem = {
  name: string;
  quantity: number;
  price: number;
};

type OrderDetailsProps = {
  items: OrderItem[];
  total: number;
};

export function OrderDetails({ items, total }: OrderDetailsProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6">
      <h3 className="font-bold text-base text-gray-900 mb-4 pb-3 border-b border-gray-100">
        Order Summary
      </h3>

      <div className="flex flex-col gap-3 mb-4">
        {items.map((item, index) => (
          <div key={index} className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-xs">×{item.quantity}</span>
              <span className="text-gray-700 text-sm">{item.name}</span>
            </div>
            <span className="text-gray-500 text-sm font-semibold">
              ${(item.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      <div className="flex justify-between mb-2 pt-3 border-t border-gray-100">
        <span className="text-gray-500 text-sm">Shipping</span>
        <span className="text-green-600 text-sm font-semibold">Free</span>
      </div>

      <div className="flex justify-between pt-3 border-t border-gray-100">
        <span className="font-extrabold text-gray-900">Total</span>
        <span className="font-extrabold text-gray-900">${total.toFixed(2)}</span>
      </div>
    </div>
  );
}
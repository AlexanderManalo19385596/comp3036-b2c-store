type StatsBarProps = {
  totalProducts: number;
  outOfStock: number;
  totalOrders: number;
  totalRevenue: number;
};

export function StatsBar({ totalProducts, outOfStock, totalOrders, totalRevenue }: StatsBarProps) {
  return (
    <div className="grid grid-cols-4 gap-4 mb-8">
      <div className="bg-white border border-gray-200 rounded-2xl p-5">
        <p className="text-gray-500 text-xs font-semibold uppercase tracking-wide mb-1">Total Products</p>
        <p className="text-3xl font-extrabold text-gray-900">{totalProducts}</p>
      </div>
      <div className="bg-white border border-gray-200 rounded-2xl p-5">
        <p className="text-gray-500 text-xs font-semibold uppercase tracking-wide mb-1">Out of Stock</p>
        <p className="text-3xl font-extrabold text-red-600">{outOfStock}</p>
      </div>
      <div className="bg-white border border-gray-200 rounded-2xl p-5">
        <p className="text-gray-500 text-xs font-semibold uppercase tracking-wide mb-1">Total Orders</p>
        <p className="text-3xl font-extrabold text-gray-900">{totalOrders}</p>
      </div>
      <div className="bg-white border border-gray-200 rounded-2xl p-5">
        <p className="text-gray-500 text-xs font-semibold uppercase tracking-wide mb-1">Total Revenue</p>
        <p className="text-3xl font-extrabold text-green-600">${totalRevenue.toFixed(2)}</p>
      </div>
    </div>
  );
}
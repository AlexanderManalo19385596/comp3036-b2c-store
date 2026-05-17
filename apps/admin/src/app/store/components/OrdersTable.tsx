import type { Order } from "../data";

type OrdersTableProps = {
  orders: Order[];
};

const statusColor: Record<string, string> = {
  Delivered: "bg-green-50 text-green-700 border-green-200",
  Shipped: "bg-blue-50 text-blue-700 border-blue-200",
  Processing: "bg-orange-50 text-orange-700 border-orange-200",
};

export function OrdersTable({ orders }: OrdersTableProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Order</th>
            <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Customer</th>
            <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Items</th>
            <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Total</th>
            <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={order.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              <td className="px-6 py-4">
                <p className="font-semibold text-sm text-gray-900">{order.id}</p>
                <p className="text-xs text-gray-500">{order.date}</p>
              </td>
              <td className="px-6 py-4">
                <p className="font-semibold text-sm text-gray-900">{order.customer}</p>
                <p className="text-xs text-gray-500">{order.email}</p>
              </td>
              <td className="px-6 py-4 text-sm text-gray-600 max-w-[200px] truncate">
                {order.items}
              </td>
              <td className="px-6 py-4 font-bold text-sm text-gray-900">
                ${order.total.toFixed(2)}
              </td>
              <td className="px-6 py-4">
                <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${statusColor[order.status]}`}>
                  {order.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
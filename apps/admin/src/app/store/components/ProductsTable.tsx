import type { Product } from "../data";

type ProductsTableProps = {
  products: Product[];
  onDelete: (id: number) => void;
};

const stockColor = (stock: number) => {
  if (stock === 0) return "text-red-600";
  if (stock <= 4) return "text-orange-500";
  return "text-green-600";
};

const stockText = (stock: number) => {
  if (stock === 0) return "Out of stock";
  if (stock <= 4) return `Only ${stock} left`;
  return stock.toString();
};

export function ProductsTable({ products, onDelete }: ProductsTableProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Product</th>
            <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Category</th>
            <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Price</th>
            <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Stock</th>
            <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <img src={product.image} alt={product.name} className="w-10 h-10 rounded-lg object-cover" />
                  <div>
                    <p className="font-semibold text-sm text-gray-900">{product.name}</p>
                    <p className="text-xs text-gray-500 truncate max-w-[200px]">{product.description}</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="bg-red-50 text-wsu-red border border-red-200 text-xs font-semibold px-2 py-0.5 rounded-full">
                  {product.category}
                </span>
              </td>
              <td className="px-6 py-4 font-semibold text-sm text-gray-900">
                ${product.price.toFixed(2)}
              </td>
              <td className={`px-6 py-4 font-semibold text-sm ${stockColor(product.stock)}`}>
                {stockText(product.stock)}
              </td>
              <td className="px-6 py-4">
                <div className="flex gap-2">
                  <button
                    aria-label={`Edit ${product.name}`}
                    onClick={() => alert("Functionality coming in Iteration 2 for back end")}
                    className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-xs font-semibold cursor-pointer hover:bg-gray-200 transition-all"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(product.id)}
                    aria-label={`Delete ${product.name}`}
                    className="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-xs font-semibold cursor-pointer hover:bg-red-100 transition-all"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
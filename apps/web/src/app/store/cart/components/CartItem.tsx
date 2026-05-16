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
    <div style={{
      background: "white",
      border: "1px solid #e5e7eb",
      borderRadius: "16px",
      padding: "1.25rem",
      display: "flex",
      gap: "1rem",
      alignItems: "center",
    }}>
      <div style={{
        width: "80px",
        height: "80px",
        borderRadius: "10px",
        overflow: "hidden",
        flexShrink: 0,
      }}>
        <img
          src={product.image}
          alt={product.name}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <h3 style={{
          fontWeight: "700",
          fontSize: "0.95rem",
          color: "#111827",
          marginBottom: "0.25rem",
        }}>
          {product.name}
        </h3>
        <p style={{ color: "#6b7280", fontSize: "0.8rem" }}>
          ${product.price.toFixed(2)} each
        </p>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <button
          onClick={() => onDecrease(product.id)}
          style={{
            width: "28px",
            height: "28px",
            borderRadius: "50%",
            border: "1px solid #e5e7eb",
            background: "white",
            cursor: "pointer",
            fontSize: "1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          −
        </button>
        <span style={{ fontWeight: "700", minWidth: "20px", textAlign: "center" }}>
          {quantity}
        </span>
        <button
          onClick={() => onIncrease(product.id)}
          style={{
            width: "28px",
            height: "28px",
            borderRadius: "50%",
            border: "1px solid #e5e7eb",
            background: "white",
            cursor: "pointer",
            fontSize: "1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          +
        </button>
      </div>

      <div style={{ textAlign: "right", minWidth: "80px" }}>
        <p style={{ fontWeight: "800", fontSize: "1rem", color: "#111827" }}>
          ${(product.price * quantity).toFixed(2)}
        </p>
      </div>

      <button
        onClick={() => onRemove(product.id)}
        style={{
          background: "none",
          border: "none",
          color: "#9ca3af",
          cursor: "pointer",
          fontSize: "1.2rem",
          padding: "0.25rem",
        }}
      >
        ✕
      </button>
    </div>
  );
}
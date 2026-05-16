import Link from "next/link";

type OrderSummaryProps = {
  total: number;
  cartCount: number;
  onCheckout: () => void;
};

export function OrderSummary({ total, cartCount, onCheckout }: OrderSummaryProps) {
  return (
    <div style={{
      background: "white",
      border: "1px solid #e5e7eb",
      borderRadius: "16px",
      padding: "1.5rem",
      marginTop: "0.5rem",
    }}>
      <h3 style={{
        fontWeight: "700",
        fontSize: "1rem",
        color: "#111827",
        marginBottom: "1rem",
        paddingBottom: "0.75rem",
        borderBottom: "1px solid #f3f4f6",
      }}>
        Order Summary
      </h3>

      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
        <span style={{ color: "#6b7280", fontSize: "0.9rem" }}>
          Subtotal ({cartCount} item{cartCount !== 1 ? "s" : ""})
        </span>
        <span style={{ fontWeight: "600", fontSize: "0.9rem" }}>
          ${total.toFixed(2)}
        </span>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1.5rem" }}>
        <span style={{ color: "#6b7280", fontSize: "0.9rem" }}>Shipping</span>
        <span style={{ fontWeight: "600", fontSize: "0.9rem", color: "#16a34a" }}>Free</span>
      </div>

      <div style={{
        display: "flex",
        justifyContent: "space-between",
        paddingTop: "0.75rem",
        borderTop: "1px solid #f3f4f6",
        marginBottom: "1.5rem",
      }}>
        <span style={{ fontWeight: "800", fontSize: "1.1rem", color: "#111827" }}>Total</span>
        <span style={{ fontWeight: "800", fontSize: "1.1rem", color: "#111827" }}>
          ${total.toFixed(2)}
        </span>
      </div>

      <button
        onClick={onCheckout}
        style={{
          width: "100%",
          background: "#a31631",
          color: "white",
          border: "none",
          padding: "0.875rem",
          borderRadius: "10px",
          fontWeight: "700",
          fontSize: "1rem",
          cursor: "pointer",
          transition: "background 0.2s",
        }}
      >
        Complete Purchase
      </button>

      <Link href="/store" style={{
        display: "block",
        textAlign: "center",
        marginTop: "0.75rem",
        color: "#6b7280",
        textDecoration: "none",
        fontSize: "0.85rem",
      }}>
        ← Continue Shopping
      </Link>
    </div>
  );
}
import Link from "next/link";

type StoreNavProps = {
  cartCount: number;
};

export function StoreNav({ cartCount }: StoreNavProps) {
  return (
    <nav style={{
      borderBottom: "1px solid #e5e0d8",
      background: "white",
      position: "sticky",
      top: 0,
      zIndex: 50,
      padding: "0 2rem",
      height: "64px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <span style={{
          color: "#111827",
          fontWeight: "700",
          fontSize: "1.1rem",
          letterSpacing: "-0.02em",
        }}>
          Tech<span style={{ color: "#a31631" }}>Store</span>
        </span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <Link href="/store/cart" style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          background: cartCount > 0 ? "#a31631" : "transparent",
          color: cartCount > 0 ? "#fff" : "#374151",
          padding: "0.5rem 1rem",
          borderRadius: "8px",
          textDecoration: "none",
          fontSize: "0.85rem",
          fontWeight: "600",
          border: cartCount > 0 ? "none" : "1px solid #d1d5db",
          transition: "all 0.2s",
        }}>
          🛒 Cart {cartCount > 0 && `(${cartCount})`}
        </Link>
        <Link href="/store/login" style={{
          color: "#6b7280",
          textDecoration: "none",
          fontSize: "0.85rem",
        }}>
          Sign In
        </Link>
      </div>
    </nav>
  );
}
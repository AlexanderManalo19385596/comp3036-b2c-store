import type { Product } from "../types";

type ProductCardProps = {
  product: Product;
  onAddToCart: (id: number) => void;
};

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div
      style={{
        background: "white",
        border: "1px solid #e5e7eb",
        borderRadius: "16px",
        overflow: "hidden",
        transition: "all 0.2s",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)";
        (e.currentTarget as HTMLElement).style.borderColor = "#a31631";
        (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
        (e.currentTarget as HTMLElement).style.borderColor = "#e5e7eb";
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
      }}
    >
      {/* Image */}
      <div style={{ width: "100%", height: "180px", overflow: "hidden" }}>
        <img
          src={product.image}
          alt={product.name}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      {/* Info */}
      <div style={{ padding: "1.25rem" }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "0.5rem",
        }}>
          <span style={{
            background: "#fef2f2",
            color: "#a31631",
            border: "1px solid #fecaca",
            fontSize: "0.7rem",
            fontWeight: "600",
            padding: "0.2rem 0.5rem",
            borderRadius: "20px",
          }}>
            {product.category}
          </span>
          <span style={{
            color: product.stock > 0 ? "#16a34a" : "#dc2626",
            fontSize: "0.7rem",
            fontWeight: "600",
          }}>
            {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
          </span>
        </div>

        <h3 style={{
          fontSize: "0.95rem",
          fontWeight: "700",
          color: "#111827",
          marginBottom: "0.4rem",
          letterSpacing: "-0.01em",
        }}>
          {product.name}
        </h3>

        <p style={{
          fontSize: "0.8rem",
          color: "#6b7280",
          lineHeight: 1.5,
          marginBottom: "1rem",
        }}>
          {product.description}
        </p>

        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
          <span style={{
            fontSize: "1.2rem",
            fontWeight: "800",
            color: "#111827",
            letterSpacing: "-0.02em",
          }}>
            ${product.price.toFixed(2)}
          </span>

          <button
            onClick={() => onAddToCart(product.id)}
            disabled={product.stock === 0}
            style={{
              background: product.stock === 0 ? "#f3f4f6" : "#a31631",
              color: product.stock === 0 ? "#9ca3af" : "#fff",
              border: "none",
              padding: "0.5rem 1rem",
              borderRadius: "8px",
              fontSize: "0.8rem",
              fontWeight: "600",
              cursor: product.stock === 0 ? "not-allowed" : "pointer",
              transition: "all 0.2s",
            }}
          >
            {product.stock === 0 ? "Out of Stock" : "+ Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
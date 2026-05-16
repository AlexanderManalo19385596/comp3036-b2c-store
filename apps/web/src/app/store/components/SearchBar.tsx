type SearchBarProps = {
  search: string;
  onSearch: (value: string) => void;
};

export function SearchBar({ search, onSearch }: SearchBarProps) {
  return (
    <div style={{
      flex: 1,
      minWidth: "200px",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      background: "white",
      border: "1px solid #e5e7eb",
      borderRadius: "10px",
      padding: "0.6rem 1rem",
    }}>
      <span style={{ color: "#9ca3af" }}>🔍</span>
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        style={{
          background: "transparent",
          border: "none",
          outline: "none",
          color: "#111827",
          fontSize: "0.9rem",
          width: "100%",
        }}
      />
    </div>
  );
}
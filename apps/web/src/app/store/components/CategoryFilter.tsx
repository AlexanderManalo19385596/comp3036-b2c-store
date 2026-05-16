const CATEGORIES = ["All", "Accessories", "Keyboards", "Cameras", "Mice", "Lighting"];

type CategoryFilterProps = {
  selected: string;
  onSelect: (category: string) => void;
};

export function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
  return (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          style={{
            padding: "0.4rem 1rem",
            borderRadius: "20px",
            border: "1px solid",
            fontSize: "0.8rem",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.2s",
            background: selected === cat ? "#a31631" : "white",
            borderColor: selected === cat ? "#a31631" : "#e5e7eb",
            color: selected === cat ? "#fff" : "#6b7280",
          }}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
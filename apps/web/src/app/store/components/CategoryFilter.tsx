const CATEGORIES = ["All", "Accessories", "Keyboards", "Cameras", "Mice", "Lighting"];

type CategoryFilterProps = {
  selected: string;
  onSelect: (category: string) => void;
};

export function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
  return (
    <div className="flex gap-2 flex-wrap">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`px-4 py-1.5 rounded-full border text-xs font-semibold cursor-pointer transition-all ${
            selected === cat
              ? "bg-wsu-red border-wsu-red text-white"
              : "bg-white border-gray-200 text-gray-500"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
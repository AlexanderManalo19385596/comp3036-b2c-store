type SearchBarProps = {
  search: string;
  onSearch: (value: string) => void;
};

export function SearchBar({ search, onSearch }: SearchBarProps) {
  return (
    <div className="flex-1 min-w-[200px] flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2">
      <span className="text-gray-400">🔍</span>
      <input
        type="text"
        placeholder="Search products..."
        aria-label="Search products"
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        className="bg-transparent border-none outline-none text-gray-900 text-sm w-full"
      />
    </div>
  );
}
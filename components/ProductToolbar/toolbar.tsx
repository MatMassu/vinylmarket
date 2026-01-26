import SearchBar from "./search.tsx";
import Filter from "./filter.tsx";
import Sort from "./sort.tsx";

export default function Toolbar() {
  return (
    <aside className="flex sticky top-0 z-20 bg-white">
      <div className="flex">
        <SearchBar />
      </div>
      <div className="flex-1 flex items-center justify-end gap-4">
        <Sort />
        <Filter />
      </div>
    </aside>
  );
}

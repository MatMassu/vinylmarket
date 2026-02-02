import SearchBar from "./search";
import Filter from "./filter";
import Sort from "./sort";

export default function Toolbar() {
  return (
    <aside className="md:flex sticky top-0 z-20 bg-white">
      <div className="md:flex">
        <SearchBar />
      </div>
      <div className="md:flex-1 flex items-center justify-between md:justify-end gap-4">
        <Sort />
        <Filter />
      </div>
    </aside>
  );
}

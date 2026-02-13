import SearchBar from "./search";
import Filter from "./filter";

export default function Toolbar() {
  return (
    <aside className="flex flex-col z-20 sticky top-0 border bg-white border-black/20 max-w-full mx-6 mb-5 md:min-w-[15vw] md:max-w-[20vw] md:h-screen py-5 rounded-xl gap-4">
      <SearchBar />
    </aside>
  );
}

import SearchBar from "./search";
import Filter from "./filter";

export default function Toolbar() {
  return (
    <aside className="flex flex-col z-20 sticky top-0 border bg-white/60 backdrop-blur-md max-w-full md:mx-auto mx-6 mb-5 md:min-w-[15vw] md:max-w-[20vw] md:h-screen p-5 shadow-sm border-none rounded-lg gap-4">
      <SearchBar />
    </aside>
  );
}

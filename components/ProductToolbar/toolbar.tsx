import SearchBar from "./search";
import ConditionFilter from "../ProductToolbar/condition_filter";

export default function Toolbar() {
  return (
    <aside className="flex flex-col z-20 sticky top-0 bg-white/60 backdrop-blur-md max-w-full md:mx-auto mx-6 mb-5 md:min-w-[15vw] md:max-w-[20vw] md:h-screen p-3 shadow-sm rounded-md gap-4">
      <SearchBar />
      <ConditionFilter />
    </aside>
  );
}

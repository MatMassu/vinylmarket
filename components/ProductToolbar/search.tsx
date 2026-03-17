"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function SearchBar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <form role="search" className="flex items-center h-10 w-full bg-white rounded-lg shadow-sm px-3 gap-2">
      <label htmlFor="search" className="sr-only">
        Buscar vinilos (nombre o artista)
      </label>
      <input
        id="search"
        type="search"
        name="query"
        placeholder="Buscar..."
        className="flex-1 text-sm text-left focus:outline-none bg-transparent"
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get("query")?.toString()}
      />
      <span className="text-gray-400 text-lg leading-none select-none">→</span>
    </form>
  );
}

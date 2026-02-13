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
    <form role="search" className="flex h-10 w-full bg-white">
      <label htmlFor="search" className="sr-only">
        Buscar vinilos (nombre o artista)
      </label>
      <input
        id="search"
        type="search"
        name="query"
        placeholder="Buscar..."
        className="p-4 text-center w-full md:text-left mx-4 focus:outline-none rounded-lg shadow-sm focus:ring-2 focus:ring-neutral-300/30 transition-all"
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get("query")?.toString()}
      />
    </form>
  );
}

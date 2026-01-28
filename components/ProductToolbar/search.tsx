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
  }, 500);

  return (
    <form role="search" className="flex h-10 w-screen md:w-70">
      <label htmlFor="search" className="sr-only">
        Buscar vinilos (nombre o artista)
      </label>
      <input
        id="search"
        type="search"
        name="query"
        placeholder="Buscar vinilos (nombre o artista)"
        className="w-full px-2 text-center md:text-left focus:outline-none"
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get("query")?.toString()}
      />
    </form>
  );
}

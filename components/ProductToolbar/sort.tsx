"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function Sort() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSort(value: string) {
    const params = new URLSearchParams(searchParams);
    if (value == "") {
      params.delete("sort");
    } else {
      params.set("sort", value);
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <form role="sort" className="flex h-10">
      <fieldset className="flex items-center">
        <label htmlFor="sort" className="sr-only">
          Ordenar por:
        </label>
        <select
          id="sort"
          onChange={(e) => {
            handleSort(e.target.value);
          }}
          defaultValue={searchParams.get("sort") ?? ""}
        >
          <option value="price-asc">Precio (asc)</option>
          <option value="price-desc">Precio (desc)</option>
          <option value="artist-desc">Artista (asc)</option>
          <option value="artist-asc">Artista (desc)</option>
        </select>
      </fieldset>
    </form>
  );
}

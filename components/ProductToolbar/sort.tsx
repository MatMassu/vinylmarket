"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function Sort() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const sort = searchParams.get("sort") ?? "price";
  const order = searchParams.get("order") ?? "asc";

  function handleSort(nextSort: string, nextOrder: string) {
    const params = new URLSearchParams(searchParams);
    params.set("sort", nextSort);
    params.set("order", nextOrder);
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <form role="sort" className="flex items-center h-10 pr-3">
      <label htmlFor="sort" className="sr-only">
        Ordenar por:
      </label>
      <button
        type="button"
        className="px-1 mx-2 border border-gray-400 text-gray-400 rounded"
        onClick={() => handleSort(sort, order == "asc" ? "desc" : "asc")}
      >
        {order === "asc" ? "↑" : "↓"}
      </button>

      <select
        id="sort"
        value={sort}
        onChange={(e) => {
          handleSort(e.target.value, order);
        }}
      >
        <option value="price">Precio</option>
        <option value="artist">Artista</option>
      </select>
    </form>
  );
}

"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Filter() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const sortFromUrl = searchParams.get("sort") ?? "";

  const [sort, setSort] = useState(sortFromUrl);

  useEffect(() => {
    setSort(sortFromUrl);
  }, [sortFromUrl]);

  function handleSort(option: string) {
    const params = new URLSearchParams(searchParams);

    if (option) {
      params.set("sort", option);
    } else {
      params.delete("sort");
    }

    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex text-sm gap-2 w-full justify-end px-10">
      <form role="sort" className="flex items-center h-10">
        <label htmlFor="sort" className="mx-2 text-gray-500">
          Ordenar por:
        </label>

        <select
          id="sort"
          value={sort}
          className="cursor-pointer"
          onChange={(e) => {
            const value = e.target.value;
            setSort(value);
            handleSort(value);
          }}
        >
          <option value="">Más relevantes</option>
          <option value="price-desc">Mayor precio</option>
          <option value="price-asc">Menor precio</option>
        </select>
      </form>
    </div>
  );
}

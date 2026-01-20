"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function Filter() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleFilter(value: string) {
    const params = new URLSearchParams(searchParams);
    if (value === "") {
      params.delete("filter");
    } else {
      params.set("filter", value);
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <form role="filter" className="flex items-center h-10 px-4">
      <fieldset className="">
        <label htmlFor="filtros" className="mr-2">
          Filtrar:
        </label>
        <select
          id="filtros"
          onChange={(e) => handleFilter(e.target.value)}
          defaultValue={searchParams.get("filter") ?? ""}
        >
          <option value="">Limpiar filtros</option>
          <option value="available">Disponibles</option>
        </select>
      </fieldset>
    </form>
  );
}

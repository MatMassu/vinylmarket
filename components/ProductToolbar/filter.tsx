"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function Filter() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const isChecked = searchParams.get("filter") === "available";

  function handleChange(checked: boolean) {
    const params = new URLSearchParams(searchParams);
    if (checked) {
      params.set("filter", "available");
    } else {
      params.delete("filter");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <form role="filter" className="flex items-center h-10">
      <label htmlFor="available" className="flex items-center gap-2 cursor-pointer pr-8">
        <input
          type="checkbox"
          id="available"
          value="available"
          checked={isChecked}
          onChange={(e) => handleChange(e.target.checked)}
        />
        <span>Solo disponibles</span>
      </label>
      <button
        type="button"
        className="cursor-pointer hover:underline pr-5"
        onClick={() => {
          const params = new URLSearchParams(searchParams);
          params.delete("query");
          params.delete("filter");
          params.delete("sort");
          params.delete("page");
          params.delete("order");
          replace(`${pathname}?${params.toString()}`);
        }}
      >
        Limpiar filtros
      </button>
    </form>
  );
}

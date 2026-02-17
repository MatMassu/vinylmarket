"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";

export default function Pagination() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const page = Number(searchParams.get("page") ?? 1);

  function handlePagination() {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(page + 1));
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <form className="flex justify-center mt-20 mb-70">
      <button
        type="button"
        className="rounded p-2 cursor-pointer shadow-sm bg-white hover:scale-105 hover:shadow-md transition-all active:scale-99 active:shadow-xs"
        onClick={handlePagination}
      >
        Ver más...
      </button>
    </form>
  );
}

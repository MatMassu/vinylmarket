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
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <form className="flex justify-center mb-5">
      <button
        type="button"
        className="border rounded p-2 cursor-pointer bg-white"
        onClick={handlePagination}
      >
        Ver más...
      </button>
    </form>
  );
}

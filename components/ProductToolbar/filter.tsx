"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

const OPTIONS = [
  { value: "",           label: "Sin ordenar" },
  { value: "date-desc",  label: "Añadidos recientemente" },
  { value: "price-desc", label: "Mayor precio" },
  { value: "price-asc",  label: "Menor precio" },
];

export default function Filter() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const sortFromUrl = searchParams.get("sort") ?? "";
  const [sort, setSort] = useState(sortFromUrl);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => { setSort(sortFromUrl); }, [sortFromUrl]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSort(value: string) {
    setSort(value);
    setOpen(false);
    const params = new URLSearchParams(searchParams);
    if (value) { params.set("sort", value); } else { params.delete("sort"); }
    replace(`${pathname}?${params.toString()}`);
  }

  const currentLabel = OPTIONS.find((o) => o.value === sort)?.label ?? "Sin ordenar";

  return (
    <div className="flex text-sm gap-2 w-full justify-end px-7">
      <div className="flex items-center h-10 gap-2">
        <span className="text-gray-500">Ordenar por:</span>

        <div ref={ref} className="relative">
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex items-center gap-1.5 cursor-pointer text-sm hover:text-gray-600 transition-colors"
          >
            <span>{currentLabel}</span>
            <ChevronDown size={14} className={`transition-transform duration-150 ${open ? "rotate-180" : ""}`} />
          </button>

          {open && (
            <ul className="absolute right-0 top-full mt-1 bg-white border border-gray-200 shadow-md z-30 py-1 min-w-max">
              {OPTIONS.map((opt) => (
                <li key={opt.value}>
                  <button
                    onClick={() => handleSort(opt.value)}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap
                      ${sort === opt.value ? "font-medium" : "text-gray-700"}`}
                  >
                    {opt.label}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

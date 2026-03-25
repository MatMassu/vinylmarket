"use client";

import { useState, useEffect, useRef } from "react";
import SearchBar from "./search";
import ConditionFilter from "./condition_filter";
import { ChevronsDown, ChevronsUp } from "lucide-react";

export default function Toolbar() {
  const [filtersOpen, setFiltersOpen] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    lastScrollY.current = window.scrollY;
    function handleScroll() {
      if (window.innerWidth >= 768) return; // desktop always shows filters
      const currentY = window.scrollY;
      if (currentY > lastScrollY.current + 8) {
        setFiltersOpen(false);
      }
      lastScrollY.current = currentY;
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <aside className="flex flex-col z-20 sticky top-0 bg-white/60 backdrop-blur-md max-w-full md:mx-auto mx-6 mb-5 md:min-w-[15vw] md:max-w-[20vw] md:h-screen p-3 shadow-sm rounded-md gap-2">
      <SearchBar />

      {/* Filters: always visible on desktop, collapsible on mobile */}
      <div
        className={`flex flex-col gap-4 overflow-hidden transition-[max-height] duration-300 ease-in-out
          ${filtersOpen ? "max-h-96" : "max-h-0 md:max-h-96"}`}
      >
        <ConditionFilter label="Estado de portada" minParam="minCondition" maxParam="maxCondition" />
        <ConditionFilter label="Estado de disco" minParam="minDiscCondition" maxParam="maxDiscCondition" />
      </div>

      {/* Toggle button — mobile only, bottom edge of toolbar */}
      <button
        className="md:hidden flex items-center justify-center py-0.5 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
        onClick={() => setFiltersOpen((v) => !v)}
        aria-label={filtersOpen ? "Ocultar filtros" : "Mostrar filtros"}
      >
        {filtersOpen ? <ChevronsUp size={15} /> : <ChevronsDown size={15} />}
      </button>
    </aside>
  );
}

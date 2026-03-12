"use client";

import * as Slider from "@radix-ui/react-slider";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const CONDITIONS = ["P", "F", "G", "G+", "VG", "VG+", "NM"];

export default function ConditionFilter() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const urlMin = Number(searchParams.get("minCondition") ?? 0);
  const urlMax = Number(searchParams.get("maxCondition") ?? 6);

  const [value, setValue] = useState([urlMin, urlMax]);
  const [dragging, setDragging] = useState(false);

  // Keep local value in sync when URL params change (e.g. browser back/forward)
  useEffect(() => {
    setValue([urlMin, urlMax]);
  }, [urlMin, urlMax]);

  const [min, max] = value;
  const minPercent = (min / 6) * 100;
  const maxPercent = (max / 6) * 100;

  function handleValueChange(values: number[]) {
    setValue(values);
    setDragging(true);
  }

  function handleValueCommit(values: number[]) {
    setDragging(false);
    const params = new URLSearchParams(searchParams);
    params.set("minCondition", String(values[0]));
    params.set("maxCondition", String(values[1]));
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="px-4 py-3">
      <label className="text-sm font-medium">Estado de portada</label>

      <Slider.Root
        className="relative flex items-center h-6 touch-none"
        min={0}
        max={6}
        step={1}
        value={value}
        onValueChange={handleValueChange}
        onValueCommit={handleValueCommit}
      >
        <Slider.Track className="relative grow rounded-full h-1.5 overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-r from-red-400 via-amber-300 to-emerald-500" />
          <div
            className="absolute inset-0 bg-neutral-200"
            style={{
              clipPath: `polygon(
                0% 0%, ${minPercent}% 0%, ${minPercent}% 100%,
                ${maxPercent}% 100%, ${maxPercent}% 0%,
                100% 0%, 100% 100%, 0% 100%)`,
            }}
          />
          <Slider.Range className="absolute rounded-full h-full bg-transparent" />
        </Slider.Track>

        <Slider.Thumb
          className={`block w-4 h-4 bg-white border border-neutral-400 rounded-full shadow transition-transform duration-150 outline-none ${dragging ? "scale-130" : ""}`}
        />
        <Slider.Thumb
          className={`block w-4 h-4 bg-white border border-neutral-400 rounded-full shadow transition-transform duration-150 outline-none ${dragging ? "scale-130" : ""}`}
        />
      </Slider.Root>

      <div className="flex justify-between text-xs mt-2 text-neutral-500">
        {CONDITIONS.map((c) => (
          <span key={c}>{c}</span>
        ))}
      </div>
    </div>
  );
}

"use client";

import * as Slider from "@radix-ui/react-slider";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

const CONDITIONS = ["P", "F", "G", "G+", "VG", "VG+", "NM"];

export default function ConditionFilter() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const min = Number(searchParams.get("minCondition") ?? 0);
  const max = Number(searchParams.get("maxCondition") ?? 6);

  const updateParams = useDebouncedCallback((min: number, max: number) => {
    const params = new URLSearchParams(searchParams);

    params.set("minCondition", String(min));
    params.set("maxCondition", String(max));

    replace(`${pathname}?${params.toString()}`);
  }, 200);

  function updateRange(values: number[]) {
    const [min, max] = values;
    updateParams(min, max);
  }

  const minPercent = (min / 6) * 100;
  const maxPercent = (max / 6) * 100;

  return (
    <div className="px-4 py-3">
      <label className="text-sm font-medium">Estado de portada</label>

      <Slider.Root
        className="relative flex items-center h-6 touch-none"
        min={0}
        max={6}
        step={0.01}
        value={[min, max]}
        onValueChange={updateRange}
      >
        <Slider.Track className="relative grow rounded-full h-1.5 overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-r from-red-400 via-amber-300 to-emerald-500 " />
          <div
            className="absolute inset-0 bg-neutral-200"
            style={{
              clipPath: `polygon(
        0% 0%,
        ${minPercent}% 0%,
        ${minPercent}% 100%,
        ${maxPercent}% 100%,
        ${maxPercent}% 0%,
        100% 0%,
        100% 100%,
        0% 100%)`,
            }}
          />
          <Slider.Range className="absolute rounded-full h-full shadow-sm bg-transparent" />
        </Slider.Track>

        <Slider.Thumb className="block w-4 h-4 bg-white border border-neutral-400 rounded-full shadow focus:scale-120 transition-all duration-200" />
        <Slider.Thumb className="block w-4 h-4 bg-white border border-neutral-400 rounded-full shadow focus:scale-120 transition-all duration-200" />
      </Slider.Root>

      <div className="flex justify-between text-xs mt-2 text-neutral-500">
        {CONDITIONS.map((c) => (
          <span key={c} className="">
            {c}
          </span>
        ))}
      </div>
    </div>
  );
}

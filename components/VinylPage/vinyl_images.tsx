"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  images: string[];
};

type Dir = "left" | "right";

const DURATION = 300; // ms

export default function VinylImages({ images }: Props) {
  const [index, setIndex] = useState(0);

  // Two persistent image slots — never remounted
  const slotARef    = useRef<HTMLImageElement>(null);
  const slotBRef    = useRef<HTMLImageElement>(null);
  const activeSlot  = useRef<"A" | "B">("A");
  const isAnimating = useRef(false);

  if (!images?.length) return null;

  function navigate(direction: Dir) {
    if (isAnimating.current) return;

    const curr = activeSlot.current;
    const next = curr === "A" ? "B" : "A";
    const currEl = curr === "A" ? slotARef.current : slotBRef.current;
    const nextEl = next === "A" ? slotARef.current : slotBRef.current;
    if (!currEl || !nextEl) return;

    const newIndex =
      direction === "right"
        ? index === images.length - 1 ? 0 : index + 1
        : index === 0 ? images.length - 1 : index - 1;

    isAnimating.current = true;

    // 1. Load new src into the incoming slot and snap it off-screen (no transition)
    nextEl.style.transition = "none";
    nextEl.style.zIndex     = "1";
    nextEl.style.transform  = `translateX(${direction === "right" ? "100%" : "-100%"})`;
    nextEl.src              = images[newIndex];
    currEl.style.zIndex     = "0";

    // 2. Force a reflow so the snap position is committed before the animation begins
    void nextEl.offsetWidth;

    // 3. Animate both slots to their final positions
    const t = `transform ${DURATION}ms ease-out`;
    nextEl.style.transition = t;
    currEl.style.transition = t;
    nextEl.style.transform  = "translateX(0)";
    currEl.style.transform  = `translateX(${direction === "right" ? "-100%" : "100%"})`;

    activeSlot.current = next;
    setIndex(newIndex);

    setTimeout(() => { isAnimating.current = false; }, DURATION);
  }

  const btnClass =
    "cursor-pointer shrink-0 flex items-center justify-center w-9 h-9 rounded-full " +
    "bg-white text-neutral-600 shadow-lg border border-gray-200 " +
    "hover:text-neutral-900 hover:shadow-xl hover:scale-105 transition-all duration-200";

  return (
    <div className="relative flex gap-3 items-center justify-center w-full max-w-[480px]">
      {images.length > 1 && (
        <button onClick={() => navigate("left")} className={btnClass}>
          <ChevronLeft size={18} />
        </button>
      )}

      {/* Stage: clips both slots during the slide */}
      <div className="relative overflow-hidden aspect-square flex-1">
        {/* Slot A */}
        <img
          ref={slotARef}
          src={images[0]}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{ transform: "translateX(0)", zIndex: 0 }}
          draggable={false}
        />
        {/* Slot B — starts off-screen */}
        <img
          ref={slotBRef}
          src={undefined}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{ transform: "translateX(100%)", zIndex: 0 }}
          draggable={false}
        />
        {/* Transparent zoom overlay — always reads current index from React state */}
        <a
          href={images[index]}
          target="_blank"
          rel="noreferrer"
          className="absolute inset-0 cursor-zoom-in"
          style={{ zIndex: 2 }}
        />
      </div>

      {images.length > 1 && (
        <button onClick={() => navigate("right")} className={btnClass}>
          <ChevronRight size={18} />
        </button>
      )}
    </div>
  );
}

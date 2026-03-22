"use client";

import { useRef, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductCardView } from "../../types/types";
import VinylCarouselCard from "./vinyl_carousel_card";

type Props = {
  title: string;
  products: ProductCardView[];
};

const FRICTION   = 0.92;
const SCROLL_AMT = 480; // px per arrow click (~2 cards)

export default function VinylCarousel({ title, products }: Props) {
  const trackRef   = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const hasDragged = useRef(false);
  const startX     = useRef(0);
  const scrollLeft = useRef(0);
  const lastX      = useRef(0);
  const velocity   = useRef(0);
  const rafId      = useRef<number | null>(null);

  const [canLeft,  setCanLeft]  = useState(false);
  const [canRight, setCanRight] = useState(true);

  const updateArrows = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 0);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
  }, []);

  function cancelGlide() {
    if (rafId.current !== null) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }
  }

  function startGlide() {
    cancelGlide();
    let vel = velocity.current * 1.5;
    function step() {
      if (!trackRef.current || Math.abs(vel) < 0.5) return;
      trackRef.current.scrollLeft -= vel;
      vel *= FRICTION;
      rafId.current = requestAnimationFrame(step);
    }
    rafId.current = requestAnimationFrame(step);
  }

  function scrollBy(dir: 1 | -1) {
    cancelGlide();
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * SCROLL_AMT, behavior: "smooth" });
  }

  function onMouseDown(e: React.MouseEvent) {
    cancelGlide();
    isDragging.current  = true;
    hasDragged.current  = false;
    startX.current      = e.pageX - trackRef.current!.offsetLeft;
    scrollLeft.current  = trackRef.current!.scrollLeft;
    lastX.current       = e.pageX;
    velocity.current    = 0;
    trackRef.current!.style.cursor = "grabbing";
  }

  function onMouseMove(e: React.MouseEvent) {
    if (!isDragging.current) return;
    e.preventDefault();
    const x    = e.pageX - trackRef.current!.offsetLeft;
    const walk = x - startX.current;
    if (Math.abs(walk) > 4) hasDragged.current = true;
    velocity.current = e.pageX - lastX.current;
    lastX.current    = e.pageX;
    trackRef.current!.scrollLeft = scrollLeft.current - walk;
  }

  function stopDrag() {
    if (!isDragging.current) return;
    isDragging.current = false;
    if (trackRef.current) trackRef.current.style.cursor = "grab";
    startGlide();
  }

  function onClickCapture(e: React.MouseEvent) {
    if (hasDragged.current) {
      e.preventDefault();
      e.stopPropagation();
      hasDragged.current = false;
    }
  }

  if (products.length === 0) return null;

  const arrowBase =
    "absolute top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-9 h-9 rounded-full bg-white text-neutral-600 shadow-lg border border-gray-200 transition-all duration-200 hover:text-neutral-900 hover:shadow-xl";

  return (
    <section className="py-12">
      <div className="px-6 sm:px-12 md:px-50 mb-5">
        <h2 className="text-lg font-semibold tracking-wide">{title}</h2>
      </div>

      {/* Relative wrapper — no padding here so arrows can straddle the content edge */}
      <div className="relative">

        {/* Left arrow — centered on the left boundary of the content area */}
        <button
          onClick={() => scrollBy(-1)}
          aria-label="Desplazar izquierda"
          className={`${arrowBase} left-6 sm:left-12 md:left-50 -translate-x-3/2 ${canLeft ? "opacity-100" : "opacity-0 pointer-events-none"} hover:scale-105 cursor-pointer`}
        >
          <ChevronLeft size={18} />
        </button>

        {/* Padded clip box */}
        <div className="px-6 sm:px-12 md:px-50 overflow-hidden">
          <div
            ref={trackRef}
            className="flex gap-4 overflow-x-auto pb-3 select-none cursor-grab
              [scrollbar-width:none] [-ms-overflow-style:none]
              [&::-webkit-scrollbar]:hidden"
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={stopDrag}
            onMouseLeave={stopDrag}
            onDragStart={(e) => e.preventDefault()}
            onClickCapture={onClickCapture}
            onScroll={updateArrows}
          >
            {products.map((product) => (
              <VinylCarouselCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* Right arrow — centered on the right boundary of the content area */}
        <button
          onClick={() => scrollBy(1)}
          aria-label="Desplazar derecha"
          className={`${arrowBase} right-6 sm:right-12 md:right-50 translate-x-3/2 ${canRight ? "opacity-100" : "opacity-0 pointer-events-none"} hover:scale-105 cursor-pointer`}
        >
          <ChevronRight size={18} />
        </button>

      </div>
    </section>
  );
}

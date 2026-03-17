"use client";

import { useRef } from "react";
import { ProductCardView } from "../../types/types";
import VinylCarouselCard from "./vinyl_carousel_card";

type Props = {
  title: string;
  products: ProductCardView[];
};

const FRICTION = 0.92; // velocity multiplier per frame (lower = stops faster)

export default function VinylCarousel({ title, products }: Props) {
  const trackRef    = useRef<HTMLDivElement>(null);
  const isDragging  = useRef(false);
  const hasDragged  = useRef(false);
  const startX      = useRef(0);
  const scrollLeft  = useRef(0);
  const lastX       = useRef(0);
  const velocity    = useRef(0);
  const rafId       = useRef<number | null>(null);

  function cancelGlide() {
    if (rafId.current !== null) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }
  }

  function startGlide() {
    cancelGlide();
    let vel = velocity.current * 1.5; // slight amplification for feel

    function step() {
      if (!trackRef.current || Math.abs(vel) < 0.5) return;
      trackRef.current.scrollLeft -= vel;
      vel *= FRICTION;
      rafId.current = requestAnimationFrame(step);
    }

    rafId.current = requestAnimationFrame(step);
  }

  function onMouseDown(e: React.MouseEvent) {
    cancelGlide();
    isDragging.current = true;
    hasDragged.current = false;
    startX.current    = e.pageX - trackRef.current!.offsetLeft;
    scrollLeft.current = trackRef.current!.scrollLeft;
    lastX.current     = e.pageX;
    velocity.current  = 0;
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

  return (
    <section className="py-12">
      <div className="px-6 sm:px-12 md:px-50 mb-5">
        <h2 className="text-lg font-semibold tracking-wide">{title}</h2>
      </div>

      {/* Clip to content width — same padding as the rest of the page */}
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
        >
          {products.map((product) => (
            <VinylCarouselCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

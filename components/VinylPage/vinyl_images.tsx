"use client";

import { ModalImagesView } from "../../types/types";
import Image from "next/image";
import { useState } from "react";

type VinylImagesProps = {
  images: string[];
};

export default function VinylImages({ images }: VinylImagesProps) {
  const [index, setIndex] = useState(0);

  if (!images?.length) return null;

  const currentImage = images[index];

  function prevImage() {
    setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  }

  function nextImage() {
    setIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  }

  return (
    <div className="relative flex gap-3 items-center justify-center w-full max-w-[480px]">
      {images.length > 1 && (
        <button
          onClick={prevImage}
          className="cursor-pointer shrink-0 bg-black opacity-80 text-white rounded-full w-8 h-8 flex items-center justify-center hover:opacity-70 active:scale-95 duration-100 transition-all text-sm"
        >
          ←
        </button>
      )}

      <a href={currentImage} target="_blank" rel="noreferrer" className="cursor-zoom-in">
        <Image
          src={currentImage}
          alt=""
          width={400}
          height={400}
          className="aspect-square touch-pinch-zoom"
        />
      </a>

      {images.length > 1 && (
        <button
          onClick={nextImage}
          className="cursor-pointer shrink-0 bg-black opacity-80 text-white rounded-full w-8 h-8 flex items-center justify-center hover:opacity-70 active:scale-95 duration-100 transition-all text-sm"
        >
          →
        </button>
      )}
    </div>
  );
}

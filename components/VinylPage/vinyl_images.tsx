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
    <div className="relative flex gap-2 items-center justify-center align-middle w-full max-w-[480px] touch-pan-y">
      {images.length > 1 && (
        <button
          onClick={prevImage}
          className="bg-black opacity-80 text-white rounded-full w-6 h-6 text-center hover:opacity-70 active:scale-96 duration-100 transition-all text-xs"
        >
          ←
        </button>
      )}

      <Image
        src={currentImage}
        alt={`test`}
        width={400}
        height={400}
        className="aspect-square"
      />

      {images.length > 1 && (
        <button
          onClick={nextImage}
          className="bg-black opacity-80 text-white rounded-full w-6 h-6 text-center hover:opacity-70 active:scale-96 duration-100 transition-all text-xs"
        >
          →
        </button>
      )}
    </div>
  );
}

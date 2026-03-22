"use client";

import Image from "next/image";
import Link from "next/link";
import { ProductCardView, Grading } from "../../types/types";
import { useCart } from "../Cart/cart_context";

const GRADING_COLOR: Record<Grading, string> = {
  NM:    "text-emerald-600",
  "VG+": "text-sky-600",
  VG:    "text-green-600",
  "G+":  "text-amber-600",
  G:     "text-orange-500",
  F:     "text-red-900",
  P:     "text-red-500",
};

export default function VinylCarouselCard({ product }: { product: ProductCardView }) {
  const { items, addToCart, removeFromCart } = useCart();
  const inCart = items.find((i) => i.id === product.id);

  return (
    <div className="flex flex-col w-60 shrink-0 bg-white shadow-md hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 select-none">
      <Link href={`/vinyl/${product.id}`} scroll={false} className="block" draggable={false}>
        <Image
          src={product.images.grid}
          alt={`Portada de ${product.title} — ${product.artist}`}
          width={288}
          height={288}
          className="w-full aspect-square object-cover"
          draggable={false}
        />
      </Link>

      <div className="flex flex-col p-4 flex-1 gap-3">
        {/* Top: title / artist — expands to fill available space */}
        <div className="flex flex-col gap-0.5 flex-1">
          <Link href={`/vinyl/${product.id}`} scroll={false} draggable={false}>
            <h3 className="font-bold text-sm leading-snug line-clamp-2 text-neutral-800 hover:text-neutral-500 transition-colors cursor-pointer">
              {product.title}
            </h3>
          </Link>
          <p className="text-xs text-neutral-500 line-clamp-1">{product.artist}</p>
        </div>

        {/* Bottom: price / condition / button — always flush to the card bottom */}
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold text-neutral-700">{product.formattedPrice}</p>
          <div className="flex gap-3 text-[11px] font-medium text-neutral-600">
            <span>
              Tapa:{" "}
              <span className={GRADING_COLOR[product.cover_condition]}>
                {product.cover_condition}
              </span>
            </span>
            <span>
              Disco:{" "}
              <span className={GRADING_COLOR["VG"]}>VG</span>
            </span>
          </div>

          {product.inStock ? (
            inCart ? (
              <button
                onClick={() => removeFromCart(product.id)}
                className="cursor-pointer border border-gray-300 text-xs w-full h-8 flex items-center justify-center whitespace-nowrap hover:bg-gray-100 transition-colors"
              >
                Sacar del carrito
              </button>
            ) : (
              <button
                onClick={() => addToCart(product, product.images)}
                className="cursor-pointer bg-black text-white text-xs w-full h-8 flex items-center justify-center whitespace-nowrap hover:bg-gray-800 transition-colors font-medium"
              >
                Agregar al carrito
              </button>
            )
          ) : (
            <button disabled className="border border-gray-200 text-gray-400 text-xs w-full h-8 flex items-center justify-center whitespace-nowrap cursor-not-allowed">
              Sin stock
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useCart } from "../Cart/cart_context";
import { ProductCardView } from "../../types/types";
import Image from "next/image";
import Link from "next/link";

export default function FeaturedVinylCard({ product }: { product: ProductCardView }) {
  const { items, addToCart, removeFromCart } = useCart();
  const inCart = items.find((i) => i.id === product.id);

  return (
    <div className="flex flex-row gap-4 items-start">
      <Link href={`/vinyl/${product.id}`} scroll={false} className="shrink-0 block overflow-hidden ">
        <Image
          src={product.images.grid}
          alt={`${product.title} — ${product.artist}`}
          width={230}
          height={230}
          className="object-cover"
        />
      </Link>

      <div className="flex flex-col gap-2 min-w-0">
        <div className="flex flex-col gap-0.5">
          <p className="text-gray-400 text-xs tracking-wide uppercase truncate">{product.artist}</p>
          <h3 className="text-white font-semibold text-sm leading-snug line-clamp-2">{product.title}</h3>
          <p className="text-white font-bold text-base mt-0.5">{product.formattedPrice}</p>
        </div>

        {product.inStock ? (
          inCart ? (
            <button
              onClick={() => removeFromCart(product.id)}
              className="cursor-pointer border border-white text-white text-xs px-3 h-8 flex items-center justify-center whitespace-nowrap hover:bg-white hover:text-black transition-colors self-start"
            >
              Sacar del carrito
            </button>
          ) : (
            <button
              onClick={() => addToCart(product, product.images)}
              className="cursor-pointer bg-white text-black text-xs px-3 h-8 flex items-center justify-center whitespace-nowrap font-medium hover:bg-gray-200 transition-colors self-start"
            >
              Agregar al carrito
            </button>
          )
        ) : (
          <button disabled className="border border-gray-600 text-gray-600 text-xs px-3 h-8 flex items-center justify-center whitespace-nowrap cursor-not-allowed self-start">
            Sin stock
          </button>
        )}
      </div>
    </div>
  );
}

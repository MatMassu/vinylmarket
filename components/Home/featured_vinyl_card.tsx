"use client";

import { useCart } from "../Cart/cart_context";
import { ProductCardView } from "../../types/types";
import Image from "next/image";
import Link from "next/link";

export default function FeaturedVinylCard({ product }: { product: ProductCardView }) {
  const { items, addToCart, removeFromCart } = useCart();
  const inCart = items.find((i) => i.id === product.id);

  return (
    <div className="flex flex-col gap-4">
      <Link href={`/vinyl/${product.id}`} scroll={false} className="block overflow-hidden">
        <Image
          src={product.images.grid}
          alt={`${product.title} — ${product.artist}`}
          width={400}
          height={400}
          className="w-full aspect-square object-cover hover:scale-[1.03] transition-transform duration-500"
        />
      </Link>

      <div className="flex flex-col gap-1">
        <p className="text-gray-400 text-sm tracking-wide uppercase">{product.artist}</p>
        <h3 className="text-white font-semibold text-lg leading-snug">{product.title}</h3>
        <p className="text-white font-bold text-xl mt-1">{product.formattedPrice}</p>
      </div>

      {product.inStock ? (
        inCart ? (
          <button
            onClick={() => removeFromCart(product.id)}
            className="cursor-pointer border border-white text-white text-sm px-4 py-2 hover:bg-white hover:text-black transition-colors"
          >
            En el carrito ({inCart.quantity}) · Quitar
          </button>
        ) : (
          <button
            onClick={() => addToCart(product, product.images)}
            className="cursor-pointer bg-white text-black text-sm px-4 py-2 font-medium hover:bg-gray-200 transition-colors"
          >
            Agregar al carrito
          </button>
        )
      ) : (
        <button disabled className="border border-gray-600 text-gray-600 text-sm px-4 py-2 cursor-not-allowed">
          Sin stock
        </button>
      )}
    </div>
  );
}

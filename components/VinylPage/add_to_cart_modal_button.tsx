"use client";

import { useRouter } from "next/navigation";
import { useCart } from "../Cart/cart_context";
import { ProductCardView } from "../../types/types";

export default function AddToCartModalButton({ product }: { product: ProductCardView }) {
  const { addToCart } = useCart();
  const router = useRouter();

  function handleClick() {
    addToCart(product, product.images);
    router.back();
  }

  return (
    <button
      onClick={handleClick}
      disabled={!product.inStock}
      className="cursor-pointer bg-black font-semibold text-sm w-full p-2 text-white hover:bg-gray-800 active:scale-y-95 transform transition-all disabled:opacity-40 disabled:cursor-not-allowed"
    >
      {product.inStock ? "Agregar al carrito" : "Sin stock"}
    </button>
  );
}

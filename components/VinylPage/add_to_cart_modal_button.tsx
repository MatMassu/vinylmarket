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
      className="bg-blue-900 font-semibold text-sm w-full p-2 text-white rounded-lg hover:opacity-70 active:scale-y-95 transform transition-all disabled:opacity-40 disabled:cursor-not-allowed"
    >
      {product.inStock ? "Agregar al carrito" : "Sin stock"}
    </button>
  );
}

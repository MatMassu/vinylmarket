"use client";

import { useCart } from "../Cart/cart_context";
import { Product, CartImageVariants } from "../../types/types";
import { ShoppingCart } from "lucide-react";

type AddToCartButtonProps = {
  product: Product;
  images: CartImageVariants;
};

export default function AddToCartButton({ product, images }: AddToCartButtonProps) {
  const { addToCart } = useCart();
  return (
    <button
      className="absolute top-1 right-2 w-5 h-5 cursor-pointer hover:scale-130 active:scale-110 transform transition-all origin-top-right"
      onClick={() => addToCart(product, images)}
    >
      <ShoppingCart className="stroke-white" />
    </button>
  );
}

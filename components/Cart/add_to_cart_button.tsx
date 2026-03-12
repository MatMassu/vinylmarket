"use client";

import { useCart } from "../Cart/cart_context";
import { ProductCardView, CartImageVariants } from "../../types/types";
import { ShoppingCart } from "lucide-react";

type AddToCartButtonProps = {
  product: ProductCardView;
  images: CartImageVariants;
  disabled: boolean;
};

export default function AddToCartButton({ product, images, disabled }: AddToCartButtonProps) {
  const { items, addToCart, removeFromCart } = useCart();
  const cartItem = items.find((i) => i.id === product.id);

  if (cartItem) {
    return (
      <button
        className="absolute top-1 right-2 w-5 h-5 flex items-center justify-center bg-black text-white text-xs font-bold rounded-full cursor-pointer hover:scale-125 active:scale-110 transform transition-all origin-top-right"
        onClick={() => removeFromCart(product.id)}
      >
        {cartItem.quantity}
      </button>
    );
  }

  return (
    <button
      className="absolute top-1 right-2 w-5 h-5 cursor-pointer hover:scale-130 active:scale-110 transform transition-all origin-top-right disabled:opacity-30"
      onClick={() => addToCart(product, images)}
      disabled={disabled}
    >
      <ShoppingCart className="stroke-white" />
    </button>
  );
}

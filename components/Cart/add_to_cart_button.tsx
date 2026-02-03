"use client";

import { useCart } from "../Cart/cart_context";
import Product from "../../types/types";
import { ShoppingCart } from "lucide-react";

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();
  return (
    <button
      className="absolute top-1 right-2 w-5 h-5 cursor-pointer hover:scale-130 transform transition-all origin-top-right"
      onClick={() => addToCart(product)}
    >
      <ShoppingCart className="stroke-white" />
    </button>
  );
}

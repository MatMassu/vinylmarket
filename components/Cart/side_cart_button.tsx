"use client";

import { useState } from "react";
import CartPanel from "./cart_panel";
import { ShoppingCart } from "lucide-react";
import { useCart } from "./cart_context";

export default function SideCartButton() {
  const [open, setOpen] = useState(false);
  const { items } = useCart();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Abrir carrito"
        className={`relative cursor-pointer bg-black rounded-full w-13 h-13 flex items-center justify-center
          shadow-[0_4px_24px_rgba(0,0,0,0.35)] hover:scale-110 active:scale-95 transition-all duration-300
          ${totalItems > 0 ? "opacity-100 scale-100" : "opacity-0 scale-75 pointer-events-none"}`}
      >
        <ShoppingCart size={24} className="stroke-white -translate-x-0.5" />
        {totalItems > 0 && (
          <span className="absolute -top-0.5 -right-0.5 bg-white text-black text-[10px] font-semibold rounded-full w-4.5 h-4.5 flex items-center justify-center leading-none border border-black/20">
            {totalItems > 99 ? "99+" : totalItems}
          </span>
        )}
      </button>
      <CartPanel open={open} onClose={() => setOpen(false)} />
    </>
  );
}

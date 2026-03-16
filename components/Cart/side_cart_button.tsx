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
        className={`fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-black text-white cursor-pointer
          flex items-center justify-center
          shadow-[0_4px_24px_rgba(0,0,0,0.35)]
          hover:scale-110 active:scale-95 transition-all duration-300
          ${totalItems > 0 ? "opacity-100 scale-100" : "opacity-0 scale-75 pointer-events-none"}`}
      >
        <div className="relative">
          <ShoppingCart size={22} className="stroke-white" />
          <span className="absolute -top-2.5 -right-2.5 bg-white text-black text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center leading-none">
            {totalItems > 99 ? "99+" : totalItems}
          </span>
        </div>
      </button>
      <CartPanel open={open} onClose={() => setOpen(false)} />
    </>
  );
}

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
        className="absolute right-10 scale-120 md:scale-150 cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <div className="relative">
          <ShoppingCart className="stroke-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] hover:scale-[1.1] transition-all duration-300" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center leading-none">
              {totalItems > 99 ? "99+" : totalItems}
            </span>
          )}
        </div>
      </button>
      <CartPanel open={open} onClose={() => setOpen(false)} />
    </>
  );
}

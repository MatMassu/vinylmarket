"use client";

import { useState } from "react";
import CartPanel from "./cart_panel";
import { ShoppingCart } from "lucide-react";

export default function SideCartButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="absolute right-10 scale-120 md:scale-150 cursor-pointer "
        onClick={() => setOpen(true)}
      >
        <ShoppingCart className="stroke-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] hover:scale-[1.1] transition-all duration-300" />
      </button>
      <CartPanel open={open} onClose={() => setOpen(false)} />
    </>
  );
}

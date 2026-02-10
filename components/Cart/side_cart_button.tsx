"use client";

import { useState } from "react";
import CartPanel from "./cart_panel";
import { ShoppingCart } from "lucide-react";

export default function SideCartButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="absolute right-10 scale-120 md:scale-150 cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <ShoppingCart className="stroke-white" />
      </button>
      <CartPanel open={open} onClose={() => setOpen(false)} />
    </>
  );
}

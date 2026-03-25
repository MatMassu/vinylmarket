"use client";

import Image from "next/image";
import { useCart } from "../Cart/cart_context";

export default function CheckoutCartSidebar() {
  const { items } = useCart();
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  if (items.length === 0) return null;

  return (
    <div className="hidden lg:flex flex-1 flex-col gap-3 shrink-0">
      {/* Scrollable items list */}
      <ul className="flex flex-col gap-3 overflow-y-auto max-h-[55vh] pr-1">
        {items.map((item) => (
          <li key={item.id} className="flex gap-3 items-center">
            <Image
              src={item.images.cart}
              alt={item.title}
              width={96}
              height={96}
              className="w-23 h-23 object-cover shrink-0"
            />
            <div className="flex flex-col flex-1 min-w-0 text-sm">
              <p className="font-medium line-clamp-1">{item.title}</p>
              <p className="text-gray-500 text-xs line-clamp-1">{item.artist}</p>
              <p className="text-xs text-gray-400">x{item.quantity}</p>
            </div>
            <p className="text-sm font-medium shrink-0">
              ${(item.price * item.quantity).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>

      {/* Subtotal — always visible below the scroll area */}
      <div className="border-t border-gray-100 pt-3 flex justify-between text-sm font-semibold">
        <span>Subtotal</span>
        <span>${subtotal.toLocaleString()}</span>
      </div>
    </div>
  );
}

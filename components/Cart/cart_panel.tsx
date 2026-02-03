"use client";

import { useCart } from "./cart_context";
import Link from "next/link";
import clsx from "clsx";

type CartPanelProps = {
  open: boolean;
  onClose: () => void;
};

export default function CartPanel({ open, onClose }: CartPanelProps) {
  const { items, removeFromCart } = useCart();

  return (
    <div className={clsx("fixed inset-0 z-50", !open && "pointer-events-none")}>
      <div
        className={clsx(
          "absolute inset-0 bg-black/30 transition-opacity",
          open ? "opacity-100" : "opacity-0"
        )}
        onClick={onClose}
      />
      <div
        className={clsx(
          "absolute right-0 top-0 h-full w-96 bg-white shadow-xl p-6 flex flex-col transition-transform duration-300",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <h2 className="text-xl font-semibold mb-4">Carrito</h2>

        <div className="flex-1 overflow-y-auto flex flex-col gap-4">
          {items.length === 0 && <p className="text-gray-500 text-sm">Carrito vacio</p>}

          {items.map((item) => (
            <div key={item.id} className="flex justify-between items-start border-b pb-2">
              <div>
                <p className="font-medium">{item.title}</p>
                <p className="text-sm text-gray-500">Cantidad: {item.quantity}</p>
                <p className="text-sm">${item.price * item.quantity}</p>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-sm text-red-500 hover:underline"
              >
                Borrar
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

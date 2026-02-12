"use client";

import { useCart } from "./cart_context";
import { useEffect } from "react";
import Link from "next/link";
import clsx from "clsx";
import { CloseButton } from "../Modal/close_button";
import { X } from "lucide-react";

type CartPanelProps = {
  open: boolean;
  onClose: () => void;
};

export default function CartPanel({ open, onClose }: CartPanelProps) {
  useEffect(() => {
    if (!open) return;

    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  const { items, removeFromCart } = useCart();
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <aside
      aria-hidden={!open}
      className={clsx("fixed inset-0 z-50", !open && "pointer-events-none")}
    >
      <button
        aria-label="Cerrar carrito"
        className={clsx(
          "absolute inset-0 bg-black/30 transition-opacity",
          open ? "opacity-100" : "opacity-0"
        )}
        onClick={onClose}
      />
      <section
        aria-label="Carrito"
        className={clsx(
          "absolute right-0 top-0 h-full min-w-96 max-w-[50vw] bg-white shadow-xl p-6 flex flex-col transition-transform duration-300",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <header className="flex p-4 border-b justify-between">
          <h2 className="text-xl font-semibold">Carrito</h2>
          <button onClick={onClose}>
            <X />
          </button>
        </header>
        <ul className="flex flex-col gap-4 px-2 py-4 overflow-y-scroll flex-1">
          {items.length === 0 ? (
            <div className="flex items-center h-full">
              <p className="text-gray-500 text-sm text-center w-full">Carrito vacio</p>
            </div>
          ) : (
            items.map((item) => <CartItem key={item.id} item={item} />)
          )}
        </ul>

        <footer className="p-6 border-t space-y-4">
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span className="">${total}</span>
          </div>
          <Link
            href="/checkout"
            onClick={onClose}
            className={clsx(
              "block text-center py-2 rounded transition",
              items.length === 0
                ? "bg-gray-300 text-gray-500 pointer-events-none"
                : "bg-blue-700 text-white hover:opacity-80 active:scale-95"
            )}
          >
            Ir a pagar
          </Link>
        </footer>
      </section>
    </aside>
  );
}

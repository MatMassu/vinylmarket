"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useCart } from "../Cart/cart_context";

export default function SuccessContent() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, []);

  return (
    <main className="flex flex-col items-center justify-center flex-1 gap-4 py-24 text-center px-4">
      <h1 className="text-2xl font-semibold">¡Pago exitoso!</h1>
      <p className="text-gray-500 text-sm max-w-sm">
        Tu pedido fue confirmado. Te contactaremos con los detalles del envío a la brevedad.
      </p>
      <Link
        href="/"
        className="bg-black font-semibold text-sm px-6 py-2 text-white hover:bg-gray-800 transition-colors mt-2"
      >
        Volver a la tienda
      </Link>
    </main>
  );
}

"use client";

import { useState } from "react";
import { useCart } from "../Cart/cart_context";
import { getGuestId } from "../../lib/guest-id";

const CHECKOUT_URL = process.env.NEXT_PUBLIC_CHECKOUT_URL!;

type Payer = { email: string; firstName: string; lastName: string };

export default function CheckoutButton({ payer }: { payer: Payer }) {
  const { items } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCheckout() {
    if (!payer.email) {
      setError("Ingresá tu email para continuar.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(`${CHECKOUT_URL}/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: getGuestId(),
          items: items.map((item) => ({
            product_id: item.id,
            quantity: item.quantity,
          })),
          payer: {
            email: payer.email,
            first_name: payer.firstName,
            last_name: payer.lastName,
          },
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        setError(text || "Error al iniciar el pago.");
        return;
      }

      const data = await res.json();
      window.location.href = data.payment_url;
    } catch {
      setError("No se pudo conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      {error && <p className="text-red-600 text-sm text-center">{error}</p>}
      <button
        onClick={handleCheckout}
        disabled={loading || items.length === 0}
        className="bg-blue-900 font-semibold text-md w-full p-2 text-white rounded-lg cursor-pointer hover:opacity-70 active:scale-y-95 transform transition-all disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {loading ? "Procesando..." : "Continuar"}
      </button>
    </div>
  );
}

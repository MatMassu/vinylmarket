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
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null);

  async function handleCheckout() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(payer.email)) {
      setError("Ingresá un email válido para continuar.");
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
      setPaymentUrl(data.payment_url);
    } catch {
      setError("No se pudo conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {paymentUrl && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl p-6 flex flex-col gap-4 max-w-sm w-full shadow-xl">
            <div className="flex flex-col gap-1">
              <h2 className="font-semibold text-lg">Confirmar pedido</h2>
              <p className="text-sm text-gray-500">
                Serás redirigido al sitio de MercadoPago para completar el pago de forma segura.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <a
                href={paymentUrl}
                className="bg-blue-900 font-semibold text-sm text-center w-full p-2 text-white rounded-lg hover:opacity-70 transition-opacity"
              >
                Ir a pagar
              </a>
              <button
                onClick={() => setPaymentUrl(null)}
                className="border border-gray-300 text-sm w-full p-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Volver
              </button>
            </div>
          </div>
        </div>
      )}

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
    </>
  );
}

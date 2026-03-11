"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

const CHECKOUT_URL = process.env.NEXT_PUBLIC_CHECKOUT_URL!;

export default function FailureContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get("external_reference");
  const [loading, setLoading] = useState(false);

  async function cancelOrder() {
    if (!orderId) return;
    try {
      await fetch(`${CHECKOUT_URL}/orders/${orderId}/cancel`, { method: "POST" });
    } catch {
      // best-effort; expiry worker will release stock after 10 minutes
    }
  }

  async function handleRetry() {
    setLoading(true);
    await cancelOrder();
    router.push("/checkout");
  }

  async function handleLeave() {
    setLoading(true);
    await cancelOrder();
    router.push("/");
  }

  return (
    <main className="flex flex-col items-center justify-center flex-1 gap-4 py-24 text-center px-4">
      <h1 className="text-2xl font-semibold">No se completó el pago</h1>
      <p className="text-gray-500 text-sm max-w-sm">
        Podés volver al checkout para intentarlo de nuevo, o cancelar el pedido y volver a la
        tienda.
      </p>
      <div className="flex gap-3 mt-2">
        <button
          onClick={handleRetry}
          disabled={loading}
          className="bg-blue-900 font-semibold text-sm px-6 py-2 text-white rounded-lg hover:opacity-70 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Reintentar pago
        </button>
        <button
          onClick={handleLeave}
          disabled={loading}
          className="border border-gray-400 text-sm px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Cancelar pedido
        </button>
      </div>
    </main>
  );
}

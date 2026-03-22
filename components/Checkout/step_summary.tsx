"use client";

import { useState } from "react";
import Image from "next/image";
import { useCart } from "../Cart/cart_context";
import { getGuestId } from "../../lib/guest-id";
import type { ContactData, ShippingData } from "./checkout_form_client";

const CHECKOUT_URL = process.env.NEXT_PUBLIC_CHECKOUT_URL!;

const METHOD_LABEL: Record<string, string> = {
  local:  "Envío local gratuito",
  branch: "Retiro en sucursal (EnvioPack)",
  door:   "Envío a domicilio (EnvioPack)",
};

type Props = {
  contact: ContactData;
  shipping: ShippingData;
  onBack: () => void;
};

function formatAddress(s: ShippingData): string {
  if (s.method === "local") {
    const parts = [s.street, s.number, s.floor && `Piso ${s.floor}`, s.apt && `Depto ${s.apt}`, s.neighborhood].filter(Boolean);
    return parts.join(", ");
  }
  if (s.method === "branch") {
    return [s.neighborhood, s.province].filter(Boolean).join(", ");
  }
  if (s.method === "door") {
    const parts = [s.street, s.number, s.floor && `Piso ${s.floor}`, s.apt && `Depto ${s.apt}`, s.neighborhood, s.province, s.zip].filter(Boolean);
    return parts.join(", ");
  }
  return "";
}

export default function StepSummary({ contact, shipping, onBack }: Props) {
  const { items, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState<string | null>(null);

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const shippingCost = shipping.method === "local" ? 0 : null; // null = TBD via EnvioPack API

  async function handlePay() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${CHECKOUT_URL}/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: getGuestId(),
          items: items.map((item) => ({ product_id: item.id, quantity: item.quantity })),
          payer: {
            email:      contact.email,
            first_name: contact.firstName,
            last_name:  contact.lastName,
            phone:      contact.phone,
          },
          shipping: {
            method:       shipping.method,
            street:       shipping.street,
            number:       shipping.number,
            floor:        shipping.floor,
            apt:          shipping.apt,
            neighborhood: shipping.neighborhood,
            province:     shipping.province,
            zip:          shipping.zip,
          },
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        setError(text || "Error al iniciar el pago.");
        return;
      }

      const data = await res.json();
      clearCart();
      window.location.href = data.payment_url;
    } catch {
      setError("No se pudo conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid md:grid-cols-[1fr_auto] gap-8">

      {/* Left: contact + shipping review */}
      <div className="flex flex-col gap-6">
        {/* Contact */}
        <div className="flex flex-col gap-2">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400">Contacto</h3>
          <div className="border border-gray-200 p-4 flex flex-col gap-1 text-sm">
            <p>{contact.firstName} {contact.lastName}</p>
            <p className="text-gray-500">{contact.email}</p>
            <p className="text-gray-500">{contact.phone}</p>
          </div>
        </div>

        {/* Shipping */}
        <div className="flex flex-col gap-2">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400">Envío</h3>
          <div className="border border-gray-200 p-4 flex flex-col gap-1 text-sm">
            <p className="font-medium">{shipping.method ? METHOD_LABEL[shipping.method] : "—"}</p>
            <p className="text-gray-500">{formatAddress(shipping)}</p>
          </div>
        </div>

        {/* Items */}
        <div className="flex flex-col gap-2">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400">Productos</h3>
          <ul className="flex flex-col gap-3">
            {items.map((item) => (
              <li key={item.id} className="flex gap-3 items-center">
                <Image
                  src={item.images.cart}
                  alt={item.title}
                  width={56}
                  height={56}
                  className="w-14 h-14 object-cover shrink-0"
                />
                <div className="flex flex-col flex-1 min-w-0 text-sm">
                  <p className="font-medium line-clamp-1">{item.title}</p>
                  <p className="text-gray-500 text-xs">{item.artist} · x{item.quantity}</p>
                </div>
                <p className="text-sm font-medium shrink-0">
                  ${(item.price * item.quantity).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right: totals + payment */}
      <div className="flex flex-col gap-4 md:w-72">
        <div className="border border-gray-200 p-5 flex flex-col gap-3">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400">Total</h3>

          <div className="flex flex-col gap-1.5 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Subtotal</span>
              <span>${subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Envío</span>
              <span>
                {shippingCost === 0
                  ? <span className="text-emerald-600 font-medium">Sin cargo</span>
                  : <span className="text-gray-400 italic">A calcular</span>
                }
              </span>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-3 flex justify-between font-semibold">
            <span>Total</span>
            <span>${subtotal.toLocaleString()}{shippingCost === null && <span className="text-gray-400 text-xs font-normal"> + envío</span>}</span>
          </div>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="flex flex-col gap-2">
          <button
            onClick={handlePay}
            disabled={loading || items.length === 0}
            className="cursor-pointer bg-black text-white text-sm font-semibold p-3 hover:bg-gray-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? "Procesando..." : "Ir a pagar →"}
          </button>
          <button
            onClick={onBack}
            disabled={loading}
            className="cursor-pointer border border-gray-300 text-sm p-2.5 hover:bg-gray-100 transition-colors disabled:opacity-40"
          >
            ← Volver
          </button>
        </div>

        <p className="text-xs text-gray-400 text-center leading-relaxed">
          Serás redirigido a MercadoPago para completar el pago de forma segura.
        </p>
      </div>

    </div>
  );
}

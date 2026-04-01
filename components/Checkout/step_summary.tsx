"use client";

import { useState } from "react";
import Image from "next/image";
import { useCart } from "../Cart/cart_context";
import { getGuestId } from "../../lib/guest-id";
import type { ContactData, LocationData, ShippingData } from "./checkout_form_client";

const CHECKOUT_URL = process.env.NEXT_PUBLIC_CHECKOUT_URL!;

const METHOD_LABEL: Record<string, string> = {
  local:  "Envío local",
  branch: "Retiro en sucursal",
  door:   "Envío a domicilio",
};

const SERVICE_LABEL: Record<string, string> = {
  EP: "PAQ.AR Expreso",
  CP: "PAQ.AR Clásico",
};

type Props = {
  contact:  ContactData;
  location: LocationData;
  shipping: ShippingData;
  onBack:   () => void;
};

function formatShippingLine(location: LocationData, shipping: ShippingData): string {
  const { method, service, branchDisplay, street, number, floor, apt } = shipping;
  const { locality, provinceName } = location;

  if (method === "local") {
    return [locality, provinceName].filter(Boolean).join(", ");
  }
  if (method === "branch") {
    return [branchDisplay, locality, provinceName].filter(Boolean).join(", ");
  }
  if (method === "door") {
    const addr = [
      street,
      number,
      floor  && `Piso ${floor}`,
      apt    && `Depto ${apt}`,
      locality,
      provinceName,
    ].filter(Boolean);
    return addr.join(", ");
  }
  return "";
}

export default function StepSummary({ contact, location, shipping, onBack }: Props) {
  const { items, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState<string | null>(null);

  const subtotal     = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const shippingCost = shipping.cost ?? 0;
  const total        = subtotal + shippingCost;

  const shippingType = shipping.method === "local"
    ? "local"
    : `${shipping.method}_${shipping.service?.toLowerCase() ?? ""}`;

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
          },
          shipping: {
            type:          shippingType,
            cost:          shippingCost,
            phone:         contact.phoneArea + contact.phoneNumber,
            phone_area:    contact.phoneArea,
            province:      location.province,
            locality:      location.locality,
            postal_code:   location.postalCode,
            branch_code:   shipping.branchCode  || undefined,
            branch_display: shipping.branchDisplay || undefined,
            street:        shipping.street  || undefined,
            number:        shipping.number  || undefined,
            floor:         shipping.floor   || undefined,
            apt:           shipping.apt     || undefined,
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
    <div className="grid md:grid-cols-2 gap-8">

      {/* Left: contact + shipping + items */}
      <div className="flex flex-col gap-6">

        {/* Contact */}
        <div className="flex flex-col gap-2">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400">Contacto</h3>
          <div className="border border-gray-200 p-4 flex flex-col gap-1 text-sm">
            <p>{contact.firstName} {contact.lastName}</p>
            <p className="text-gray-500">{contact.email}</p>
            <p className="text-gray-500">({contact.phoneArea}) {contact.phoneNumber}</p>
          </div>
        </div>

        {/* Shipping */}
        <div className="flex flex-col gap-2">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400">Envío</h3>
          <div className="border border-gray-200 p-4 flex flex-col gap-1 text-sm">
            <p className="font-medium">
              {shipping.method ? METHOD_LABEL[shipping.method] : "—"}
              {shipping.service ? ` · ${SERVICE_LABEL[shipping.service]}` : ""}
            </p>
            <p className="text-gray-500">{formatShippingLine(location, shipping)}</p>
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
      <div className="flex flex-col gap-4">
        <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400">Total</h3>
        <div className="border border-gray-200 p-5 flex flex-col gap-3">
          <div className="flex flex-col gap-1.5 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Subtotal</span>
              <span>${subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Envío</span>
              <span>${shippingCost.toLocaleString()}</span>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-3 flex justify-between font-semibold">
            <span>Total</span>
            <span>${total.toLocaleString()}</span>
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

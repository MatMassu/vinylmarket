"use client";

import { useEffect } from "react";
import { loadMercadoPago } from "@mercadopago/sdk-js";

export default function MPDeviceFingerprint() {
  useEffect(() => {
    loadMercadoPago().then(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      new (window as any).MercadoPago(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY!);
    });
  }, []);

  return null;
}

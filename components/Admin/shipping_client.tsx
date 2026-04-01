"use client";

import { useEffect, useState } from "react";

type WindowOrder = {
  ID: string;
  ShippingType: string;
  ContentValue: number;
  Recipient: string;
  Email: string;
  Phone: string;
  Province: string;
  BranchCode: string;
  BranchDisplay?: string;
  Locality: string;
  Street: string;
  StreetNumber: string;
  Floor: string;
  Apt: string;
  PostalCode: string;
  HeightCm: number;
  WeightKg: number;
};

type WindowData = {
  window_id: number;
  window_open: boolean;
  window_opened: string;
  correo: WindowOrder[] | null;
  local: string[] | null;
};

function methodLabel(type: string) {
  const map: Record<string, string> = {
    branch_ep: "Sucursal · Expreso",
    branch_cp: "Sucursal · Clásico",
    door_ep: "Domicilio · Expreso",
    door_cp: "Domicilio · Clásico",
  };
  return map[type] ?? type;
}

function shortID(id: string) {
  return id.slice(0, 8).toUpperCase();
}

export default function ShippingClient() {
  const [data, setData] = useState<WindowData | null>(null);
  const [loading, setLoading] = useState(true);
  const [closing, setClosing] = useState(false);
  const [removing, setRemoving] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/shipping", { cache: "no-store" });
      if (!res.ok) throw new Error(await res.text());
      setData(await res.json());
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleClose() {
    if (
      !confirm(
        "¿Cerrar la ventana actual y enviar el CSV por email? Esta acción no se puede deshacer.",
      )
    )
      return;
    setClosing(true);
    try {
      const res = await fetch("/api/admin/shipping?action=close", {
        method: "POST",
      });
      if (!res.ok) throw new Error(await res.text());
      await load();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Error al cerrar ventana");
    } finally {
      setClosing(false);
    }
  }

  async function handleRemove(orderId: string) {
    if (!confirm(`¿Quitar orden #${shortID(orderId)} del CSV? Deberás manejarla manualmente.`))
      return;
    setRemoving(orderId);
    try {
      const res = await fetch(`/api/admin/shipping/${orderId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error(await res.text());
      setData((prev) =>
        prev
          ? {
              ...prev,
              correo: prev.correo?.filter((o) => o.ID !== orderId) ?? null,
            }
          : prev,
      );
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Error al quitar orden");
    } finally {
      setRemoving(null);
    }
  }

  const correo = data?.correo ?? [];
  const local = data?.local ?? [];
  const hasOrders = correo.length > 0 || local.length > 0;

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-mono text-sm">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold">Ventana de envíos</h1>
            {!loading && (
              data?.window_open
                ? <span className="flex items-center gap-1.5 text-xs text-green-700 bg-green-50 border border-green-200 px-2 py-1 rounded">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
                    Abierta desde {data.window_opened}
                  </span>
                : <span className="flex items-center gap-1.5 text-xs text-red-700 bg-red-50 border border-red-200 px-2 py-1 rounded">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />
                    Sin ventana abierta
                  </span>
            )}
          </div>
          <div className="flex gap-3">
            {correo.length > 0 && (
              <a
                href="/api/admin/shipping/csv"
                className="rounded bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-300"
              >
                Descargar CSV
              </a>
            )}
            <button
              onClick={handleClose}
              disabled={closing || !hasOrders}
              className="rounded bg-black px-4 py-2 text-white disabled:opacity-40 hover:bg-gray-800"
            >
              {closing ? "Cerrando..." : "Cerrar ventana y enviar CSV"}
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-4 rounded border border-red-300 bg-red-50 p-3 text-red-700">
            {error}
          </div>
        )}

        {loading ? (
          <p className="text-gray-500">Cargando...</p>
        ) : (
          <>
            {/* Correo Argentino orders */}
            <section className="mb-8">
              <h2 className="mb-3 font-bold">
                Correo Argentino ({correo.length})
              </h2>
              {correo.length === 0 ? (
                <p className="text-gray-400">Sin envíos en esta ventana.</p>
              ) : (
                <div className="overflow-x-auto rounded border border-gray-200 bg-white">
                  <table className="w-full border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-gray-200 bg-gray-50 text-left">
                        <th className="p-3">Orden</th>
                        <th className="p-3">Método</th>
                        <th className="p-3">Destinatario</th>
                        <th className="p-3">Destino</th>
                        <th className="p-3 text-right">Alto (cm)</th>
                        <th className="p-3 text-right">Peso (kg)</th>
                        <th className="p-3"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {correo.map((o) => (
                        <tr
                          key={o.ID}
                          className="border-b border-gray-100 last:border-0"
                        >
                          <td className="p-3 font-bold">{shortID(o.ID)}</td>
                          <td className="p-3">{methodLabel(o.ShippingType)}</td>
                          <td className="p-3">
                            <div>{o.Recipient}</div>
                            <div className="text-gray-400">{o.Email}</div>
                            <div className="text-gray-400">{o.Phone}</div>
                          </td>
                          <td className="p-3">
                            {o.BranchCode ? (
                              <div>Suc. {o.BranchCode}</div>
                            ) : (
                              <div>
                                {o.Street} {o.StreetNumber}
                                {o.Floor && `, ${o.Floor}`}
                                {o.Apt && ` ${o.Apt}`}
                              </div>
                            )}
                            <div className="text-gray-400">
                              {o.Locality}, {o.Province.replace(/_/g, " ")}
                            </div>
                            <div className="text-gray-400">CP {o.PostalCode}</div>
                          </td>
                          <td className="p-3 text-right">
                            {Math.ceil(o.HeightCm)}
                          </td>
                          <td className="p-3 text-right">
                            {o.WeightKg.toFixed(2)}
                          </td>
                          <td className="p-3">
                            <button
                              onClick={() => handleRemove(o.ID)}
                              disabled={removing === o.ID}
                              className="text-red-500 hover:text-red-700 disabled:opacity-40"
                            >
                              {removing === o.ID ? "..." : "Quitar"}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>

            {/* Local delivery orders */}
            <section>
              <h2 className="mb-3 font-bold">
                Entregas locales ({local.length})
              </h2>
              {local.length === 0 ? (
                <p className="text-gray-400">Sin entregas locales en esta ventana.</p>
              ) : (
                <ul className="rounded border border-gray-200 bg-white p-4">
                  {local.map((id) => (
                    <li key={id} className="py-1">
                      Orden #{id.toUpperCase()}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </>
        )}
      </div>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { useCart } from "../Cart/cart_context";
import {
  getZone,
  isCABA,
  getShippingPrice,
  computePackageHeightCm,
  provinceKeyToApiName,
} from "@/lib/shipping";
import type { LocationData, ShippingData, ShippingMethod, ShippingService } from "./checkout_form_client";

type Branch = {
  code: string;
  street: string;
  number: string;
  locality: string;
  province: string;
  hours: string;
};

type Props = {
  location: LocationData;
  data: ShippingData;
  onChange: (patch: Partial<ShippingData>) => void;
  onContinue: () => void;
  onBack: () => void;
};

const base = "border border-gray-300 p-2.5 text-sm w-full outline-none focus:border-black transition-colors";
const err  = "border-red-400 focus:border-red-400";

const SERVICES: { id: ShippingService; label: string; days: string }[] = [
  { id: "EP", label: "PAQ.AR Expreso",  days: "1 a 3 días hábiles" },
  { id: "CP", label: "PAQ.AR Clásico", days: "2 a 5 días hábiles" },
];

export default function StepShipping({ location, data, onChange, onContinue, onBack }: Props) {
  const { items } = useCart();

  const zone          = getZone(location.province, location.postalCode);
  const caba          = isCABA(location.province);
  const packageHeight = computePackageHeightCm(items);
  const localPrice    = 2500;

  // Branch selector state
  const [branches,      setBranches]      = useState<Branch[]>([]);
  const [branchSearch,  setBranchSearch]  = useState(location.locality);
  const [loadingBranch, setLoadingBranch] = useState(false);
  const [branchOpen,    setBranchOpen]    = useState(false);
  const branchRef = useRef<HTMLDivElement>(null);

  // Fetch branches when province is known
  useEffect(() => {
    setLoadingBranch(true);
    fetch(`/api/branches?province=${encodeURIComponent(provinceKeyToApiName(location.province))}`)
      .then((r) => r.json())
      .then((d: Branch[]) => { setBranches(d); setLoadingBranch(false); })
      .catch(() => setLoadingBranch(false));
  }, [location.province]);

  // Close branch dropdown on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (branchRef.current && !branchRef.current.contains(e.target as Node)) {
        setBranchOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filteredBranches = branches.filter((b) =>
    b.locality.toLowerCase().includes(branchSearch.toLowerCase())
  );

  // Error state
  const [methodError,  setMethodError]  = useState("");
  const [serviceError, setServiceError] = useState("");
  const [branchError,  setBranchError]  = useState("");
  const [streetError,  setStreetError]  = useState("");
  const [numberError,  setNumberError]  = useState("");

  function selectMethod(method: ShippingMethod) {
    // Reset service+details when method changes; set cost immediately for local
    const cost = method === "local" ? localPrice : null;
    onChange({ method, service: null, branchCode: "", branchDisplay: "", street: "", number: "", floor: "", apt: "", cost });
    setMethodError("");
    setServiceError("");
    setBranchError("");
    setStreetError("");
    setNumberError("");
  }

  function selectService(service: ShippingService) {
    const correo  = data.method === "door" ? "DTD" : "BRA";
    const cost    = data.method === "local" ? 2500 : getShippingPrice(zone, service, correo, packageHeight);
    onChange({ service, cost });
    setServiceError("");
  }

  function selectBranch(branch: Branch) {
    onChange({
      branchCode:    branch.code,
      branchDisplay: `${branch.street} ${branch.number}, ${branch.locality}`,
    });
    setBranchSearch(`${branch.locality} — ${branch.street} ${branch.number}`);
    setBranchOpen(false);
    setBranchError("");
  }

  function handleContinue() {
    let ok = true;
    if (!data.method) { setMethodError("Seleccioná un método de envío."); ok = false; }
    if (data.method !== "local" && !data.service) { setServiceError("Seleccioná el tipo de servicio."); ok = false; }
    if (data.method === "branch" && !data.branchCode) { setBranchError("Seleccioná una sucursal."); ok = false; }
    if (data.method === "door" && !data.street) { setStreetError("Ingresá la calle."); ok = false; }
    if (data.method === "door" && !data.number) { setNumberError("Ingresá el número."); ok = false; }
    if (ok) onContinue();
  }

  return (
    <form
      className={`flex flex-col gap-6 ${branchOpen ? "pb-48" : ""}`}
      onSubmit={(e) => { e.preventDefault(); handleContinue(); }}
    >
      {/* ── Method selector ─────────────────────────────── */}
      <div className="flex flex-col gap-2">
        {caba && (
          <MethodCard
            selected={data.method === "local"}
            onClick={() => selectMethod("local")}
            label="Envío local"
            description="A domicilio los lunes y jueves, coordinado por WhatsApp."
            priceLabel={`$${localPrice.toLocaleString()}`}
          />
        )}
        <MethodCard
          selected={data.method === "branch"}
          onClick={() => selectMethod("branch")}
          label="Retiro en sucursal"
          description="Retirá en una sucursal de Correo Argentino."
          priceLabel={data.method === "branch" && data.service
            ? `$${getShippingPrice(zone, data.service, "BRA", packageHeight).toLocaleString()}`
            : "Ver opciones"}
        />
        <MethodCard
          selected={data.method === "door"}
          onClick={() => selectMethod("door")}
          label="Envío a domicilio"
          description="Entrega puerta a puerta a través de PAQ.AR."
          priceLabel={data.method === "door" && data.service
            ? `$${getShippingPrice(zone, data.service, "DTD", packageHeight).toLocaleString()}`
            : "Ver opciones"}
        />
        {methodError && <p className="text-red-500 text-xs">{methodError}</p>}
      </div>

      {/* ── Service selector (branch or door) ───────────── */}
      {data.method && data.method !== "local" && (
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Tipo de servicio</p>
          {SERVICES.map(({ id, label, days }) => {
            const correo = data.method === "door" ? "DTD" : "BRA";
            const price  = getShippingPrice(zone, id, correo, packageHeight);
            return (
              <ServiceCard
                key={id}
                selected={data.service === id}
                onClick={() => selectService(id)}
                label={label}
                days={days}
                price={price}
              />
            );
          })}
          {serviceError && <p className="text-red-500 text-xs">{serviceError}</p>}
        </div>
      )}

      {/* ── Branch selector ──────────────────────────────── */}
      {data.method === "branch" && data.service && (
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Sucursal</p>
          <div className="relative" ref={branchRef}>
            <input
              placeholder="Buscar por localidad..."
              value={branchSearch}
              onChange={(e) => {
                setBranchSearch(e.target.value);
                onChange({ branchCode: "", branchDisplay: "" });
                setBranchOpen(true);
              }}
              onFocus={() => setBranchOpen(true)}
              className={`${base} ${branchError && !data.branchCode ? err : ""}`}
            />
            {branchOpen && (
              <div className="absolute z-10 w-full shadow-md border border-gray-200">
              <ul className="bg-white max-h-56 overflow-y-auto">
                {loadingBranch ? (
                  <li className="px-3 py-2 text-sm text-gray-400">Cargando...</li>
                ) : filteredBranches.length === 0 ? (
                  <li className="px-3 py-2 text-sm text-gray-400">Sin resultados.</li>
                ) : (
                  filteredBranches.slice(0, 50).map((b) => (
                    <li
                      key={b.code}
                      onClick={() => selectBranch(b)}
                      className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-50 flex flex-col gap-0.5"
                    >
                      <span className="font-medium">{b.locality} — {b.street} {b.number}</span>
                      <span className="text-xs text-gray-400">{b.hours}</span>
                    </li>
                  ))
                )}
              </ul>
              {/* Fade indicates overflow below */}
              <div className="h-6 bg-gradient-to-t from-white to-transparent pointer-events-none" />
              </div>
            )}
          </div>
          {branchError && !data.branchCode && (
            <p className="text-red-500 text-xs">{branchError}</p>
          )}
        </div>
      )}

      {/* ── Door-to-door address ─────────────────────────── */}
      {data.method === "door" && data.service && (
        <div className="flex flex-col gap-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Dirección de entrega</p>
          <div className="flex gap-2">
            <div className="flex flex-col gap-1 flex-[2]">
              <input
                placeholder="Calle (*)"
                value={data.street}
                onChange={(e) => { onChange({ street: e.target.value }); setStreetError(""); }}
                className={`${base} ${streetError ? err : ""}`}
              />
              {streetError && <p className="text-red-500 text-xs">{streetError}</p>}
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <input
                placeholder="Número (*)"
                value={data.number}
                onChange={(e) => { onChange({ number: e.target.value }); setNumberError(""); }}
                className={`${base} ${numberError ? err : ""}`}
              />
              {numberError && <p className="text-red-500 text-xs">{numberError}</p>}
            </div>
          </div>
          <div className="flex gap-2">
            <input
              placeholder="Piso"
              value={data.floor}
              onChange={(e) => onChange({ floor: e.target.value })}
              className={`${base} flex-1`}
            />
            <input
              placeholder="Depto"
              value={data.apt}
              onChange={(e) => onChange({ apt: e.target.value })}
              className={`${base} flex-1`}
            />
          </div>
        </div>
      )}

      {/* ── Dispatch footnote ────────────────────────────── */}
      {data.method && data.method !== "local" && (
        <p className="text-xs text-gray-400 border border-gray-100 p-3">
          * Los envíos son despachados todos los días a las 4pm. Las compras realizadas
          después de las 4pm se despachan al día siguiente. Recibirás más información
          sobre la fecha estimada de entrega en el mail de confirmación.
        </p>
      )}

      <div className="flex gap-2">
        <button
          type="button"
          onClick={onBack}
          className="cursor-pointer border border-gray-300 text-sm px-4 p-2.5 hover:bg-gray-100 transition-colors"
        >
          ← Volver
        </button>
        <button
          type="submit"
          className="cursor-pointer flex-1 bg-black text-white text-sm font-medium p-2.5 hover:bg-gray-800 transition-colors"
        >
          Continuar →
        </button>
      </div>
    </form>
  );
}

// ── Sub-components ──────────────────────────────────────────────────────────

function MethodCard({
  selected, onClick, label, description, priceLabel,
}: {
  selected: boolean;
  onClick: () => void;
  label: string;
  description: string;
  priceLabel: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "flex items-start justify-between gap-4 p-4 text-left transition-colors cursor-pointer",
        selected ? "border-2 border-black" : "border border-gray-200 hover:border-gray-400",
      ].join(" ")}
    >
      <div className="flex items-start gap-3">
        <span className={[
          "mt-0.5 w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center",
          selected ? "border-black" : "border-gray-300",
        ].join(" ")}>
          {selected && <span className="w-2 h-2 rounded-full bg-black" />}
        </span>
        <div>
          <p className="text-sm font-semibold">{label}</p>
          <p className="text-xs text-gray-500 mt-0.5">{description}</p>
        </div>
      </div>
      <span className="text-xs font-medium shrink-0 mt-0.5 text-gray-600">{priceLabel}</span>
    </button>
  );
}

function ServiceCard({
  selected, onClick, label, days, price,
}: {
  selected: boolean;
  onClick: () => void;
  label: string;
  days: string;
  price: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "flex items-center justify-between gap-4 p-4 text-left transition-colors cursor-pointer",
        selected ? "border-2 border-black" : "border border-gray-200 hover:border-gray-400",
      ].join(" ")}
    >
      <div className="flex items-center gap-3">
        <span className={[
          "w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center",
          selected ? "border-black" : "border-gray-300",
        ].join(" ")}>
          {selected && <span className="w-2 h-2 rounded-full bg-black" />}
        </span>
        <div>
          <p className="text-sm font-semibold">{label}</p>
          <p className="text-xs text-gray-500">{days}*</p>
        </div>
      </div>
      <span className="text-sm font-semibold shrink-0">${price.toLocaleString()}</span>
    </button>
  );
}

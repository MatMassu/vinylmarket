"use client";

import { useState } from "react";
import provinces from "@/data/provinces.json";
import { provinceNameToKey, provinceKeyToDisplay, validatePostalCode } from "@/lib/shipping";
import type { LocationData } from "./checkout_form_client";

// Build sorted dropdown options from provinces.json
const PROVINCE_OPTIONS = provinces
  .map((p) => ({
    key: provinceNameToKey(p.name),       // e.g. "CAPITAL_FEDERAL"
    display: provinceKeyToDisplay(provinceNameToKey(p.name)), // e.g. "Capital Federal"
  }))
  .sort((a, b) => a.display.localeCompare(b.display, "es"));

type Props = {
  data: LocationData;
  onChange: (patch: Partial<LocationData>) => void;
  onContinue: () => void;
  onBack: () => void;
};

const inputClass =
  "border border-gray-300 p-2.5 text-sm w-full outline-none focus:border-black transition-colors";
const errClass = "border-red-400 focus:border-red-400";

export default function StepLocation({ data, onChange, onContinue, onBack }: Props) {
  const [postalError, setPostalError] = useState<string | null>(null);
  const [localityError, setLocalityError] = useState(false);
  const [provinceError, setProvinceError] = useState(false);

  function handleProvinceChange(key: string) {
    const display = PROVINCE_OPTIONS.find((p) => p.key === key)?.display ?? "";
    onChange({ province: key, provinceName: display });
    setProvinceError(false);
    // Re-validate postal code if already entered
    if (data.postalCode) {
      setPostalError(validatePostalCode(data.postalCode, key));
    }
  }

  function handlePostalBlur() {
    if (!data.postalCode) return;
    setPostalError(validatePostalCode(data.postalCode, data.province));
  }

  const isCABA = data.province === "CAPITAL_FEDERAL";

  function handleContinue() {
    const pErr = !data.province;
    const lErr = !isCABA && !data.locality.trim();
    const cpErr = validatePostalCode(data.postalCode, data.province);

    setProvinceError(pErr);
    setLocalityError(lErr);
    setPostalError(cpErr);

    if (pErr || lErr || cpErr) return;
    onContinue();
  }

  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={(e) => { e.preventDefault(); handleContinue(); }}
    >
      <div className="flex flex-col gap-3">
        {/* Province */}
        <div className="flex flex-col gap-1">
          <select
            value={data.province}
            onChange={(e) => handleProvinceChange(e.target.value)}
            className={`${inputClass} bg-white ${provinceError ? errClass : ""}`}
          >
            <option value="">Provincia (*)</option>
            {PROVINCE_OPTIONS.map((p) => (
              <option key={p.key} value={p.key}>
                {p.display}
              </option>
            ))}
          </select>
          {provinceError && (
            <p className="text-red-500 text-xs">Seleccioná una provincia.</p>
          )}
        </div>

        {/* Locality — hidden for CABA */}
        {!isCABA && (
          <div className="flex flex-col gap-1">
            <input
              placeholder="Localidad (*)"
              value={data.locality}
              onChange={(e) => { onChange({ locality: e.target.value }); setLocalityError(false); }}
              className={`${inputClass} ${localityError ? errClass : ""}`}
            />
            {localityError && (
              <p className="text-red-500 text-xs">Ingresá tu localidad.</p>
            )}
          </div>
        )}

        {/* Postal code */}
        <div className="flex flex-col gap-1">
          <input
            placeholder="Código postal (*)"
            value={data.postalCode}
            onChange={(e) => { onChange({ postalCode: e.target.value }); setPostalError(null); }}
            onBlur={handlePostalBlur}
            maxLength={4}
            inputMode="numeric"
            className={`${inputClass} ${postalError ? errClass : ""}`}
          />
          {postalError ? (
            <p className="text-red-500 text-xs">{postalError}</p>
          ) : (
            <p className="text-xs text-gray-400">
              ¿No sabés tu código postal?{" "}
              <a
                href="https://www.correoargentino.com.ar/formularios/cpa"
                target="_blank"
                rel="noreferrer"
                className="underline hover:text-gray-600 transition-colors"
              >
                Consultalo aquí
              </a>
            </p>
          )}
        </div>
      </div>

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

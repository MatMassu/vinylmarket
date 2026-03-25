"use client";

import type { ShippingData, ShippingMethod, ShippingErrors } from "./checkout_form_client";

type Props = {
  data: ShippingData;
  errors: ShippingErrors;
  onChange: (patch: Partial<ShippingData>) => void;
  onContinue: () => void;
  onBack: () => void;
};

const METHODS: { id: ShippingMethod; label: string; description: string; price: string }[] = [
  {
    id: "local",
    label: "Envío local gratuito",
    description: "Martes y viernes en el área de entrega.",
    price: "Sin cargo",
  },
  {
    id: "branch",
    label: "Retiro en sucursal",
    description: "Retirá en una sucursal cercana.",
    price: "",
  },
  {
    id: "door",
    label: "Envío a domicilio",
    description: "Entrega puerta a puerta a través de PAQ.AR.",
    price: "",
  },
];

const base  = "border border-gray-300 p-2.5 text-sm w-full outline-none focus:border-black transition-colors";
const err   = "border-red-400 focus:border-red-400";

function Field({
  placeholder, value, onChange, error, className = "",
}: {
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${base} ${error ? err : ""}`}
      />
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
}

export default function StepShipping({ data, errors, onChange, onContinue, onBack }: Props) {
  return (
    <form
      className="flex flex-col gap-6 max-w-md"
      onSubmit={(e) => { e.preventDefault(); onContinue(); }}
    >
      {/* Method selector */}
      <div className="flex flex-col gap-2">
        {METHODS.map(({ id, label, description, price }) => {
          const selected = data.method === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onChange({ method: id })}
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
              <span className={[
                "text-xs font-medium shrink-0 mt-0.5",
                price === "Sin cargo" ? "text-emerald-600" : "text-gray-500",
              ].join(" ")}>
                {price}
              </span>
            </button>
          );
        })}
        {errors.method && <p className="text-red-500 text-xs">{errors.method}</p>}
      </div>

      {/* Local address */}
      {data.method === "local" && (
        <div className="flex flex-col gap-3">
          <p className="text-xs text-gray-500 border border-gray-200 p-3">
            Verificá que tu barrio esté incluido antes de continuar.
            Te contactaremos por WhatsApp para coordinar el día y horario.
          </p>
          <div className="flex gap-2">
            <Field
              placeholder="Calle (*)"
              value={data.street}
              onChange={(v) => onChange({ street: v })}
              error={errors.street}
              className="flex-[2]"
            />
            <Field
              placeholder="Número (*)"
              value={data.number}
              onChange={(v) => onChange({ number: v })}
              error={errors.number}
              className="flex-1"
            />
          </div>
          <div className="flex gap-2">
            <input placeholder="Piso"  value={data.floor} onChange={(e) => onChange({ floor: e.target.value })} className={`${base} flex-1`} />
            <input placeholder="Depto" value={data.apt}   onChange={(e) => onChange({ apt:   e.target.value })} className={`${base} flex-1`} />
          </div>
          <Field
            placeholder="Barrio (*)"
            value={data.neighborhood}
            onChange={(v) => onChange({ neighborhood: v })}
            error={errors.neighborhood}
          />
        </div>
      )}

      {/* Branch address */}
      {data.method === "branch" && (
        <div className="flex flex-col gap-3">
          <p className="text-xs text-gray-500 border border-gray-200 p-3">
            Ingresá tu provincia y localidad para ver las sucursales disponibles.
          </p>
          <Field
            placeholder="Provincia (*)"
            value={data.province}
            onChange={(v) => onChange({ province: v })}
            error={errors.province}
          />
          <Field
            placeholder="Localidad (*)"
            value={data.neighborhood}
            onChange={(v) => onChange({ neighborhood: v })}
            error={errors.neighborhood}
          />
        </div>
      )}

      {/* Door-to-door address */}
      {data.method === "door" && (
        <div className="flex flex-col gap-3">
          <Field
            placeholder="Provincia (*)"
            value={data.province}
            onChange={(v) => onChange({ province: v })}
            error={errors.province}
          />
          <Field
            placeholder="Localidad (*)"
            value={data.neighborhood}
            onChange={(v) => onChange({ neighborhood: v })}
            error={errors.neighborhood}
          />
          <div className="flex gap-2">
            <Field
              placeholder="Calle (*)"
              value={data.street}
              onChange={(v) => onChange({ street: v })}
              error={errors.street}
              className="flex-[2]"
            />
            <Field
              placeholder="Número (*)"
              value={data.number}
              onChange={(v) => onChange({ number: v })}
              error={errors.number}
              className="flex-1"
            />
          </div>
          <div className="flex gap-2">
            <input placeholder="Piso"  value={data.floor} onChange={(e) => onChange({ floor: e.target.value })} className={`${base} flex-1`} />
            <input placeholder="Depto" value={data.apt}   onChange={(e) => onChange({ apt:   e.target.value })} className={`${base} flex-1`} />
          </div>
          <div className="flex flex-col gap-1">
            <Field
              placeholder="Código Postal (*)"
              value={data.zip}
              onChange={(v) => onChange({ zip: v })}
              error={errors.zip}
            />
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
          </div>
        </div>
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

import type { ContactData } from "./checkout_form_client";

type Props = {
  data: ContactData;
  emailError?: boolean;
  phoneError?: boolean;
  onChange: (field: keyof ContactData, value: string) => void;
  onContinue: () => void;
};

const inputClass = "border border-gray-300 p-2.5 text-sm w-full outline-none focus:border-black transition-colors";
const errorClass = "border-red-400 focus:border-red-400";

export default function Contact({ data, emailError, phoneError, onChange, onContinue }: Props) {
  return (
    <form
      className="flex flex-col gap-6 max-w-md"
      onSubmit={(e) => { e.preventDefault(); onContinue(); }}
    >
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <input
            placeholder="Email (*)"
            type="email"
            value={data.email}
            onChange={(e) => onChange("email", e.target.value)}
            className={`${inputClass} ${emailError ? errorClass : ""}`}
          />
          {emailError && <p className="text-red-500 text-xs">Ingresá un email válido.</p>}
        </div>

        <div className="flex gap-2">
          <input
            placeholder="Nombre"
            value={data.firstName}
            onChange={(e) => onChange("firstName", e.target.value)}
            className={`${inputClass} flex-1`}
          />
          <input
            placeholder="Apellido"
            value={data.lastName}
            onChange={(e) => onChange("lastName", e.target.value)}
            className={`${inputClass} flex-1`}
          />
        </div>

        <div className="flex flex-col gap-1">
          <input
            placeholder="Teléfono / WhatsApp (*)"
            type="tel"
            value={data.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            className={`${inputClass} ${phoneError ? errorClass : ""}`}
          />
          {phoneError && <p className="text-red-500 text-xs">Ingresá un número de teléfono.</p>}
        </div>
      </div>

      <button
        type="submit"
        className="cursor-pointer bg-black text-white text-sm font-medium p-2.5 hover:bg-gray-800 transition-colors"
      >
        Continuar →
      </button>
    </form>
  );
}

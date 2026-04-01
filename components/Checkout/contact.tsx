import type { ContactData } from "./checkout_form_client";

type Props = {
  data: ContactData;
  emailError?: boolean;
  nameError?: boolean;
  phoneAreaError?: boolean;
  phoneNumberError?: boolean;
  onChange: (field: keyof ContactData, value: string) => void;
  onContinue: () => void;
};

const inputClass =
  "border border-gray-300 p-2.5 text-sm w-full outline-none focus:border-black transition-colors";
const errorClass = "border-red-400 focus:border-red-400";

export default function Contact({
  data,
  emailError,
  nameError,
  phoneAreaError,
  phoneNumberError,
  onChange,
  onContinue,
}: Props) {
  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={(e) => {
        e.preventDefault();
        onContinue();
      }}
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
          {emailError && (
            <p className="text-xs text-red-500">
              Ingresá un email válido (ej: nombre@gmail.com).
            </p>
          )}
        </div>

        <div className="flex gap-2">
          <div className="flex flex-col gap-1 flex-1">
            <input
              placeholder="Nombre (*)"
              value={data.firstName}
              onChange={(e) => onChange("firstName", e.target.value)}
              className={`${inputClass} ${nameError ? errorClass : ""}`}
            />
            {nameError && (
              <p className="text-xs text-red-500">Ingresá tu nombre.</p>
            )}
          </div>
          <div className="flex-1 self-start">
            <input
              placeholder="Apellido"
              value={data.lastName}
              onChange={(e) => onChange("lastName", e.target.value)}
              className={`${inputClass}`}
            />
          </div>
        </div>

        {/* Phone: area code + number */}
        <div className="flex flex-col gap-1">
          <div className="flex gap-2">
            <div className="flex flex-col gap-1 w-28 shrink-0">
              <input
                placeholder="Cód. área (*)"
                type="tel"
                inputMode="numeric"
                maxLength={4}
                value={data.phoneArea}
                onChange={(e) =>
                  onChange("phoneArea", e.target.value.replace(/\D/g, ""))
                }
                className={`${inputClass} ${phoneAreaError ? errorClass : ""}`}
              />
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <input
                placeholder="Número (*)"
                type="tel"
                inputMode="numeric"
                maxLength={8}
                value={data.phoneNumber}
                onChange={(e) =>
                  onChange("phoneNumber", e.target.value.replace(/\D/g, ""))
                }
                className={`${inputClass} ${phoneNumberError ? errorClass : ""}`}
              />
            </div>
          </div>
          {phoneAreaError && (
            <p className="text-xs text-red-500">
              Código de área inválido (ej: 11, 221, 351).
            </p>
          )}
          {!phoneAreaError && phoneNumberError && (
            <p className="text-xs text-red-500">
              El número debe tener 8 dígitos.
            </p>
          )}
          <p className="text-xs text-gray-400">
            Sin el 0 del código de área ni el 15. Ej: 11 · 30671811
          </p>
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

type ContactProps = {
  email: string;
  firstName: string;
  lastName: string;
  emailError?: boolean;
  onChange: (field: "email" | "firstName" | "lastName", value: string) => void;
};

export default function Contact({ email, firstName, lastName, emailError, onChange }: ContactProps) {
  return (
    <section
      aria-labelledby="contacto-heading"
      className="flex flex-col gap-3 rounded-md border-gray-300 bg-white border p-6"
    >
      <h2 id="contacto-heading" className="font-bold select-none">
        Contacto
      </h2>
      <input
        placeholder="Email *"
        type="email"
        value={email}
        onChange={(e) => onChange("email", e.target.value)}
        className={`border border-black rounded-md p-2 text-sm ${emailError ? "border-t-2 border-t-red-500" : ""}`}
      />
      <div className="flex flex-col md:flex-row gap-2">
        <input
          placeholder="Nombre/s"
          value={firstName}
          onChange={(e) => onChange("firstName", e.target.value)}
          className="min-w-10 border border-black rounded-md md:flex-1/2 p-2 text-sm"
        />
        <input
          placeholder="Apellido/s"
          value={lastName}
          onChange={(e) => onChange("lastName", e.target.value)}
          className="min-w-10 border border-black rounded-md flex-1 md:flex-1/2 p-2 text-sm"
        />
      </div>
      <input
        placeholder="Numero de contacto"
        className="border border-black rounded-md p-2 text-sm"
      />
    </section>
  );
}

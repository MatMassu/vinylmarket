export default function Contact() {
  return (
    <section
      aria-labelledby="contacto-heading"
      className="flex flex-col gap-3 rounded-md border-gray-300 bg-white border p-6"
    >
      <h2 id="contacto-heading" className="font-bold select-none">
        Contacto
      </h2>
      <input placeholder="Email" className="border border-black rounded-md p-2 text-sm" />
      <div className="flex flex-col md:flex-row gap-2">
        <input
          placeholder="Nombre/s"
          className="min-w-10 border border-black rounded-md md:flex-1/2 p-2 text-sm"
        />
        <input
          placeholder="Apellido/s"
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

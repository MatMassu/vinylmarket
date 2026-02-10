export default function Shipping() {
  return (
    <section
      aria-labelledby="envio-heading"
      className="flex flex-col min-w-0 gap-3 rounded-md bg-white border border-gray-300 p-6"
    >
      <h2 id="envio-heading" className="font-bold select-none">
        Envío
      </h2>
      <fieldset id="envio" className="flex flex-col gap-1">
        <div className="flex gap-2">
          <input type="radio" id="andreani" value="andreani" name="envio" />
          <label htmlFor="andreani" className="text-sm select-none">
            A domicilio (Andreani)
          </label>
        </div>
        <div className="flex gap-2">
          <input type="radio" id="sucursal" value="sucursal" name="envio" className="" />
          <label htmlFor="sucursal" className="text-sm select-none">
            Retiro en sucursal
          </label>
        </div>
      </fieldset>
      <input placeholder="Provincia" className="border border-black rounded-md p-2 text-sm" />
      <input
        placeholder="Localidad/Barrio"
        className="border border-black rounded-md p-2 text-sm"
      />
      <input placeholder="Calle" className="border border-black rounded-md p-2 text-sm" />
      <div className="flex gap-2">
        <input
          placeholder="Altura"
          className="min-w-10 border border-black rounded-md flex-1/2 p-2 text-sm"
        />
        <input
          placeholder="Código Postal"
          className="min-w-10 border border-black rounded-md flex-1/2 p-2 text-sm"
        />
      </div>
    </section>
  );
}

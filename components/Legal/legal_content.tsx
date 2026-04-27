"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

type Section = { id: string; title: string };

const SECTIONS: Section[] = [
  { id: "terminos",   title: "Términos y condiciones" },
  { id: "privacidad", title: "Privacidad" },
  { id: "devoluciones", title: "Devoluciones" },
];

function Heading2({ children }: { children: React.ReactNode }) {
  return <h2 className="text-base xl:text-lg font-semibold mt-8 mb-2">{children}</h2>;
}
function P({ children }: { children: React.ReactNode }) {
  return <p className="text-sm xl:text-base text-gray-700 leading-relaxed mb-3">{children}</p>;
}
function Ul({ children }: { children: React.ReactNode }) {
  return <ul className="list-disc pl-5 mb-3 flex flex-col gap-1 text-sm xl:text-base text-gray-700 leading-relaxed">{children}</ul>;
}

export default function LegalContent({ initialSection }: { initialSection?: string }) {
  const [active, setActive] = useState(initialSection ?? "terminos");
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    for (const id of SECTIONS.map((s) => s.id)) {
      const el = sectionRefs.current[id];
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  function scrollTo(id: string) {
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="flex gap-12">

      {/* Sticky sidebar — desktop only */}
      <aside className="hidden lg:flex flex-col gap-1 w-52 shrink-0 pt-1">
        <div className="sticky top-6 flex flex-col gap-1">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className={`cursor-pointer text-left text-sm px-3 py-2 transition-colors ${
                active === s.id
                  ? "bg-black text-white"
                  : "text-gray-500 hover:text-black"
              }`}
            >
              {s.title}
            </button>
          ))}
        </div>
      </aside>

      {/* Mobile nav */}
      <div className="lg:hidden w-full mb-2">
        <select
          value={active}
          onChange={(e) => { setActive(e.target.value); scrollTo(e.target.value); }}
          className="w-full border border-gray-300 bg-white p-2.5 text-sm outline-none focus:border-black"
        >
          {SECTIONS.map((s) => (
            <option key={s.id} value={s.id}>{s.title}</option>
          ))}
        </select>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">

        {/* ── Términos y condiciones ── */}
        <section
          id="terminos"
          ref={(el) => { sectionRefs.current.terminos = el; }}
          className="scroll-mt-6 pb-12 border-b border-gray-200"
        >
          <h1 className="text-xl xl:text-2xl font-semibold mb-1">Términos y condiciones</h1>
          <p className="text-xs text-gray-400 mb-6">Última actualización: abril 2025</p>

          <Heading2>1. Datos del vendedor</Heading2>
          <P>Responsable: Matias Massucco — CUIL 20-41758431-6<br />
            Domicilio: Cuenca 2040, Piso 15, Dpto. A, CP 1416, CABA, Argentina<br />
            Contacto: altillo.massucco@gmail.com / WhatsApp (011) 3067-1811</P>

          <Heading2>2. Objeto</Heading2>
          <P>Este sitio ofrece la venta de vinilos de segunda mano pertenecientes a una colección particular. Cada producto es una pieza única; no se cuenta con stock de reposición.</P>

          <Heading2>3. Precios y medios de pago</Heading2>
          <P>Todos los precios están expresados en pesos argentinos (ARS) y corresponden al precio final al consumidor. El pago se procesa a través de MercadoPago. Altillo Massucco no almacena datos de tarjetas ni información de pago.</P>

          <Heading2>4. Disponibilidad y confirmación</Heading2>
          <P>La compra queda confirmada una vez acreditado el pago. Dado que los productos son únicos, no se garantiza disponibilidad hasta ese momento. Si un producto no estuviera disponible al momento del pago, se contactará al comprador para coordinar un reembolso completo.</P>

          <Heading2>5. Envíos</Heading2>
          <P>Los envíos se realizan a través de Correo Argentino (PAQ.AR) desde CABA, los días hábiles después de las 16:00 hs.</P>
          <Ul>
            <li>Compras confirmadas antes de las 16:00 hs: despacho el mismo día hábil.</li>
            <li>Compras confirmadas después de las 16:00 hs: despacho el siguiente día hábil.</li>
          </Ul>
          <P>Los plazos de entrega son los establecidos por Correo Argentino según destino y modalidad. Altillo Massucco no se responsabiliza por demoras atribuibles al servicio de correo una vez despachado el paquete. También se ofrece entrega en mano en CABA, a coordinar por WhatsApp.</P>

          <Heading2>6. Estado de los productos</Heading2>
          <P>Todos los vinilos son usados y están descritos según el estándar Goldmine Grading Guide. Se recomienda leer la descripción completa antes de comprar.</P>

          <Heading2>7. Limitación de responsabilidad</Heading2>
          <P>Altillo Massucco no se responsabiliza por daños producidos durante el transporte una vez entregado el paquete al servicio de correo, siempre que el embalaje haya sido adecuado. Se considera embalaje adecuado aquel en que los contenidos están recubiertos por polietileno con burbuja y almacenados en caja de cartón corrugado sellada con cinta de embalaje. En caso de daño en tránsito, se asistirá al comprador en el reclamo ante Correo Argentino.</P>

          <Heading2>8. Legislación aplicable</Heading2>
          <P>Estas condiciones se rigen por las leyes de la República Argentina, incluyendo la Ley 24.240 de Defensa del Consumidor y sus modificatorias.</P>
        </section>

        {/* ── Privacidad ── */}
        <section
          id="privacidad"
          ref={(el) => { sectionRefs.current.privacidad = el; }}
          className="scroll-mt-6 py-12 border-b border-gray-200"
        >
          <h1 className="text-xl xl:text-2xl font-semibold mb-1">Política de privacidad</h1>
          <p className="text-xs text-gray-400 mb-6">Última actualización: abril 2025</p>

          <Heading2>1. Responsable del tratamiento</Heading2>
          <P>Matias Massucco — CUIL 20-41758431-6<br />
            Cuenca 2040, Piso 15, Dpto. A, CP 1416, CABA, Argentina<br />
            altillo.massucco@gmail.com</P>

          <Heading2>2. Qué datos recopilamos</Heading2>
          <P>Al realizar una compra o enviar un mensaje de contacto, recopilamos:</P>
          <Ul>
            <li>Nombre y apellido</li>
            <li>Dirección de correo electrónico</li>
            <li>Número de teléfono</li>
            <li>Dirección de envío (provincia, localidad, código postal, calle y número)</li>
          </Ul>
          <P>No recopilamos datos de pago: ese proceso es gestionado íntegramente por MercadoPago. El sitio utiliza Vercel Analytics para medir rendimiento técnico; esta herramienta no utiliza cookies ni recopila datos personales identificables.</P>

          <Heading2>3. Para qué usamos tus datos</Heading2>
          <P>Los datos recopilados se utilizan exclusivamente para:</P>
          <Ul>
            <li>Procesar y gestionar tu compra</li>
            <li>Coordinar el envío del producto</li>
            <li>Responder consultas enviadas a través del formulario de contacto</li>
            <li>Cumplir con obligaciones legales</li>
          </Ul>
          <P>No compartimos tus datos con terceros, salvo con MercadoPago y Correo Argentino en la medida necesaria para operar, y en los casos exigidos por ley.</P>

          <Heading2>4. Por cuánto tiempo conservamos tus datos</Heading2>
          <P>Los datos de compra se conservan por el tiempo que exigen las obligaciones contables e impositivas vigentes en Argentina (mínimo 5 años). Los mensajes de contacto se conservan mientras sean relevantes para gestionar la consulta.</P>

          <Heading2>5. Tus derechos</Heading2>
          <P>De acuerdo con la Ley 25.326, tenés derecho a acceder, rectificar y solicitar la eliminación de tus datos personales. Para ejercer estos derechos, escribinos a altillo.massucco@gmail.com con el asunto "Datos personales".</P>

          <Heading2>6. Registro AAIP</Heading2>
          <P>Inscripción ante la Agencia de Acceso a la Información Pública: en trámite.</P>
        </section>

        {/* ── Devoluciones ── */}
        <section
          id="devoluciones"
          ref={(el) => { sectionRefs.current.devoluciones = el; }}
          className="scroll-mt-6 pt-12"
        >
          <h1 className="text-xl xl:text-2xl font-semibold mb-1">Devoluciones y arrepentimiento</h1>
          <p className="text-xs text-gray-400 mb-6">Última actualización: abril 2025</p>

          <Heading2>1. Derecho de arrepentimiento</Heading2>
          <P>De acuerdo con el artículo 34 de la Ley 24.240 y la Resolución 424/2020, tenés derecho a arrepentirte de tu compra dentro de los 10 días corridos desde que recibiste el producto, sin necesidad de dar ningún motivo.</P>

          <Heading2>2. Cómo ejercer el derecho</Heading2>
          <P>Para iniciar una devolución, completá el{" "}
            <Link href="/contacto?motivo=arrepentimiento" className="underline hover:text-gray-900 transition-colors">
              formulario de contacto
            </Link>{" "}
            indicando tu nombre completo y número de orden (figura en el email de confirmación). Nos comunicaremos dentro de las 48 horas hábiles para coordinar la devolución y el reembolso.</P>

          <Heading2>3. Condiciones</Heading2>
          <Ul>
            <li>El plazo para solicitar la devolución es de 10 días corridos desde la recepción del producto.</li>
            <li>El producto debe devolverse en el mismo estado en que fue recibido.</li>
            <li>La devolución del envío se coordina por nuestra cuenta — no debés abonar ningún costo.</li>
          </Ul>

          <Heading2>4. Reembolso</Heading2>
          <P>Una vez recibido el producto y verificado su estado, se reembolsará el precio de compra más el costo de envío original, a través del mismo medio de pago utilizado. El plazo de acreditación puede demorar entre 3 y 15 días hábiles según el medio de pago.</P>

          <Heading2>5. Excepciones</Heading2>
          <P>No aplica el derecho de arrepentimiento en los casos previstos por el artículo 34 de la Ley 24.240 (por ejemplo, productos con uso evidente posterior a la recepción que los haya deteriorado).</P>

          <Heading2>6. Productos dañados en el envío</Heading2>
          <P>Si el producto llega dañado, contactanos dentro de las 48 horas de recibido con fotos del embalaje y el producto. Gestionaremos el reclamo ante Correo Argentino y coordinaremos una solución.</P>

          <div className="mt-8 border border-gray-300 bg-white px-5 py-4 flex flex-col gap-1.5">
            <p className="text-sm xl:text-base font-medium">¿Querés iniciar una devolución?</p>
            <p className="text-sm xl:text-base text-gray-600">
              Usá el{" "}
              <Link href="/contacto?motivo=arrepentimiento" className="underline hover:text-gray-900 transition-colors">
                botón de arrepentimiento
              </Link>{" "}
              para enviarnos tu solicitud.
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}

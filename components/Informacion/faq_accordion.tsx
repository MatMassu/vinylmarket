"use client";

import { useState } from "react";

type Item = { q: string; a: React.ReactNode };

const ITEMS: Item[] = [
  {
    q: "¿Cómo se calcula el precio de cada vinilo?",
    a: (
      <div className="flex flex-col gap-3">
        <p>
          El precio de cada vinilo se define combinando dos aspectos clave:
        </p>
        <ul className="flex flex-col gap-1.5 pl-4">
          <li>
            <strong>Análisis de mercado:</strong> tomamos como referencia valores reales de mercado
            (ventas recientes, disponibilidad y demanda) para establecer un precio base.
          </li>
          <li>
            <strong>Estado de conservación:</strong> sobre esa base, ajustamos el valor según la
            condición del disco, la tapa y los materiales incluidos (sobres, folletos, inserts,
            etc.), utilizando el estándar{" "}
            <a
              href="https://www.goldminemag.com/collector-resources/record-grading-101/"
              target="_blank"
              rel="noreferrer"
              className="underline hover:text-gray-600 transition-colors"
            >
              Goldmine Grading Guide
            </a>
            .
          </li>
        </ul>
        <p>
          De esta forma, buscamos que el precio refleje tanto el valor del mercado como el estado
          real de cada pieza.
        </p>
      </div>
    ),
  },
  {
    q: "¿Qué significa cada graduación del Goldmine Grading Guide?",
    a: (
      <div className="flex flex-col gap-3">
        <p>
          Las graduaciones describen el estado del vinilo de forma precisa. Cada graduación implica
          un estado de tapa o disco:
        </p>
        <ul className="flex flex-col gap-3">
          {[
            { grade: "Mint (M)", desc: "Nuevo, sin uso, en estado impecable. Esta graduación es particularmente rara de encontrar.", value: "100% o más del precio base" },
            { grade: "Near Mint (NM)", desc: "Casi perfecto, sin marcas visibles ni ruido perceptible.", value: "90% – 100%" },
            { grade: "Very Good Plus (VG+)", desc: "Uso leve, con detalles mínimos que no afectan significativamente la experiencia.", value: "70% – 85%" },
            { grade: "Very Good (VG)", desc: "Señales claras de uso. Es la graduación más común en vinilos de colección, con una cantidad de ruido superficial esperable pero igualmente disfrutable.", value: "50% – 70%" },
            { grade: "Good (G) / Good Plus (G+)", desc: "Desgaste notable, con ruido más presente, aunque reproducible de principio a fin.", value: "25% – 50%" },
            { grade: "Poor (P) / Fair (F)", desc: "Estado muy deteriorado, igualmente reproducible pero con fallas importantes que pueden alterar la experiencia.", value: "Menos del 25%" },
          ].map(({ grade, desc, value }) => (
            <li key={grade} className="flex flex-col gap-0.5 pl-4 border-l-2 border-gray-200">
              <span className="font-semibold text-sm">{grade}</span>
              <span className="text-sm text-gray-600">{desc}</span>
              <span className="text-xs text-gray-400">Valor estimado: {value}</span>
            </li>
          ))}
        </ul>
        <p className="text-sm text-gray-600">
          Siempre evaluamos tanto el disco como su presentación completa, por lo que asignamos una
          graduación separada al disco y a la tapa, siendo la del disco la que mayor impacto tiene
          en el precio final.
        </p>
      </div>
    ),
  },
  {
    q: "¿Cómo se preparan y cuidan los vinilos antes del envío?",
    a: (
      <div className="flex flex-col gap-3">
        <p>
          Cada vinilo pasa por un proceso de limpieza y preparación pensado para que llegue en las
          mejores condiciones posibles:
        </p>
        <ul className="flex flex-col gap-2 pl-4">
          <li><strong>Separación de componentes:</strong> disco, tapa, sobres e inserts se manipulan por separado.</li>
          <li><strong>Tapa y materiales impresos:</strong> se limpian suavemente con microfibra apenas humedecida, se secan y se dejan ventilar.</li>
          <li>
            <strong>Disco:</strong>
            <ul className="flex flex-col gap-1 pl-4 mt-1 text-gray-600">
              <li>Cepillado inicial siguiendo los surcos para remover partículas.</li>
              <li>Aplicación ligera de una solución de alcohol isopropílico y agua destilada (1:9).</li>
              <li>Limpieza con paño de terciopelo, siempre en la dirección de los surcos.</li>
              <li>Secado y ventilación durante 30 minutos.</li>
            </ul>
          </li>
          <li><strong>Guardado:</strong> el disco se coloca en una funda antiestática nueva, junto a su sobre original o uno nuevo si hace falta.</li>
          <li><strong>Embalaje:</strong> protegemos cada vinilo con papel madera y lo enviamos en una caja de cartón corrugado adecuada.</li>
        </ul>
        <p className="text-sm text-gray-600">
          Es un proceso detallado y laborioso, pero hace una diferencia real en cómo llega el vinilo.
        </p>
      </div>
    ),
  },
  {
    q: "¿Cómo se manejan los envíos?",
    a: (
      <div className="flex flex-col gap-3">
        <p>
          Trabajamos con Correo Argentino y despachamos desde CABA todos los días hábiles después
          de las 4pm. Si comprás antes de las 4pm, tu envío será despachado el mismo día. Las
          compras realizadas después de las 4pm salen el siguiente día hábil.
        </p>
        <p>En ambos casos, nos comunicamos por WhatsApp para mantenerte al tanto del proceso:</p>
        <ul className="flex flex-col gap-1.5 pl-4">
          <li>Te contactamos por WhatsApp para confirmar todo.</li>
          <li>Te avisamos cuando tu envío es despachado.</li>
          <li>Recibís un número de pedido y un link de seguimiento.</li>
        </ul>
      </div>
    ),
  },
  {
    q: "¿De dónde provienen los vinilos?",
    a: (
      <p>
        Los vinilos pertenecen a una colección familiar que data desde los años 50. A lo largo del
        tiempo fue creciendo con discos comprados en distintas épocas y lugares, y también con
        colecciones heredadas de amigos y familiares. Eso hace que hoy convivan ediciones muy
        variadas: desde clásicos hasta prensados menos comunes.
        <br />
        <br />
        Más allá del precio y estado, cada disco tiene un valor único por su historia. Por eso
        tratamos cada vinilo con el mismo cuidado y cariño que merece una pieza de un museo, sin
        importar su valor monetario.
      </p>
    ),
  },
  {
    q: "¿Cómo es el proceso de pago?",
    a: (
      <p>
        El pago se realiza al finalizar el checkout, una vez que completás tus datos personales y
        de envío. Utilizamos Mercado Pago como plataforma de pago, lo que asegura una operación
        segura y transparente.
      </p>
    ),
  },
  {
    q: "¿Tienen una tienda física?",
    a: (
      <div className="flex flex-col gap-3">
        <p>
          Por el momento, la venta es exclusivamente online. La colección se encuentra en una casa
          particular, por lo que no está abierta al público. De todas formas, la idea de un local
          físico está en los planes, y depende del interés general.
        </p>
        <p>
          Si te interesa poder ver los vinilos en persona en el futuro, podés escribirnos a{" "}
          <a
            href="mailto:altillo.massucco@gmail.com"
            className="underline hover:text-gray-600 transition-colors"
          >
            altillo.massucco@gmail.com
          </a>
          . Nos sirve mucho para dimensionar ese interés.
        </p>
      </div>
    ),
  },
];

export default function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="flex flex-col divide-y divide-gray-200 border-y border-gray-200">
      {ITEMS.map((item, i) => (
        <div key={i}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between gap-4 py-5 text-left group"
          >
            <span className="font-medium text-sm sm:text-base">{item.q}</span>
            <span
              className={`shrink-0 text-gray-400 transition-transform duration-200 ${open === i ? "rotate-45" : ""}`}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </span>
          </button>
          {open === i && (
            <div className="pb-6 text-sm text-gray-700 leading-relaxed">
              {item.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

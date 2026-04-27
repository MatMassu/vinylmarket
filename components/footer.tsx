import Link from "next/link";

const NAV_LINKS = [
  { label: "Información", href: "/informacion" },
  { label: "Contacto", href: "/contacto" },
  { label: "Términos y condiciones", href: "/legal?seccion=terminos" },
  { label: "Privacidad", href: "/legal?seccion=privacidad" },
  { label: "Devoluciones", href: "/legal?seccion=devoluciones" },
];

export default function Footer() {
  return (
    <footer className="w-full bg-black text-white mt-16">
      <div className="px-4 sm:px-8 xl:px-[170px] py-10 sm:py-12 flex flex-col sm:flex-row gap-8 sm:gap-16">

        {/* Brand + legal info */}
        <div className="flex flex-col gap-2 shrink-0">
          <span className="text-sm font-semibold tracking-tight">Altillo Massucco</span>
          <span className="text-xs text-gray-400">Matias Massucco — CUIL 20-41758431-6</span>
          <span className="text-xs text-gray-400">Cuenca 2040, Piso 15 Dpto. A</span>
          <span className="text-xs text-gray-400">CP 1416, CABA, Argentina</span>
        </div>

        {/* Nav links */}
        <div className="flex flex-col gap-2">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-xs text-gray-400 hover:text-white transition-colors w-fit"
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Arrepentimiento */}
        <div className="sm:ml-auto flex flex-col justify-end gap-2">
          <Link
            href="/contacto?motivo=arrepentimiento"
            className="border border-gray-600 px-4 py-2.5 text-xs text-gray-300 hover:border-white hover:text-white transition-colors text-center"
          >
            Botón de arrepentimiento
          </Link>
          <span className="text-xs text-gray-500 text-center">Art. 34, Ley 24.240</span>
        </div>

      </div>
    </footer>
  );
}

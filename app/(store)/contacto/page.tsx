import Link from "next/link";
import ContactForm from "../../../components/Contacto/contact_form";

export const metadata = {
  title: "Contacto | Altillo Massucco",
  description: "Contactanos por mail, WhatsApp o a través del formulario.",
};

export default async function ContactoPage({
  searchParams,
}: {
  searchParams: Promise<{ motivo?: string }>;
}) {
  const { motivo } = await searchParams;
  const isArrepentimiento = motivo === "arrepentimiento";

  return (
    <main className="min-h-screen bg-linear-to-b from-stone-50 to-stone-100 pt-10 px-4 sm:px-8 xl:px-[170px]">
      <div className="max-w-2xl xl:max-w-3xl mx-auto py-8 sm:py-12 flex flex-col gap-8 sm:gap-10">

        <div className="flex flex-col gap-1">
          <h1 className="text-xl sm:text-2xl xl:text-3xl font-semibold tracking-tight">Contacto</h1>
          <p className="text-sm xl:text-base text-gray-500">Respondemos a la brevedad.</p>
        </div>

        {/* Arrepentimiento banner */}
        {isArrepentimiento && (
          <div className="border border-amber-300 bg-amber-50 px-5 py-4 flex flex-col gap-2">
            <p className="text-sm xl:text-base font-semibold">Solicitud de arrepentimiento</p>
            <p className="text-sm xl:text-base text-gray-700">
              Para ejercer tu derecho de arrepentimiento (Art. 34, Ley 24.240), completá el formulario
              indicando tu nombre completo y número de orden (figura en el email de confirmación de
              compra). Nos comunicaremos dentro de las 48 horas hábiles para coordinar la devolución y el
              reembolso.
            </p>
            <p className="text-xs text-gray-500">
              El plazo para solicitar la devolución es de 10 días corridos desde la recepción del
              producto.{" "}
              <Link href="/legal?seccion=devoluciones" className="underline hover:text-gray-700 transition-colors">
                Ver política completa
              </Link>
            </p>
          </div>
        )}

        {/* Contact info */}
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="mailto:altillo.massucco@gmail.com"
            className="flex-1 border border-gray-300 bg-white px-5 py-4 flex flex-col gap-1 hover:border-gray-400 transition-colors"
          >
            <span className="text-xs xl:text-sm font-semibold uppercase tracking-widest text-gray-400">Email</span>
            <span className="text-sm xl:text-base font-medium">altillo.massucco@gmail.com</span>
          </a>
          <a
            href="https://wa.me/5491130671811"
            target="_blank"
            rel="noreferrer"
            className="flex-1 border border-gray-300 bg-white px-5 py-4 flex flex-col gap-1 hover:border-gray-400 transition-colors"
          >
            <span className="text-xs xl:text-sm font-semibold uppercase tracking-widest text-gray-400">WhatsApp</span>
            <span className="text-sm xl:text-base font-medium">(011) 3067-1811</span>
          </a>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-4">
          <h2 className="text-sm xl:text-base font-semibold uppercase tracking-widest text-gray-400">
            {isArrepentimiento ? "Formulario de arrepentimiento" : "Formulario"}
          </h2>
          <ContactForm initialMotivo={isArrepentimiento ? "Solicitud de arrepentimiento" : undefined} />
        </div>

      </div>
    </main>
  );
}

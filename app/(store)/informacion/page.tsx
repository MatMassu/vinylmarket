import FaqAccordion from "../../../components/Informacion/faq_accordion";

export const metadata = {
  title: "Información | Altillo Massucco",
  description: "Preguntas frecuentes sobre nuestros vinilos, envíos y proceso de pago.",
};

export default function InformacionPage() {
  return (
    <main className="min-h-screen bg-linear-to-b from-stone-50 to-stone-100 pt-10 px-4 sm:px-8 xl:px-[170px]">
      <div className="max-w-2xl xl:max-w-3xl mx-auto py-8 sm:py-12 flex flex-col gap-6 sm:gap-8">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl sm:text-2xl xl:text-3xl font-semibold tracking-tight">Información</h1>
          <p className="text-sm xl:text-base text-gray-500">Preguntas frecuentes</p>
        </div>

        <FaqAccordion />

        <div className="border border-gray-300 bg-white px-5 py-4 flex flex-col gap-1.5">
          <p className="text-sm xl:text-base font-medium">¿No encontraste lo que buscabas?</p>
          <p className="text-sm xl:text-base text-gray-600 leading-relaxed">
            Contactanos por{" "}
            <a
              href="mailto:altillo.massucco@gmail.com"
              className="underline hover:text-gray-900 transition-colors"
            >
              mail
            </a>{" "}
            o por{" "}
            <a
              href="https://wa.me/5491130671811"
              target="_blank"
              rel="noreferrer"
              className="underline hover:text-gray-900 transition-colors"
            >
              WhatsApp
            </a>{" "}
            y te respondemos a la brevedad.
          </p>
        </div>
      </div>
    </main>
  );
}

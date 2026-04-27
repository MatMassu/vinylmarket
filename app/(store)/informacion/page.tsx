import FaqAccordion from "../../../components/Informacion/faq_accordion";

export const metadata = {
  title: "Información | Altillo Massucco",
  description: "Preguntas frecuentes sobre nuestros vinilos, envíos y proceso de pago.",
};

export default function InformacionPage() {
  return (
    <main className="min-h-screen bg-linear-to-b from-stone-50 to-stone-100 pt-10 px-[clamp(1rem,170px,170px)]">
      <div className="max-w-2xl mx-auto py-12 flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold tracking-tight">Información</h1>
          <p className="text-sm text-gray-500">Preguntas frecuentes</p>
        </div>

        <FaqAccordion />

        <p className="text-sm text-gray-500 leading-relaxed">
          ¿No encontraste la respuesta a tu consulta? Podés contactarnos por{" "}
          <a
            href="mailto:altillo.massucco@gmail.com"
            className="underline hover:text-gray-700 transition-colors"
          >
            mail
          </a>{" "}
          o por{" "}
          <a
            href="https://wa.me/5491130671811"
            target="_blank"
            rel="noreferrer"
            className="underline hover:text-gray-700 transition-colors"
          >
            WhatsApp
          </a>
          .
        </p>
      </div>
    </main>
  );
}

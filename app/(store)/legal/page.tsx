import LegalContent from "../../../components/Legal/legal_content";

export const metadata = {
  title: "Legal | Altillo Massucco",
  description: "Términos y condiciones, política de privacidad y política de devoluciones.",
};

export default async function LegalPage({
  searchParams,
}: {
  searchParams: Promise<{ seccion?: string }>;
}) {
  const { seccion } = await searchParams;
  const validSections = ["terminos", "privacidad", "devoluciones"];
  const initialSection = validSections.includes(seccion ?? "") ? seccion : undefined;

  return (
    <main className="min-h-screen bg-white pt-10 px-4 sm:px-8 xl:px-[170px]">
      <div className="max-w-4xl xl:max-w-5xl mx-auto py-8 sm:py-12">
        <LegalContent initialSection={initialSection} />
      </div>
    </main>
  );
}

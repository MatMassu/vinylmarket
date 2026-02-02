import { getVinylById } from "../../../lib/vinyls";
import VinylDetails from "../../../components/VinylPage/vinyl_details";

export default async function VinylPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const vinyl = getVinylById(id);

  return (
    <main className="flex min-h-screen flex-col bg-indigo-200">
      <VinylDetails vinyl={vinyl} />
    </main>
  );
}

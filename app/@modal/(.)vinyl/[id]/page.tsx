import VinylDetails from "@/components/VinylPage/vinyl_details.tsx";
import { getVinylById } from "@/lib/vinyls.ts";

export default async function VinylModal({ params }: { params: { id: string } }) {
  const vinyl = getVinylById(params.id);

  return (
    <div className="hidden lg:flex fixed inset-0 bg-black/25 items-center justify-center z-50">
      <div className="bg-white max-w-2xl w-full p-6 rounded">
        <VinylDetails vinyl={vinyl} />
      </div>
    </div>
  );
}

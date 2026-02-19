import { getProductById } from "../../../lib/queries/products";
import VinylDetails from "../../../components/VinylPage/vinyl_details";

export default async function VinylPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProductById(Number(id));

  return (
    <main className="flex min-h-screen flex-col">
      <VinylDetails product={product} />
    </main>
  );
}

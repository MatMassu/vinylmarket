import { getProductBySlug } from "../../../lib/queries/products";
import VinylDetails from "../../../components/VinylPage/vinyl_details";

export default async function VinylPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  return (
    <main className="flex min-h-screen flex-col">
      <VinylDetails product={product} />
    </main>
  );
}

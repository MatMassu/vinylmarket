import ModalWrapper from "../../../../../components/Modal/modal_wrapper";
import VinylDetailsModal from "../../../../../components/VinylPage/vinyl_details_modal";
import { CloseButton } from "../../../../../components/Modal/close_button";
import { getProductCardViewBySlug } from "../../../../../lib/queries/products";
import { notFound } from "next/navigation";

export default async function StoreVinylModal({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductCardViewBySlug(slug);
  if (!product) notFound();

  return (
    <ModalWrapper>
      <CloseButton />
      <VinylDetailsModal product={product} />
    </ModalWrapper>
  );
}

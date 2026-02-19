import ModalWrapper from "../../../../../components/Modal/modal_wrapper";
import VinylDetailsModal from "../../../../../components/VinylPage/vinyl_details_modal";
import { CloseButton } from "../../../../../components/Modal/close_button";
import { getProductById } from "../../../../../lib/queries/products";

export default async function StoreVinylModal({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProductById(Number(id));

  return (
    <ModalWrapper>
      <CloseButton />
      <VinylDetailsModal product={product} />
    </ModalWrapper>
  );
}

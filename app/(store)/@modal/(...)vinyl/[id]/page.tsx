import ModalWrapper from "/components/Modal/modal_wrapper.tsx";
import VinylDetailsModal from "/components/VinylPage/vinyl_details_modal.tsx";
import { CloseButton } from "/components/Modal/close_button.tsx";
import { getVinylById } from "/lib/vinyls.ts";

export default async function StoreVinylModal({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const vinyl = getVinylById(id);

  return (
    <ModalWrapper>
      <CloseButton />
      <VinylDetailsModal vinyl={vinyl} />
    </ModalWrapper>
  );
}

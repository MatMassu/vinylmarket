import { getModalImagesView } from "../../lib/blob";
import VinylImages from "./vinyl_images";

type VinylImagesWrapperProps = {
  id: string;
};

export default async function VinylImagesWrapper({ id }: VinylImagesWrapperProps) {
  const modalView = await getModalImagesView(id);
  if (!modalView) return null;

  return <VinylImages images={modalView.images}></VinylImages>;
}

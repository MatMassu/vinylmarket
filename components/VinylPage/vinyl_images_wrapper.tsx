import { getModalImages } from "../../lib/blob";
import VinylImages from "./vinyl_images";

type VinylImagesWrapperProps = {
  id: number;
};

export default async function VinylImagesWrapper({ id }: VinylImagesWrapperProps) {
  const result = await getModalImages(id);
  const modalImages = result;

  if (!modalImages.length) return null;

  return <VinylImages images={modalImages}></VinylImages>;
}

import { Product } from "../../types/types";
import VinylImagesWrapper from "./vinyl_images_wrapper";

type VinylDetailsProps = {
  vinyl: Product;
};

export default function VinylDetailsModal({ vinyl }: VinylDetailsProps) {
  return (
    <article className="flex flex-col text-center items-center justify-center gap-2">
      <VinylImagesWrapper id={vinyl.id} />
      <div>
        <h1 className="font-semibold"> {vinyl.title} </h1>
        <h2> {vinyl.artist}</h2>
        <p> ${vinyl.price} </p>
      </div>
    </article>
  );
}

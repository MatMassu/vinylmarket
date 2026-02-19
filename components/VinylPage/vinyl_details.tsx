import { Product } from "../../types/types";
import VinylImagesWrapper from "./vinyl_images_wrapper";

type VinylDetailsProps = {
  product: Product;
};

export default function VinylDetailsModal({ product }: VinylDetailsProps) {
  return (
    <article className="flex flex-col min-h-screen text-center items-center justify-center gap-2">
      <VinylImagesWrapper id={product.id} />
      <div>
        <h1 className="font-semibold"> {product.title} </h1>
        <h2> {product.artist}</h2>
        <p> ${product.price} </p>
      </div>
    </article>
  );
}

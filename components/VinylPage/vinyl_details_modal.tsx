import { ProductCardView } from "../../types/types";
import VinylImagesWrapper from "./vinyl_images_wrapper";
import AddToCartModalButton from "./add_to_cart_modal_button";

type VinylDetailsModalProps = {
  product: ProductCardView;
};

export default function VinylDetailsModal({ product }: VinylDetailsModalProps) {
  return (
    <article className="flex flex-col text-center items-center justify-center gap-4">
      <VinylImagesWrapper id={product.id} />
      <div className="flex flex-col gap-1">
        <h1 className="font-semibold">{product.title}</h1>
        <h2>{product.artist}</h2>
        <p>{product.formattedPrice}</p>
      </div>
      <AddToCartModalButton product={product} />
    </article>
  );
}

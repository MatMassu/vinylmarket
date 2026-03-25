import { ProductCardView } from "../../types/types";
import VinylImagesWrapper from "./vinyl_images_wrapper";
import AddToCartModalButton from "./add_to_cart_modal_button";

type VinylDetailsModalProps = {
  product: ProductCardView;
};

export default function VinylDetailsModal({ product }: VinylDetailsModalProps) {
  return (
    <article className="flex flex-col md:flex-row gap-6 md:gap-8 md:items-stretch">
      {/* Left: images fill column */}
      <div className="md:flex-1 md:min-w-0 flex items-center justify-center md:min-h-[420px]">
        <VinylImagesWrapper id={product.id} />
      </div>

      {/* Right: details */}
      <div className="md:w-64 lg:w-72 flex flex-col gap-4 justify-center">
        <div className="flex flex-col gap-1">
          <h1 className="font-semibold text-lg leading-snug">{product.title}</h1>
          <h2 className="text-gray-600">{product.artist}</h2>
          <p className="text-xl font-medium mt-1">{product.formattedPrice}</p>
        </div>

        <div className="flex flex-col gap-2 text-sm">
          <div className="flex justify-between border-b border-gray-100 pb-2">
            <span className="text-gray-500">Estado de portada</span>
            <span className="font-medium">{product.cover_condition}</span>
          </div>
          <div className="flex justify-between border-b border-gray-100 pb-2">
            <span className="text-gray-500">Estado de disco</span>
            <span className="font-medium">{product.disc_condition}</span>
          </div>
        </div>

        <AddToCartModalButton product={product} />
      </div>
    </article>
  );
}

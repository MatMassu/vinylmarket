import Image from "next/image";
import Link from "next/link";
import { ProductCardView } from "../../types/types";
import AddToCartButton from "../Cart/add_to_cart_button";
import { getProductCardViews } from "../../lib/queries/products";

type ProductCardProps = {
  product: ProductCardView;
};

export default async function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="flex flex-col gap-1 h-full">
      <div className="relative aspect-square hover:shadow-lg hover:-translate-y-1 transition-all duration-250 ease-out">
        <Link href={`/vinyl/${product.id}`} scroll={false} className="">
          <Image
            src={product.images.grid}
            alt={`Portada de ${product.title} - ${product.artist}`}
            width={400}
            height={400}
            className="w-full h-full object-cover shadow-sm rounded-md touch-pinch-zoom"
          />
        </Link>
        <AddToCartButton product={product} images={product.images} disabled={!product.inStock} />
      </div>
      <div className="flex flex-col text-xs gap-0.5">
        <Link href={`/vinyl/${product.id}`} scroll={false}>
          <h1 className="font-montserrat text-base line-clamp-1 leading-snug font-bold cursor-pointer text-neutral-800 hover:text-indigo-600">
            {product.title}
          </h1>
        </Link>
        <p className="text-xs text-neutral-600 line-clamp-1 ">{product.artist}</p>
      </div>
      <h2 className="text-sm text-neutral-600 font-semibold mt-auto">{product.formattedPrice}</h2>
    </div>
  );
}

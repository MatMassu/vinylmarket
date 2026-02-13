import Image from "next/image";
import Link from "next/link";
import { Product } from "../../types/types";
import AddToCartButton from "../Cart/add_to_cart_button";
import { getProductImages } from "../../lib/blob";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const images = getProductImages({ id: product.id, slug: product.slug, element: "frente" });

  return (
    <div
      className="
      flex flex-col gap-2 text-center
      bg-white/60 justify-between rounded-xl p-4 shadow-sm cursor-pointer

      transition-all duration-300 ease-out

      hover:-translate-y-1
      hover:shadow-xl
      "
    >
      <div className="flex justify-center items-center min-h-[2.8rem] 2xl:min-h-14">
        <h1 className="font-serif text-sm 2xl:text-xl line-clamp-2 leading-snug">
          {product.title}
        </h1>
      </div>
      <div className="relative aspect-square">
        <Link href={`/vinyl/${product.id}`} scroll={false} className="">
          <Image
            src={images.grid}
            alt={`Portada de ${product.title} - ${product.artist}`}
            width={400}
            height={400}
            className="w-full h-full object-cover shadow-sm rounded-lg group-hover:shadow-md transition-shadow"
          />
        </Link>
        <AddToCartButton product={product} />
      </div>
      <div className="flex flex-col text-xs 2xl:text-base gap-0.5">
        <h2 className="text-xs 2xl:text-base text-neutral-600 line-clamp-1 min-h-[3.2rem]">
          {product.artist}
        </h2>
        <p className="text-sm 2xl:text-base font-semibold"> ${product.price.toLocaleString()} </p>
      </div>
    </div>
  );
}

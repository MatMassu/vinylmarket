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
      border border-black/20 justify-between rounded-t-3xl rounded-b-md p-2 cursor-pointer

      transition-all duration-300 ease-out

      hover:scale-[1.015]
      hover:-translate-y-0.5
      hover:shadow-lg
      hover:bg-white/20
      hover:backdrop-blur-xs
      "
    >
      <div className="flex justify-center items-center min-h-[2.8rem] 2xl:min-h-14">
        <h1 className="font-serif text-sm 2xl:text-xl line-clamp-2 leading-snug tracking-wide font-medium">
          {" "}
          {product.title}{" "}
        </h1>
      </div>
      <div className="relative aspect-square ">
        <Link href={`/vinyl/${product.id}`} scroll={false} className="">
          <Image
            src={images.grid}
            alt={`Portada de ${product.title} - ${product.artist}`}
            width={400}
            height={400}
            className="w-full h-full object-cover shadow-md "
          />
        </Link>
        <AddToCartButton product={product} />
      </div>
      <div className="flex flex-col text-xs 2xl:text-base">
        <h2 className="text-xs 2xl:text-base line-clamp-1 min-h-[3.2rem]"> {product.artist}</h2>
        <p className="text-xs 2xl:text-base font-semibold"> ${product.price.toLocaleString()} </p>
      </div>
    </div>
  );
}

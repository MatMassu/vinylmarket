import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/types.ts";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/vinyl/${product.id}`} scroll={false} className="">
      <div className="flex flex-col gap-2 text-center">
        <div className="border border-black aspect-square hover:scale-105 hover:shadow-xl active:scale-99 active:shadow-xs transition-all">
          <Image
            src={product.image}
            alt={`Portada de ${product.title} - ${product.artist}`}
            width={400}
            height={400}
            className="w-full h-full object-cover shadow-md cursor-pointer"
          />
        </div>
        <div className="text-xs md:text-base">
          <h1 className="font-semibold text-sm md:text-xl"> {product.title} </h1>
          <h2 className="md:text-base"> {product.artist}</h2>
          <p className="md:text-base"> ${product.price} </p>
        </div>
      </div>
    </Link>
  );
}

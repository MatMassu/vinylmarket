import Image from "next/image";
import { Product } from "../../types/types";

type VinylDetailsProps = {
  vinyl: Product;
};

export default function VinylDetails({ vinyl }: VinylDetailsProps) {
  return (
    <article className="flex flex-col min-h-screen text-center items-center justify-center gap-2">
      <div className="aspect-square">
        <Image
          src={vinyl.image}
          alt={`Portada de ${vinyl.title} - ${vinyl.artist}`}
          width={400}
          height={400}
          className="w-full h-full"
        />
      </div>
      <div>
        <h1 className="font-semibold"> {vinyl.title} </h1>
        <h2> {vinyl.artist}</h2>
        <p> ${vinyl.price} </p>
      </div>
    </article>
  );
}

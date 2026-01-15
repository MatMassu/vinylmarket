import { Product } from "./ProductCard/types.ts";

export default function ProductCard(Product) {
  return (
    <div className="flex flex-col gap-2 text-center">
      <div className="border border-black aspect-square "></div>
      <div>
        <h1 className="font-semibold"> {Product.title} </h1>
        <h2> {Product.artist}</h2>
        <p> ${Product.price} </p>
      </div>
    </div>
  );
}

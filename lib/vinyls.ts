import { notFound } from "next/navigation";
import { Product, products } from "@/types/types.ts";

export function getVinylById(id: string): Product {
  const vinyl = products.find((v) => v.id === id);

  if (!vinyl) {
    notFound();
  }

  return vinyl;
}

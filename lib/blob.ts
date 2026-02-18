import { sql } from "./db";
import { ProductImages } from "../types/types";

export async function getFrontImages(productId: number): Promise<ProductImages[]> {
  try {
    const result = await sql`
    SELECT *
    FROM product_images
    WHERE product_id = ${productId}
      AND type = 'frente'
      AND variant IN ('grid', 'cart')
  `;

    return result as ProductImages[];
  } catch (err) {
    console.error("DB ERROR:", err);
    throw err;
  }
}

export async function getModalImages(productId: number): Promise<ProductImages[]> {
  try {
    const result = await sql`
    SELECT *
    FROM product_images
    WHERE product_id = ${productId}
      AND variant = 'modal'
  `;

    return result as ProductImages[];
  } catch (err) {
    console.error("DB ERROR:", err);
    throw err;
  }
}

export function getMediaImages() {
  return {
    header: `https://kccbcw6rqngvsspk.public.blob.vercel-storage.com/media/header.jpg`,
  };
}

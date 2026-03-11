import { sql } from "./db";
import { ProductImages, ModalImagesView } from "../types/types";

export async function getFrontImages(productId: string): Promise<ProductImages[]> {
  try {
    const rows = await sql`
    SELECT *
    FROM product_images
    WHERE product_id = ${productId}
      AND type = 'frente'
      AND variant IN ('grid', 'cart')
  `;

    return rows as ProductImages[];
  } catch (err) {
    console.error("DB ERROR:", err);
    throw err;
  }
}

export async function getModalImages(productId: string): Promise<ProductImages[]> {
  try {
    const rows = await sql`
    SELECT *
    FROM product_images
    WHERE product_id = ${productId}
      AND variant = 'modal'
  `;

    return rows as ProductImages[];
  } catch (err) {
    console.error("DB ERROR:", err);
    throw err;
  }
}

export async function getModalImagesView(productId: string): Promise<ModalImagesView | null> {
  const rows = await getModalImages(productId);

  const images = rows.map((img) => img.url);

  return {
    images,
  };
}

export function getMediaImages() {
  return {
    header: `https://kccbcw6rqngvsspk.public.blob.vercel-storage.com/media/header.jpg`,
  };
}

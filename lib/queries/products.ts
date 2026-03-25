import { sql } from "../db";
import { notFound } from "next/navigation";
import { Product, ProductCardView } from "../../types/types";

export async function getProducts(): Promise<Product[]> {
  try {
    const rows = await sql`SELECT * FROM products`;
    return rows as Product[];
  } catch (err) {
    console.error("DB ERROR:", err);
    throw err;
  }
}

export async function getProductById(id: string): Promise<Product> {
  try {
    const rows = await sql`SELECT * FROM products WHERE id = ${id}`;
    const product = (rows as Product[])[0];
    if (!product) {
      notFound();
    }
    return product;
  } catch (err) {
    console.error("DB ERROR:", err);
    throw err;
  }
}

export async function getProductCardViewById(id: string): Promise<ProductCardView | null> {
  try {
    const rows = await sql`
      SELECT
        p.id, p.slug, p.title, p.artist, p.price, p.stock,
        p.cover_condition, p.disc_condition,
        MAX(CASE WHEN pi.variant = 'grid' THEN pi.url END) AS grid_image,
        MAX(CASE WHEN pi.variant = 'cart' THEN pi.url END) AS cart_image
      FROM products AS p
      LEFT JOIN product_images AS pi
        ON pi.product_id = p.id
       AND pi.type = 'frente'
       AND pi.variant IN ('grid', 'cart')
      WHERE p.id = ${id}
      GROUP BY p.id, p.slug, p.title, p.artist, p.price, p.stock, p.cover_condition, p.disc_condition
    `;
    const row = (rows as any[])[0];
    if (!row) return null;
    return {
      id: row.id,
      slug: row.slug,
      title: row.title,
      artist: row.artist,
      price: row.price,
      formattedPrice: `$${row.price.toLocaleString()}`,
      stock: row.stock,
      inStock: row.stock > 0,
      cover_condition: row.cover_condition,
      disc_condition: row.disc_condition,
      images: { grid: row.grid_image, cart: row.cart_image },
    };
  } catch (err) {
    console.error("DB ERROR:", err);
    throw err;
  }
}

export async function getProductCardViews(): Promise<ProductCardView[]> {
  try {
    const rows = await sql`
      SELECT
        p.id,
        p.slug,
        p.title,
        p.artist,
        p.price,
        p.stock,
        p.cover_condition,
        p.disc_condition,
        p.created_at,
        MAX(CASE WHEN pi.variant = 'grid' THEN pi.url END) AS grid_image,
        MAX(CASE WHEN pi.variant = 'cart' THEN pi.url END) AS cart_image

      FROM products AS p
      LEFT JOIN product_images AS pi
        ON pi.product_id = p.id
       AND pi.type = 'frente'
       AND pi.variant IN ('grid', 'cart')

      WHERE p.stock > p.reserved

      GROUP BY
        p.id,
        p.slug,
        p.title,
        p.artist,
        p.price,
        p.stock,
        p.cover_condition,
        p.disc_condition,
        p.created_at
      ORDER BY p.id
  `;

    if (!Array.isArray(rows)) {
      throw new Error("Unexpected DB response");
    }

    return rows.map((row: any) => ({
      id: row.id,
      slug: row.slug,
      title: row.title,
      artist: row.artist,
      price: row.price,
      formattedPrice: `$${row.price.toLocaleString()}`,
      stock: row.stock,
      inStock: row.stock > 0,
      cover_condition: row.cover_condition,
      disc_condition: row.disc_condition,
      created_at: row.created_at,
      images: {
        grid: row.grid_image,
        cart: row.cart_image,
      },
    }));
  } catch (err) {
    console.error("DB ERROR:", err);
    throw err;
  }
}

import { sql } from "../db";
import { ProductCardView } from "../../types/types";

// Both queries require the migration to have been run:
//   ALTER TABLE products ADD COLUMN featured BOOLEAN NOT NULL DEFAULT FALSE;
// Until then they return null / [] gracefully.

export async function getFeaturedProduct(): Promise<ProductCardView | null> {
  try {
    const rows = await sql`
      SELECT
        p.id, p.slug, p.title, p.artist, p.price, p.stock, p.reserved,
        p.cover_condition, p.disc_condition,
        MAX(CASE WHEN pi.variant = 'grid' THEN pi.url END) AS grid_image,
        MAX(CASE WHEN pi.variant = 'cart' THEN pi.url END) AS cart_image
      FROM products AS p
      LEFT JOIN product_images AS pi
        ON pi.product_id = p.id
       AND pi.type = 'frente'
       AND pi.variant IN ('grid', 'cart')
      WHERE p.featured = TRUE
      GROUP BY p.id, p.slug, p.title, p.artist, p.price, p.stock, p.reserved,
               p.cover_condition, p.disc_condition
      LIMIT 1
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
      inStock: row.stock > row.reserved,
      cover_condition: row.cover_condition,
      disc_condition: row.disc_condition,
      images: { grid: row.grid_image, cart: row.cart_image },
    };
  } catch {
    return null;
  }
}

const VG_AND_ABOVE = ["NM", "VG+", "VG"] as const;

export async function getBestConditionVinyls(limit = 20): Promise<ProductCardView[]> {
  try {
    const rows = await sql`
      SELECT
        p.id, p.slug, p.title, p.artist, p.price, p.stock, p.reserved,
        p.cover_condition, p.disc_condition,
        MAX(CASE WHEN pi.variant = 'grid' THEN pi.url END) AS grid_image,
        MAX(CASE WHEN pi.variant = 'cart' THEN pi.url END) AS cart_image
      FROM products AS p
      LEFT JOIN product_images AS pi
        ON pi.product_id = p.id
       AND pi.type = 'frente'
       AND pi.variant IN ('grid', 'cart')
      WHERE p.stock > p.reserved
        AND p.cover_condition = ANY(${VG_AND_ABOVE as unknown as string[]})
      GROUP BY p.id, p.slug, p.title, p.artist, p.price, p.stock, p.reserved,
               p.cover_condition, p.disc_condition
      ORDER BY
        CASE p.cover_condition WHEN 'NM' THEN 1 WHEN 'VG+' THEN 2 WHEN 'VG' THEN 3 END,
        p.price DESC
      LIMIT ${limit}
    `;

    return (rows as any[]).map((row) => ({
      id: row.id,
      slug: row.slug,
      title: row.title,
      artist: row.artist,
      price: row.price,
      formattedPrice: `$${row.price.toLocaleString()}`,
      stock: row.stock,
      inStock: row.stock > row.reserved,
      cover_condition: row.cover_condition,
      disc_condition: row.disc_condition,
      images: { grid: row.grid_image, cart: row.cart_image },
    }));
  } catch {
    return [];
  }
}

export async function getTopArtists(limit = 8): Promise<string[]> {
  try {
    const rows = await sql`
      SELECT artist
      FROM products
      WHERE stock > reserved
      GROUP BY artist
      ORDER BY MAX(price) DESC
      LIMIT ${limit}
    `;
    return (rows as any[]).map((r) => r.artist as string);
  } catch {
    return [];
  }
}

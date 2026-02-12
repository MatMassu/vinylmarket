import { sql } from "../db";
import { notFound } from "next/navigation";
import { Product } from "../../types/types";

export async function getProducts(): Promise<Product[]> {
  try {
    const rows = await sql`SELECT * FROM products`;
    return rows as Product[];
  } catch (err) {
    console.error("DB ERROR:", err);
    return [];
  }
}

export async function getProductById(id: number): Promise<Product> {
  const rows = await sql`SELECT * FROM products WHERE id = ${id}`;

  const product = (rows as Product[])[0];
  if (!product) {
    notFound();
  }

  return product;
}

import { sql } from "../db";
import { notFound } from "next/navigation";
import { Product } from "../../types/types";

export async function getProducts(): Promise<Product[]> {
  try {
    return await sql`SELECT * FROM products`;
  } catch (err) {
    console.error("DB ERROR:", err);
    return [];
  }
}

export async function getProductById(id: number): Promise<Product> {
  const result = await sql`SELECT * FROM products WHERE id = ${id}`;

  const product = result[0];
  if (!product) {
    notFound();
  }

  return product;
}

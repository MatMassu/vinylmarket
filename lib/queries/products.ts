import { sql } from "../db";
import { notFound } from "next/navigation";
import { Product } from "../../types/types";

export async function getProducts(): Promise<Product[]> {
  try {
    const result = await sql`SELECT * FROM products`;
    return result as Product[];
  } catch (err) {
    console.error("DB ERROR:", err);
    throw err;
  }
}

export async function getProductById(id: number): Promise<Product> {
  try {
    const result = await sql`SELECT * FROM products WHERE id = ${id}`;
    const product = (result as Product[])[0];
    if (!product) {
      notFound();
    }
    return product;
  } catch (err) {
    console.error("DB ERROR:", err);
    throw err;
  }
}

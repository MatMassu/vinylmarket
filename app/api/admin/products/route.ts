import { sql } from "@/lib/db";
import { cookies } from "next/headers";
import { Grading, ImageType, ImageVariant } from "@/types/types";

type ImageInsert = { type: ImageType; variant: ImageVariant; url: string };

type ProductInsert = {
  slug: string;
  title: string;
  artist: string;
  price: number;
  stock: number;
  disc_count: number;
  cover_condition: Grading;
  disc_condition: Grading;
  weight_g: number;
  thickness_mm: number;
  width_mm: number;
  length_mm: number;
  images: ImageInsert[];
};

async function isAuthed(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get("admin_token")?.value === process.env.ADMIN_SECRET;
}

export async function GET(request: Request): Promise<Response> {
  if (!(await isAuthed())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");
  if (!slug) return Response.json({ error: "Missing slug" }, { status: 400 });
  const rows = (await sql`SELECT id FROM products WHERE slug = ${slug}`) as { id: string }[];
  return Response.json({ exists: rows.length > 0 });
}

export async function POST(request: Request): Promise<Response> {
  if (!(await isAuthed())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body: ProductInsert = await request.json();

  try {
    const rows = (await sql`
      INSERT INTO products (slug, title, artist, price, stock, disc_count, cover_condition, disc_condition, weight_g, thickness_mm, width_mm, length_mm)
      VALUES (
        ${body.slug}, ${body.title}, ${body.artist}, ${body.price},
        ${body.stock}, ${body.disc_count}, ${body.cover_condition}, ${body.disc_condition},
        ${body.weight_g}, ${body.thickness_mm}, ${body.width_mm}, ${body.length_mm}
      )
      RETURNING id
    `) as { id: string }[];
    const productId: string = rows[0].id;

    for (const img of body.images) {
      await sql`
        INSERT INTO product_images (type, variant, url, product_id)
        VALUES (${img.type}, ${img.variant}, ${img.url}, ${productId})
      `;
    }

    return Response.json({ id: productId, slug: body.slug });
  } catch (error) {
    return Response.json({ error: (error as Error).message }, { status: 500 });
  }
}

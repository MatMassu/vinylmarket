import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { verifySessionToken } from "@/lib/admin-auth";

const BACKEND = process.env.NEXT_PUBLIC_CHECKOUT_URL!;
const SECRET = process.env.ADMIN_SECRET!;

export async function GET() {
  const store = await cookies();
  const token = store.get("admin_token")?.value;
  if (!token || !SECRET || !verifySessionToken(token, SECRET))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const res = await fetch(`${BACKEND}/shipping-windows/current/csv`, {
    headers: { "X-Admin-Secret": SECRET },
    cache: "no-store",
  });
  if (!res.ok)
    return NextResponse.json({ error: "Backend error" }, { status: res.status });

  const csv = await res.text();
  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="correo_envios.csv"',
    },
  });
}

import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken } from "@/lib/admin-auth";

const BACKEND = process.env.NEXT_PUBLIC_CHECKOUT_URL!;
const SECRET = process.env.ADMIN_SECRET!;

async function isAdmin() {
  const store = await cookies();
  const token = store.get("admin_token")?.value;
  return !!token && !!SECRET && verifySessionToken(token, SECRET);
}

function backendHeaders() {
  return { "X-Admin-Secret": SECRET };
}

export async function GET() {
  if (!(await isAdmin()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const res = await fetch(`${BACKEND}/shipping-windows/current`, {
    headers: backendHeaders(),
    cache: "no-store",
  });
  if (!res.ok) {
    const body = await res.text();
    return NextResponse.json({ error: `Backend error ${res.status}: ${body}` }, { status: res.status });
  }

  return NextResponse.json(await res.json());
}

export async function POST(req: NextRequest) {
  if (!(await isAdmin()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const action = req.nextUrl.searchParams.get("action");
  if (action !== "close")
    return NextResponse.json({ error: "Unknown action" }, { status: 400 });

  const res = await fetch(`${BACKEND}/shipping-windows/close`, {
    method: "POST",
    headers: backendHeaders(),
  });
  if (!res.ok)
    return NextResponse.json({ error: "Backend error" }, { status: res.status });

  return new NextResponse(null, { status: 204 });
}

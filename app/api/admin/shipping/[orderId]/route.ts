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

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ orderId: string }> },
) {
  if (!(await isAdmin()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { orderId } = await params;
  const res = await fetch(`${BACKEND}/shipping-windows/orders/${orderId}`, {
    method: "DELETE",
    headers: { "X-Admin-Secret": SECRET },
  });
  if (!res.ok)
    return NextResponse.json({ error: "Backend error" }, { status: res.status });

  return new NextResponse(null, { status: 204 });
}

import { NextRequest, NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";

function verifySessionToken(signed: string, secret: string): boolean {
  const dot = signed.lastIndexOf(".");
  if (dot === -1) return false;
  const token = signed.slice(0, dot);
  const sig = signed.slice(dot + 1);
  const expected = createHmac("sha256", secret).update(token).digest("hex");
  try {
    return timingSafeEqual(Buffer.from(sig, "hex"), Buffer.from(expected, "hex"));
  } catch {
    return false;
  }
}

export function middleware(request: NextRequest) {
  const signed = request.cookies.get("admin_token")?.value;
  const secret = process.env.ADMIN_SECRET;

  if (!signed || !secret || !verifySessionToken(signed, secret)) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/upload"],
};

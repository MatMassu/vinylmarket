import { NextRequest, NextResponse } from "next/server";

// Web Crypto API (available in Edge Runtime) — produces the same HMAC-SHA256
// hex output as Node's createHmac, so tokens from the login server action
// are verified correctly here.
async function verifySessionToken(signed: string, secret: string): Promise<boolean> {
  const dot = signed.lastIndexOf(".");
  if (dot === -1) return false;
  const token = signed.slice(0, dot);
  const sig   = signed.slice(dot + 1);

  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const raw = await crypto.subtle.sign("HMAC", key, encoder.encode(token));
  const expectedHex = Array.from(new Uint8Array(raw))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  // Constant-time comparison to prevent timing attacks.
  if (sig.length !== expectedHex.length) return false;
  let diff = 0;
  for (let i = 0; i < sig.length; i++) {
    diff |= sig.charCodeAt(i) ^ expectedHex.charCodeAt(i);
  }
  return diff === 0;
}

export async function middleware(request: NextRequest) {
  const signed = request.cookies.get("admin_token")?.value;
  const secret = process.env.ADMIN_SECRET;

  if (!signed || !secret || !(await verifySessionToken(signed, secret))) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/upload"],
};

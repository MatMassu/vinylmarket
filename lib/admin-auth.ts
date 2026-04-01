import { createHmac, randomBytes, timingSafeEqual } from "crypto";

export function generateSessionToken(secret: string): { token: string; signed: string } {
  const token = randomBytes(32).toString("hex");
  const sig = createHmac("sha256", secret).update(token).digest("hex");
  return { token, signed: `${token}.${sig}` };
}

export function verifySessionToken(signed: string, secret: string): boolean {
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

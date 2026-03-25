import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createHmac, randomBytes, timingSafeEqual } from "crypto";

function generateSessionToken(secret: string): { token: string; signed: string } {
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

export default function AdminLoginPage() {
  async function login(formData: FormData) {
    "use server";
    const password = formData.get("password") as string;
    const secret = process.env.ADMIN_SECRET;
    if (!secret || password !== secret) return;

    const { signed } = generateSessionToken(secret);
    const cookieStore = await cookies();
    cookieStore.set("admin_token", signed, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "strict",
      maxAge: 60 * 60 * 8, // 8 hours
    });
    redirect("/admin/upload");
  }

  return (
    <main className="flex h-screen items-center justify-center">
      <form action={login} className="flex flex-col gap-3 w-64">
        <h1 className="text-lg font-medium">Admin</h1>
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          className="border px-3 py-2 text-sm"
          autoFocus
        />
        <button type="submit" className="bg-black text-white py-2 text-sm">
          Entrar
        </button>
      </form>
    </main>
  );
}

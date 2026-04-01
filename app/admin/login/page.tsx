import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { generateSessionToken } from "@/lib/admin-auth";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  const destination = next?.startsWith("/admin/") ? next : "/admin/upload";

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
    redirect(destination);
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

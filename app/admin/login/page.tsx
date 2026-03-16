import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function AdminLoginPage() {
  async function login(formData: FormData) {
    "use server";
    const password = formData.get("password") as string;
    if (password === process.env.ADMIN_SECRET) {
      const cookieStore = await cookies();
      cookieStore.set("admin_token", password, {
        httpOnly: true,
        path: "/",
        sameSite: "strict",
      });
      redirect("/admin/upload");
    }
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

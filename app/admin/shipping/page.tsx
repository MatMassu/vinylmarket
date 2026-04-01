import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifySessionToken } from "@/lib/admin-auth";
import ShippingClient from "@/components/Admin/shipping_client";

export default async function AdminShippingPage() {
  const secret = process.env.ADMIN_SECRET;
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;

  if (!secret || !token || !verifySessionToken(token, secret)) {
    redirect("/admin/login?next=/admin/shipping");
  }

  return <ShippingClient />;
}

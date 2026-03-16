import CheckoutFormClient from "../../components/Checkout/checkout_form_client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function Checkout() {
  return (
    <main className="flex flex-col mx-4 md:mx-[10vw] my-8 gap-5 md:gap-8 justify-center">
      <div className="relative flex items-center justify-center">
        <Link href="/" className="absolute left-0 text-gray-500 hover:text-gray-800 transition-colors">
          <ArrowLeft size={22} />
        </Link>
        <h1 className="text-2xl">Checkout</h1>
      </div>
      <CheckoutFormClient />
    </main>
  );
}

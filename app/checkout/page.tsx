import Contact from "../../components/Checkout/contact";
import CartReview from "../../components/Checkout/cart_review";
import Shipping from "../../components/Checkout/shipping";
import Link from "next/link";

export default function Checkout() {
  return (
    <main className="flex flex-col mx-4 md:mx-[10vw] my-8 gap-5 md:gap-8 justify-center">
      <h1 className="w-full text-center text-2xl">Checkout</h1>
      <nav aria-label="Pasos checkout">
        <ol className="flex w-full justify-between text-xs select-none">
          <li className="relative flex-1 text-center cursor-pointer">
            <Link href="/checkout">Datos</Link>
          </li>
          <li className="relative flex-1 text-center text-gray-300">Pago</li>
          <li className="relative flex-1 text-center text-gray-300">Revisión</li>
        </ol>
      </nav>
      <article className="grid md:grid-cols-2 gap-6">
        <Contact />
        <CartReview />
        <Shipping />
      </article>
      <button className="bg-blue-900 font-semibold text-md w-full p-2 text-white rounded-lg cursor-pointer hover:opacity-70 active:scale-98 active:scale-y-95 transform transition-all">
        Continuar
      </button>
    </main>
  );
}

"use client";

import { useCart } from "../../components/Cart/cart_context";
import Image from "next/image";

export default function CartReview() {
  const { items, removeFromCart } = useCart();
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = items.length > 0 ? 3500 : 0;
  const total = subtotal + shipping;

  return (
    <section
      aria-labelledby="carrito-heading"
      className="flex flex-col min-w-0 gap-3 rounded-md bg-white row-span-2 h-full border border-gray-300 p-6"
    >
      <h2 id="carrito-heading" className="font-bold select-none">
        Tu carrito
      </h2>

      <div className="flex flex-col gap-5 flex-1">
        <ul className="border border-gray-300 rounded-md overflow-y-scroll flex-1 min-h-50 max-h-[50vw] md:max-h-[40vw] lg:max-h-[25vw]">
          {items.length === 0 ? (
            <div className="flex items-center h-full">
              <p className="text-gray-500 text-sm text-center w-full">Carrito vacio</p>
            </div>
          ) : (
            <ul className="flex flex-col gap-4 px-2 py-4">
              {items.map((item) => (
                <li key={item.id} className="flex gap-2">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-sm text-red-500 cursor-pointer hover:underline"
                  >
                    x
                  </button>

                  <Image
                    src={item.image}
                    alt={`Portada de ${item.title} - ${item.artist}`}
                    width={80}
                    height={80}
                    className=""
                  />

                  <article className="flex flex-col justify-center-safe">
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-sm text-gray-500">Cantidad: {item.quantity}</p>
                    <p className="text-sm">${(item.price * item.quantity).toLocaleString()}</p>
                  </article>
                </li>
              ))}
            </ul>
          )}
        </ul>

        <footer className="flex flex-col mx-3 gap-7">
          <div className="flex flex-col gap-1 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Envío</span>
              <span>${shipping.toLocaleString()}</span>
            </div>
          </div>

          <div className="flex justify-between font-semibold">
            <h3>Total</h3>
            <h3>${total.toLocaleString()}</h3>
          </div>
        </footer>
      </div>
    </section>
  );
}

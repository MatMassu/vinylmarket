"use client";

import Image from "next/image";
import { useCart } from "../../components/Cart/cart_context";
import { getProductImages } from "../../lib/blob";
import { CartItemType } from "../../types/types";

type CartItemProps = {
  item: CartItemType;
};

export default function CartItem({ item }: CartItemProps) {
  const { removeFromCart } = useCart();
  const image = getProductImages({ id: item.id, slug: item.slug, element: "frente" });
  return (
    <>
      <li key={item.id} className="flex gap-2">
        <button
          onClick={() => removeFromCart(item.id)}
          className="text-sm text-red-500 cursor-pointer hover:underline"
        >
          x
        </button>

        <Image
          src={image.cart}
          alt={`Portada de ${item.title} - ${item.artist}`}
          width={80}
          height={80}
          className="w-23 h-23 object-cover shrink-0 shadow-md"
        />

        <article className="flex flex-col justify-center">
          <h3 className="text-sm lg:text-base font-medium">{item.title}</h3>
          <p className="text-xs lg:text-sm text-gray-500">Cantidad: {item.quantity}</p>
          <p className="text-xs lg:text-sm">${(item.price * item.quantity).toLocaleString()}</p>
        </article>
      </li>
    </>
  );
}

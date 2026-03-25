"use client";

import { useCart } from "../../components/Cart/cart_context";
import { CartItemType } from "../../types/types";
import Image from "next/image";
import { Trash2 } from "lucide-react";

type CartItemProps = {
  item: CartItemType;
};

export default function CartItem({ item }: CartItemProps) {
  const { removeFromCart } = useCart();
  return (
    <li className="flex gap-2 items-center">
      <Image
        src={item.images.cart}
        alt={item.title}
        width={96}
        height={96}
        className="w-23 h-23 object-cover shrink-0 shadow-md"
      />
      <article className="flex flex-col justify-center flex-1 min-w-0">
        <h3 className="text-sm xl:text-base font-medium">{item.title}</h3>
        <p className="text-xs xl:text-sm text-gray-500">Cantidad: {item.quantity}</p>
        <p className="text-xs xl:text-sm">${(item.price * item.quantity).toLocaleString()}</p>
      </article>
      <button
        onClick={() => removeFromCart(item.id)}
        aria-label="Eliminar del carrito"
        className="text-red-400 hover:text-red-600 cursor-pointer transition-colors shrink-0 p-1"
      >
        <Trash2 size={16} />
      </button>
    </li>
  );
}

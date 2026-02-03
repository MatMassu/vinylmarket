import "../globals.css";
import React from "react";
import { CartProvider } from "../../components/Cart/cart_context";

export default function StoreLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      <CartProvider>
        {children}
        {modal}
      </CartProvider>
    </>
  );
}

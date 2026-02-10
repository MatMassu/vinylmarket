import "./globals.css";
import React from "react";
import { CartProvider } from "../components/Cart/cart_context";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}

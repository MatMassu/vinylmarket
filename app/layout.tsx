import "./globals.css";
import React from "react";

export default function Layout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        {children}
        {modal}
      </body>
    </html>
  );
}

import "../globals.css";
import React from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";

export default function StoreLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
      {modal}
      <Footer />
    </>
  );
}

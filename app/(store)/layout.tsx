import "../globals.css";
import React from "react";
import Header from "../../components/header";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import SideCartButton from "../../components/Cart/side_cart_button";

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
      <Navbar />
      {children}
      {modal}
      <Footer />
      {/* Fixed at the top-right, overlays header position on scroll */}
      <div className="fixed top-[2.125rem] right-10 z-40">
        <SideCartButton />
      </div>
    </>
  );
}

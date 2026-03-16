"use client";

import { useState } from "react";
import Contact from "./contact";
import CartReview from "./cart_review";
import Shipping from "./shipping";
import CheckoutButton from "./checkout_button";
import MPDeviceFingerprint from "./mp_device_fingerprint";

export default function CheckoutFormClient() {
  const [payer, setPayer] = useState({ email: "", firstName: "", lastName: "" });

  function handleChange(field: "email" | "firstName" | "lastName", value: string) {
    setPayer((prev) => ({ ...prev, [field]: value }));
  }

  return (
    <>
      <MPDeviceFingerprint />
      <article className="grid md:grid-cols-2 gap-6">
        <Contact
          email={payer.email}
          firstName={payer.firstName}
          lastName={payer.lastName}
          onChange={handleChange}
        />
        <CartReview />
        <Shipping />
      </article>
      <CheckoutButton payer={payer} />
    </>
  );
}

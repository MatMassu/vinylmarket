"use client";

import { useState } from "react";
import Contact from "./contact";
import CartReview from "./cart_review";
import Shipping from "./shipping";
import CheckoutButton from "./checkout_button";
import MPDeviceFingerprint from "./mp_device_fingerprint";

export default function CheckoutFormClient() {
  const [payer, setPayer] = useState({ email: "", firstName: "", lastName: "" });
  const [emailError, setEmailError] = useState(false);

  function handleChange(field: "email" | "firstName" | "lastName", value: string) {
    setPayer((prev) => ({ ...prev, [field]: value }));
    if (field === "email") setEmailError(false);
  }

  return (
    <>
      <MPDeviceFingerprint />
      <article className="grid md:grid-cols-2 gap-6">
        <Contact
          email={payer.email}
          firstName={payer.firstName}
          lastName={payer.lastName}
          emailError={emailError}
          onChange={handleChange}
        />
        <CartReview />
        <Shipping />
      </article>
      <CheckoutButton payer={payer} onEmailError={setEmailError} />
    </>
  );
}

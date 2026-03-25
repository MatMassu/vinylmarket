"use client";

import { useState } from "react";
import MPDeviceFingerprint from "./mp_device_fingerprint";
import CheckoutBreadcrumbs from "./checkout_breadcrumbs";
import Contact from "./contact";
import StepShipping from "./shipping";
import StepSummary from "./step_summary";
import CheckoutCartSidebar from "./checkout_cart_sidebar";

export type ContactData = {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
};

export type ShippingMethod = "local" | "branch" | "door";

export type ShippingData = {
  method: ShippingMethod | null;
  street: string;
  number: string;
  floor: string;
  apt: string;
  neighborhood: string; // barrio for local; localidad for branch/door
  province: string;
  zip: string;
};

export type ShippingErrors = Partial<{
  method: string;
  street: string;
  number: string;
  neighborhood: string;
  province: string;
  zip: string;
}>;

type Step = 1 | 2 | 3;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateShipping(data: ShippingData): ShippingErrors {
  const e: ShippingErrors = {};
  if (!data.method) {
    e.method = "Seleccioná un método de envío.";
    return e;
  }
  if (data.method === "local") {
    if (!data.street)       e.street       = "Ingresá la calle.";
    if (!data.number)       e.number       = "Ingresá el número.";
    if (!data.neighborhood) e.neighborhood = "Ingresá el barrio.";
  }
  if (data.method === "branch") {
    if (!data.province)     e.province     = "Ingresá la provincia.";
    if (!data.neighborhood) e.neighborhood = "Ingresá la localidad.";
  }
  if (data.method === "door") {
    if (!data.province)     e.province     = "Ingresá la provincia.";
    if (!data.neighborhood) e.neighborhood = "Ingresá la localidad.";
    if (!data.street)       e.street       = "Ingresá la calle.";
    if (!data.number)       e.number       = "Ingresá el número.";
    if (!data.zip)          e.zip          = "Ingresá el código postal.";
  }
  return e;
}

export default function CheckoutFormClient() {
  const [step,          setStep]          = useState<Step>(1);
  const [completedUpTo, setCompletedUpTo] = useState<Step>(1);

  const [contact,    setContact]    = useState<ContactData>({
    email: "", firstName: "", lastName: "", phone: "",
  });
  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  const [shipping,      setShipping]      = useState<ShippingData>({
    method: null, street: "", number: "", floor: "", apt: "",
    neighborhood: "", province: "", zip: "",
  });
  const [shippingErrors, setShippingErrors] = useState<ShippingErrors>({});

  function advance(to: Step) {
    setStep(to);
    if (to > completedUpTo) setCompletedUpTo(to);
  }

  function handleContactContinue() {
    const emailOk = EMAIL_RE.test(contact.email);
    const phoneOk = contact.phone.trim().length > 0;
    setEmailError(!emailOk);
    setPhoneError(!phoneOk);
    if (!emailOk || !phoneOk) return;
    advance(2);
  }

  function handleShippingContinue() {
    const errors = validateShipping(shipping);
    setShippingErrors(errors);
    if (Object.keys(errors).length > 0) return;
    advance(3);
  }

  return (
    <>
      <MPDeviceFingerprint />

      {/* Steps 1 & 2: form on left, cart sidebar on right (lg+) */}
      {step !== 3 && (
        <div className="flex flex-col gap-5">
          {/* Row 1: breadcrumbs + sidebar title aligned */}
          <div className="flex gap-18 items-center">
            <div className="max-w-md w-full">
              <CheckoutBreadcrumbs
                current={step}
                completedUpTo={completedUpTo}
                onNavigate={(s) => setStep(s)}
              />
            </div>
            <div className="hidden lg:flex w-80 shrink-0">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">Tu carrito</p>
            </div>
          </div>

          {/* Row 2: form + sidebar items aligned */}
          <div className="flex gap-20 items-start">
            <div className="max-w-md w-full">
              {step === 1 && (
                <Contact
                  data={contact}
                  emailError={emailError}
                  phoneError={phoneError}
                  onChange={(field, value) => {
                    setContact((prev) => ({ ...prev, [field]: value }));
                    if (field === "email") setEmailError(false);
                    if (field === "phone") setPhoneError(false);
                  }}
                  onContinue={handleContactContinue}
                />
              )}
              {step === 2 && (
                <StepShipping
                  data={shipping}
                  errors={shippingErrors}
                  onChange={(patch) => {
                    setShipping((prev) => ({ ...prev, ...patch }));
                    // clear errors for changed fields
                    const cleared = Object.fromEntries(
                      Object.keys(patch).map((k) => [k, undefined])
                    );
                    setShippingErrors((prev) => ({ ...prev, ...cleared }));
                  }}
                  onContinue={handleShippingContinue}
                  onBack={() => setStep(1)}
                />
              )}
            </div>
            <CheckoutCartSidebar />
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="flex flex-col gap-5">
          <CheckoutBreadcrumbs
            current={step}
            completedUpTo={completedUpTo}
            onNavigate={(s) => setStep(s)}
          />
          <StepSummary
            contact={contact}
            shipping={shipping}
            onBack={() => setStep(2)}
          />
        </div>
      )}
    </>
  );
}

"use client";

import { useState } from "react";
import MPDeviceFingerprint from "./mp_device_fingerprint";
import CheckoutBreadcrumbs from "./checkout_breadcrumbs";
import Contact from "./contact";
import StepLocation from "./step_location";
import StepShipping from "./step_shipping";
import StepSummary from "./step_summary";
import CheckoutCartSidebar from "./checkout_cart_sidebar";
import areaCodes from "@/data/area_codes.json";

const VALID_AREA_CODES = new Set<string>(areaCodes);

export type ContactData = {
  email: string;
  firstName: string;
  lastName: string;
  phoneArea: string;
  phoneNumber: string;
};

export type LocationData = {
  province: string;     // underscore key e.g. "CAPITAL_FEDERAL"
  provinceName: string; // display name e.g. "Capital Federal"
  locality: string;
  postalCode: string;
};

export type ShippingService = "EP" | "CP";
export type ShippingMethod  = "local" | "branch" | "door";

export type ShippingData = {
  method:        ShippingMethod | null;
  service:       ShippingService | null; // null for local
  branchCode:    string;
  branchDisplay: string;
  street:        string;
  number:        string;
  floor:         string;
  apt:           string;
  cost:          number | null; // computed when method+service selected
};

type Step = 1 | 2 | 3 | 4;

// Must end in .com or .com.ar, local part >= 2 chars, domain >= 2 chars before tld.
const EMAIL_RE = /^[^\s@]{2,}@[^\s@]{2,}\.(com|com\.ar)$/i;

export default function CheckoutFormClient() {
  const [step,          setStep]          = useState<Step>(1);
  const [completedUpTo, setCompletedUpTo] = useState<Step>(1);

  const [contact, setContact] = useState<ContactData>({
    email: "", firstName: "", lastName: "", phoneArea: "", phoneNumber: "",
  });
  const [emailError,       setEmailError]       = useState(false);
  const [nameError,        setNameError]         = useState(false);
  const [phoneAreaError,   setPhoneAreaError]    = useState(false);
  const [phoneNumberError, setPhoneNumberError]  = useState(false);

  const [location, setLocation] = useState<LocationData>({
    province: "", provinceName: "", locality: "", postalCode: "",
  });

  const [shipping, setShipping] = useState<ShippingData>({
    method: null, service: null,
    branchCode: "", branchDisplay: "",
    street: "", number: "", floor: "", apt: "",
    cost: null,
  });

  function advance(to: Step) {
    setStep(to);
    if (to > completedUpTo) setCompletedUpTo(to);
  }

  function handleContactContinue() {
    const emailOk       = EMAIL_RE.test(contact.email.trim());
    const nameOk        = contact.firstName.trim().length > 0;
    const phoneAreaOk   = VALID_AREA_CODES.has(contact.phoneArea.trim());
    const phoneNumberOk = /^\d{8}$/.test(contact.phoneNumber.trim());

    setEmailError(!emailOk);
    setNameError(!nameOk);
    setPhoneAreaError(!phoneAreaOk);
    setPhoneNumberError(!phoneNumberOk);

    if (!emailOk || !nameOk || !phoneAreaOk || !phoneNumberOk) return;
    advance(2);
  }

  function handleContactChange(field: keyof ContactData, value: string) {
    setContact((prev) => ({ ...prev, [field]: value }));
    if (field === "email")       setEmailError(false);
    if (field === "firstName")   setNameError(false);
    if (field === "phoneArea")   setPhoneAreaError(false);
    if (field === "phoneNumber") setPhoneNumberError(false);
  }

  // Reset shipping when going back to location so stale prices are cleared.
  function handleShippingBack() {
    setShipping({
      method: null, service: null,
      branchCode: "", branchDisplay: "",
      street: "", number: "", floor: "", apt: "",
      cost: null,
    });
    setStep(2);
  }

  const showSidebar = step !== 4;

  return (
    <>
      <MPDeviceFingerprint />

      {showSidebar ? (
        <div className="flex flex-col gap-5">
          {/* Row 1: breadcrumbs aligned with sidebar title */}
          <div className="flex gap-12 items-center">
            <div className="flex-1 min-w-0">
              <CheckoutBreadcrumbs
                current={step}
                completedUpTo={completedUpTo}
                onNavigate={(s) => setStep(s)}
              />
            </div>
            <div className="hidden lg:flex flex-1 shrink-0">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                Tu carrito
              </p>
            </div>
          </div>

          {/* Row 2: form + sidebar, equal width */}
          <div className="flex gap-12 items-start">
            <div className="flex-1 min-w-0">
              {step === 1 && (
                <Contact
                  data={contact}
                  emailError={emailError}
                  nameError={nameError}
                  phoneAreaError={phoneAreaError}
                  phoneNumberError={phoneNumberError}
                  onChange={handleContactChange}
                  onContinue={handleContactContinue}
                />
              )}
              {step === 2 && (
                <StepLocation
                  data={location}
                  onChange={(patch) => setLocation((prev) => ({ ...prev, ...patch }))}
                  onContinue={() => advance(3)}
                  onBack={() => setStep(1)}
                />
              )}
              {step === 3 && (
                <StepShipping
                  location={location}
                  data={shipping}
                  onChange={(patch) => setShipping((prev) => ({ ...prev, ...patch }))}
                  onContinue={() => advance(4)}
                  onBack={handleShippingBack}
                />
              )}
            </div>
            <CheckoutCartSidebar />
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          <CheckoutBreadcrumbs
            current={step}
            completedUpTo={completedUpTo}
            onNavigate={(s) => setStep(s)}
          />
          <StepSummary
            contact={contact}
            location={location}
            shipping={shipping}
            onBack={() => setStep(3)}
          />
        </div>
      )}
    </>
  );
}

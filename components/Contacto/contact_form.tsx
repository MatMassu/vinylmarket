"use client";

import { useState, useEffect } from "react";

const COOLDOWN_MS = 10 * 60 * 1000; // 10 minutes
const LS_KEY = "contact_last_sent";

const inputClass =
  "border border-gray-300 p-2.5 text-sm xl:text-base w-full outline-none focus:border-black transition-colors bg-white";
const errClass = "border-red-400 focus:border-red-400";

export default function ContactForm() {
  const [name,    setName]    = useState("");
  const [email,   setEmail]   = useState("");
  const [message, setMessage] = useState("");
  const [errors,  setErrors]  = useState<Record<string, string>>({});
  const [status,  setStatus]  = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [serverError, setServerError] = useState("");
  const [cooldown, setCooldown] = useState(false);

  useEffect(() => {
    const last = localStorage.getItem(LS_KEY);
    if (last && Date.now() - Number(last) < COOLDOWN_MS) setCooldown(true);
  }, []);

  function validate() {
    const e: Record<string, string> = {};
    if (!name.trim())    e.name    = "Ingresá tu nombre.";
    if (!email.trim())   e.email   = "Ingresá tu email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Email inválido.";
    if (!message.trim()) e.message = "Escribí tu mensaje.";
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    if (cooldown) return;

    setStatus("sending");
    setServerError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      if (!res.ok) {
        const data = await res.json();
        setServerError(data.error ?? "Error al enviar el mensaje.");
        setStatus("error");
        return;
      }
      localStorage.setItem(LS_KEY, String(Date.now()));
      setCooldown(true);
      setStatus("sent");
    } catch {
      setServerError("No se pudo conectar con el servidor.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="border border-gray-300 bg-white px-5 py-6 flex flex-col gap-2">
        <p className="font-medium text-sm xl:text-base">¡Mensaje enviado!</p>
        <p className="text-sm xl:text-base text-gray-600">
          Te respondemos a la brevedad a <strong>{email}</strong>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      {/* Name */}
      <div className="flex flex-col gap-1">
        <input
          placeholder="Nombre (*)"
          value={name}
          onChange={(e) => { setName(e.target.value); setErrors((p) => ({ ...p, name: "" })); }}
          className={`${inputClass} ${errors.name ? errClass : ""}`}
        />
        {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1">
        <input
          type="email"
          placeholder="Email (*)"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: "" })); }}
          className={`${inputClass} ${errors.email ? errClass : ""}`}
        />
        {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
      </div>

      {/* Message */}
      <div className="flex flex-col gap-1">
        <textarea
          placeholder="Mensaje (*)"
          value={message}
          onChange={(e) => { setMessage(e.target.value); setErrors((p) => ({ ...p, message: "" })); }}
          rows={5}
          className={`${inputClass} resize-none ${errors.message ? errClass : ""}`}
        />
        {errors.message && <p className="text-red-500 text-xs">{errors.message}</p>}
      </div>

      {serverError && <p className="text-red-500 text-sm">{serverError}</p>}

      {cooldown && status !== "sending" && (
        <p className="text-sm text-gray-500">
          Ya enviaste un mensaje recientemente. Podés volver a escribirnos en unos minutos.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending" || cooldown}
        className="cursor-pointer bg-black text-white text-sm xl:text-base font-medium p-3 hover:bg-gray-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {status === "sending" ? "Enviando..." : "Enviar mensaje →"}
      </button>
    </form>
  );
}

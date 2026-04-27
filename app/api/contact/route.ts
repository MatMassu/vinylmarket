import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";

const RATE_LIMIT = 3;           // max submissions
const RATE_WINDOW_MIN = 10;     // per N minutes

const EMAIL_ADMIN = "altillo.massucco@gmail.com";
const EMAIL_FROM  = "Altillo Massucco <ventas@altillomassucco.com>";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getIP(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json();

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json({ error: "Completá todos los campos." }, { status: 400 });
  }
  if (message.trim().length > 2000) {
    return NextResponse.json({ error: "El mensaje es demasiado largo." }, { status: 400 });
  }

  const ip = getIP(req);

  // Rate limit: check recent submissions from this IP
  const rows = (await sql`
    SELECT COUNT(*) AS count FROM contact_messages
    WHERE ip = ${ip}
      AND created_at > NOW() - (${RATE_WINDOW_MIN} || ' minutes')::interval
  `) as { count: string }[];
  if (Number(rows[0]?.count ?? 0) >= RATE_LIMIT) {
    return NextResponse.json(
      { error: "Demasiados intentos. Esperá unos minutos e intentá de nuevo." },
      { status: 429 },
    );
  }

  // Persist message
  await sql`
    INSERT INTO contact_messages (name, email, message, ip)
    VALUES (${name.trim()}, ${email.trim()}, ${message.trim()}, ${ip})
  `;

  // Send email notification via Resend. Failure is non-fatal — message is
  // already persisted in contact_messages and can be retrieved from there.
  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    try {
      const emailRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: EMAIL_FROM,
          to: EMAIL_ADMIN,
          reply_to: email.trim(),
          subject: `Nuevo mensaje de contacto — ${escapeHtml(name.trim())}`,
          html: `
            <p><strong>Nombre:</strong> ${escapeHtml(name.trim())}</p>
            <p><strong>Email:</strong> ${escapeHtml(email.trim())}</p>
            <p><strong>Mensaje:</strong></p>
            <p style="white-space:pre-wrap">${escapeHtml(message.trim())}</p>
          `,
        }),
      });
      if (!emailRes.ok) {
        console.error("contact: resend error", emailRes.status, await emailRes.text());
      }
    } catch (err) {
      console.error("contact: failed to send notification email", err);
    }
  }

  return NextResponse.json({ ok: true });
}

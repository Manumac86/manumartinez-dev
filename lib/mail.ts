import "server-only"
import type { ContactInput } from "@/lib/forms"

const RESEND = "https://api.resend.com"
const TO = process.env.CONTACT_TO ?? "me@manumartinez.dev"
const FROM = process.env.CONTACT_FROM ?? "manumartinez.dev <hello@manumartinez.dev>"

function apiKey(): string | null {
  return process.env.RESEND_API_KEY ?? null
}

async function resend(path: string, body: unknown): Promise<void> {
  const res = await fetch(`${RESEND}${path}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey()}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error(`Resend ${path} → ${res.status}`)
}

/** Resolves false when no provider is configured in production. */
export async function sendContactEmail(input: ContactInput): Promise<boolean> {
  if (!apiKey()) {
    if (process.env.NODE_ENV === "production") return false
    console.info("[contact] RESEND_API_KEY missing — not sent:", input)
    return true
  }
  await resend("/emails", {
    from: FROM,
    to: [TO],
    reply_to: input.email,
    subject: `New message from ${input.name}`,
    text: `${input.name} <${input.email}>\n\n${input.message}`,
  })
  return true
}

export async function addNewsletterContact(email: string): Promise<boolean> {
  const audience = process.env.RESEND_AUDIENCE_ID
  if (!apiKey() || !audience) {
    if (process.env.NODE_ENV === "production") return false
    console.info("[newsletter] Resend not configured — not stored:", email)
    return true
  }
  await resend(`/audiences/${audience}/contacts`, { email, unsubscribed: false })
  return true
}

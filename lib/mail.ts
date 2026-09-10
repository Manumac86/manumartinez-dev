import "server-only"
import { Resend } from "resend"
import type { ContactInput } from "@/lib/forms"

const TO = process.env.CONTACT_TO ?? "me@manumartinez.dev"
// RESEND_EMAIL_DOMAIN is provisioned by the Vercel Marketplace integration.
const DOMAIN = process.env.RESEND_EMAIL_DOMAIN ?? "manumartinez.dev"
const FROM = process.env.CONTACT_FROM ?? `manumartinez.dev <hello@${DOMAIN}>`

function client(): Resend | null {
  const key = process.env.RESEND_API_KEY
  return key ? new Resend(key) : null
}

function segmentId(): string | undefined {
  return process.env.RESEND_SEGMENT_ID ?? process.env.RESEND_AUDIENCE_ID
}

function hash(input: string): string {
  let h = 0
  for (let i = 0; i < input.length; i++) h = (h * 31 + input.charCodeAt(i)) | 0
  return (h >>> 0).toString(16)
}

/** Resolves false when no provider is configured in production. Throws on provider errors. */
export async function sendContactEmail(input: ContactInput): Promise<boolean> {
  const resend = client()
  if (!resend) {
    if (process.env.NODE_ENV === "production") return false
    console.info("[contact] RESEND_API_KEY missing — not sent:", input)
    return true
  }
  const { error } = await resend.emails.send(
    {
      from: FROM,
      to: [TO],
      replyTo: input.email,
      subject: `New message from ${input.name}`,
      text: `${input.name} <${input.email}>\n\n${input.message}`,
    },
    { idempotencyKey: `contact/${hash(`${input.email}|${input.message}`)}` },
  )
  if (error) throw new Error(`Resend send: ${error.name} — ${error.message}`)
  return true
}

/** Adds the email to the newsletter segment. Existing contacts are updated instead of duplicated. */
export async function addNewsletterContact(email: string): Promise<boolean> {
  const resend = client()
  const segment = segmentId()
  if (!resend || !segment) {
    if (process.env.NODE_ENV === "production") return false
    console.info("[newsletter] Resend not configured — not stored:", email)
    return true
  }
  const { error } = await resend.contacts.create({ email, unsubscribed: false, segments: [{ id: segment }] })
  if (error) throw new Error(`Resend contact: ${error.name} — ${error.message}`)
  return true
}

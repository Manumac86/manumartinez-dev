import "server-only"
import { Resend } from "resend"
import ContactAck from "@/emails/contact-ack"
import NewsletterWelcome from "@/emails/newsletter-welcome"
import { SITE_URL } from "@/emails/theme"
import type { Lang } from "@/content/types"
import type { ContactInput } from "@/lib/forms"
import { unsubscribeUrl } from "@/lib/newsletter-token"

const TO = process.env.CONTACT_TO ?? "me@manumartinez.dev"
// RESEND_EMAIL_DOMAIN is provisioned by the Vercel Marketplace integration.
const DOMAIN = process.env.RESEND_EMAIL_DOMAIN ?? "manumartinez.dev"
const FROM = process.env.CONTACT_FROM ?? `Emmanuel Martinez <hello@${DOMAIN}>`

const SUBJECTS = {
  welcome: { en: "You're in — one useful idea every two weeks", es: "Listo — una idea útil cada dos semanas" },
  ack: { en: "Got your message", es: "Recibí tu mensaje" },
} as const

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

/**
 * Contact form: notifies the owner and sends an acknowledgement to the visitor.
 * Resolves false when no provider is configured in production. Throws on provider errors.
 */
export async function sendContactEmail(input: ContactInput, lang: Lang = "es"): Promise<boolean> {
  const resend = client()
  if (!resend) {
    if (process.env.NODE_ENV === "production") return false
    console.info("[contact] RESEND_API_KEY missing — not sent:", input)
    return true
  }
  const key = hash(`${input.email}|${input.message}`)
  const owner = await resend.emails.send(
    {
      from: FROM,
      to: [TO],
      replyTo: input.email,
      subject: `New message from ${input.name}`,
      text: `${input.name} <${input.email}>\n\n${input.message}`,
    },
    { idempotencyKey: `contact/${key}` },
  )
  if (owner.error) throw new Error(`Resend send: ${owner.error.name} — ${owner.error.message}`)

  const ack = await resend.emails.send(
    {
      from: FROM,
      to: [input.email],
      replyTo: TO,
      subject: SUBJECTS.ack[lang],
      react: <ContactAck lang={lang} name={input.name} message={input.message} />,
    },
    { idempotencyKey: `contact-ack/${key}` },
  )
  // The visitor's copy is best-effort: the owner already has the message.
  if (ack.error) console.error("[contact] acknowledgement failed:", ack.error.name, ack.error.message)
  return true
}

/** Newsletter: stores the contact in the segment and sends the welcome email with an unsubscribe link. */
export async function addNewsletterContact(email: string, lang: Lang = "es"): Promise<boolean> {
  const resend = client()
  const segment = segmentId()
  if (!resend || !segment) {
    if (process.env.NODE_ENV === "production") return false
    console.info("[newsletter] Resend not configured — not stored:", email)
    return true
  }
  const created = await resend.contacts.create({ email, unsubscribed: false, segments: [{ id: segment }] })
  if (created.error) throw new Error(`Resend contact: ${created.error.name} — ${created.error.message}`)

  const unsub = unsubscribeUrl(SITE_URL, email)
  const welcome = await resend.emails.send(
    {
      from: FROM,
      to: [email],
      subject: SUBJECTS.welcome[lang],
      react: <NewsletterWelcome lang={lang} unsubscribeUrl={unsub} />,
      headers: { "List-Unsubscribe": `<${unsub}>`, "List-Unsubscribe-Post": "List-Unsubscribe=One-Click" },
    },
    { idempotencyKey: `newsletter-welcome/${hash(email.toLowerCase())}` },
  )
  if (welcome.error) console.error("[newsletter] welcome failed:", welcome.error.name, welcome.error.message)
  return true
}

/** Marks a contact as unsubscribed. Returns false when the contact does not exist. */
export async function unsubscribeNewsletterContact(email: string): Promise<boolean> {
  const resend = client()
  if (!resend) return false
  const { error } = await resend.contacts.update({ email, unsubscribed: true })
  if (error) {
    if (error.name === "not_found") return false
    throw new Error(`Resend unsubscribe: ${error.name} — ${error.message}`)
  }
  return true
}

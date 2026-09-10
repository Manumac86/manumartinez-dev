import { createHmac, timingSafeEqual } from "node:crypto"

function secret(): string {
  const s = process.env.NEWSLETTER_SECRET ?? process.env.RESEND_API_KEY
  if (!s) throw new Error("NEWSLETTER_SECRET (or RESEND_API_KEY) is required to sign unsubscribe links")
  return s
}

export function signEmail(email: string, key = secret()): string {
  return createHmac("sha256", key).update(email.trim().toLowerCase()).digest("base64url")
}

export function verifyEmailToken(email: string, token: string, key = secret()): boolean {
  const expected = Buffer.from(signEmail(email, key))
  const given = Buffer.from(token)
  return expected.length === given.length && timingSafeEqual(expected, given)
}

export function unsubscribeUrl(siteUrl: string, email: string, key?: string): string {
  const params = new URLSearchParams({ email, token: signEmail(email, key) })
  return `${siteUrl}/api/newsletter/unsubscribe?${params.toString()}`
}

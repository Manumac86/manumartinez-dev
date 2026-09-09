"use server"

import { contactSchema, newsletterSchema, type ActionResult } from "@/lib/forms"
import { addNewsletterContact, sendContactEmail } from "@/lib/mail"

export async function sendContact(_prev: ActionResult | null, formData: FormData): Promise<ActionResult> {
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  })
  if (!parsed.success) return { ok: false, error: "invalid" }
  try {
    return (await sendContactEmail(parsed.data)) ? { ok: true } : { ok: false, error: "delivery" }
  } catch (err) {
    console.error(err)
    return { ok: false, error: "delivery" }
  }
}

export async function subscribeNewsletter(_prev: ActionResult | null, formData: FormData): Promise<ActionResult> {
  const parsed = newsletterSchema.safeParse({ email: formData.get("email") })
  if (!parsed.success) return { ok: false, error: "invalid" }
  try {
    return (await addNewsletterContact(parsed.data.email)) ? { ok: true } : { ok: false, error: "delivery" }
  } catch (err) {
    console.error(err)
    return { ok: false, error: "delivery" }
  }
}

import { z } from "zod"

export const contactSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  message: z.string().trim().min(1).max(5000),
})
export type ContactInput = z.infer<typeof contactSchema>

export const newsletterSchema = z.object({ email: z.string().trim().email().max(200) })
export type NewsletterInput = z.infer<typeof newsletterSchema>

export type ActionResult = { ok: true } | { ok: false; error: "invalid" | "delivery" }

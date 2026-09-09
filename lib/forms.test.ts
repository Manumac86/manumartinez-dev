import { describe, expect, it } from "vitest"
import { contactSchema, newsletterSchema } from "@/lib/forms"

describe("form schemas", () => {
  it("accepts a valid contact", () => {
    expect(contactSchema.safeParse({ name: "Ana", email: "ana@x.com", message: "Building a fintech" }).success).toBe(true)
  })

  it("rejects bad email / empty message", () => {
    expect(contactSchema.safeParse({ name: "Ana", email: "nope", message: "hi" }).success).toBe(false)
    expect(contactSchema.safeParse({ name: "Ana", email: "ana@x.com", message: "" }).success).toBe(false)
  })

  it("newsletter needs a valid email", () => {
    expect(newsletterSchema.safeParse({ email: "a@b.co" }).success).toBe(true)
    expect(newsletterSchema.safeParse({ email: "" }).success).toBe(false)
  })
})

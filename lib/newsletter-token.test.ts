import { describe, expect, it } from "vitest"
import { signEmail, unsubscribeUrl, verifyEmailToken } from "@/lib/newsletter-token"

describe("newsletter unsubscribe token", () => {
  it("signs case-insensitively and verifies", () => {
    const t = signEmail("Ana@Example.com", "k")
    expect(verifyEmailToken("ana@example.com", t, "k")).toBe(true)
    expect(verifyEmailToken("other@example.com", t, "k")).toBe(false)
    expect(verifyEmailToken("ana@example.com", t + "x", "k")).toBe(false)
    expect(verifyEmailToken("ana@example.com", t, "other-key")).toBe(false)
  })
  it("builds an unsubscribe url", () => {
    const u = new URL(unsubscribeUrl("https://manumartinez.dev", "ana@example.com", "k"))
    expect(u.pathname).toBe("/api/newsletter/unsubscribe")
    expect(u.searchParams.get("email")).toBe("ana@example.com")
    expect(verifyEmailToken("ana@example.com", u.searchParams.get("token")!, "k")).toBe(true)
  })
})

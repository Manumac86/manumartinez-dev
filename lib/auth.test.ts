import { describe, expect, it } from "vitest"
import { editorAllowlist, isEditor } from "@/lib/auth"

describe("isEditor", () => {
  it("accepts the editor role regardless of email", () => {
    expect(isEditor({ emails: ["x@y.z"], role: "editor" }, {})).toBe(true)
  })
  it("accepts allowlisted emails, case-insensitively", () => {
    const env = { CMS_EDITORS: "Me@manumartinez.dev, other@x.com" }
    expect(editorAllowlist(env)).toEqual(["me@manumartinez.dev", "other@x.com"])
    expect(isEditor({ emails: ["ME@manumartinez.dev"] }, env)).toBe(true)
    expect(isEditor({ emails: ["stranger@x.com"] }, env)).toBe(false)
  })
  it("denies everyone when nothing is configured", () => {
    expect(isEditor({ emails: ["me@manumartinez.dev"], role: "viewer" }, {})).toBe(false)
  })
})

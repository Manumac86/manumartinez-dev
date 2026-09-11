import { describe, expect, it } from "vitest"
import { readEnvFlag } from "@/lib/flags-env"

describe("env-backed flags", () => {
  it("are on only for the literal value on", () => {
    expect(readEnvFlag("FEATURE_BLOG", {})).toBe(false)
    expect(readEnvFlag("FEATURE_BLOG", { FEATURE_BLOG: "off" })).toBe(false)
    expect(readEnvFlag("FEATURE_BLOG", { FEATURE_BLOG: "true" })).toBe(false)
    expect(readEnvFlag("FEATURE_BLOG", { FEATURE_BLOG: "on" })).toBe(true)
    expect(readEnvFlag("FEATURE_BLOG", { FEATURE_BLOG: " ON " })).toBe(true)
  })
})

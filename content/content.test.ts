import { describe, expect, it } from "vitest"
import { bio, certifications, copy, education, experienceFull, experienceShort, pick, stack } from "@/content"

describe("content", () => {
  it("copy has identical keys in en and es", () => {
    expect(Object.keys(copy.es).sort()).toEqual(Object.keys(copy.en).sort())
    expect(Object.keys(copy.es.nav).sort()).toEqual(Object.keys(copy.en.nav).sort())
  })

  it("has 18 full roles, 10 short roles, 3 schools, 15 certifications, 12 stack items, 5 bio paragraphs", () => {
    expect(experienceFull).toHaveLength(18)
    expect(experienceShort).toHaveLength(10)
    expect(education).toHaveLength(3)
    expect(certifications).toHaveLength(15)
    expect(stack).toHaveLength(12)
    expect(bio.en).toHaveLength(5)
    expect(bio.es).toHaveLength(5)
  })

  it("exactly one current role, and it is first", () => {
    expect(experienceFull.filter((e) => e.current)).toHaveLength(1)
    expect(experienceFull[0].current).toBe(true)
  })

  it("pick returns the requested language", () => {
    expect(pick({ en: "a", es: "b" }, "es")).toBe("b")
  })
})

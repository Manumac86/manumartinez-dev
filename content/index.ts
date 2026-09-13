import type { Lang, Localized } from "./types"

export * from "./types"
export { copy, type Copy } from "./copy"
export { experienceShort, experienceFull } from "./experience"
export { education, certifications, languages } from "./education"
export { stack } from "./stack"
export { bio } from "./bio"
export { links } from "./links"

export function pick<T>(value: Localized<T>, lang: Lang): T {
  return value[lang]
}

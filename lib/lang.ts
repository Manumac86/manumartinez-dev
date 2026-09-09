import { type Lang, LANGS } from "@/content/types"

export const LANG_COOKIE = "lang"

export function parseLang(value?: string | null): Lang {
  return (LANGS as readonly string[]).includes(value ?? "") ? (value as Lang) : "en"
}

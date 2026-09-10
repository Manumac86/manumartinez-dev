import type { Lang } from "@/content/types"

export function formatDate(iso: string, lang: Lang): string {
  const [y, m, d] = iso.split("-").map(Number)
  return new Intl.DateTimeFormat(lang === "es" ? "es-ES" : "en-US", { dateStyle: "long", timeZone: "UTC" }).format(
    new Date(Date.UTC(y, m - 1, d)),
  )
}

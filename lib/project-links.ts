/** Client-safe helpers shared by the projects UI (no Node APIs here). */
import type { Lang, ProjectMeta } from "@/content/types"

export type ProjectsByLang = Record<Lang, ProjectMeta[]>

/** Where a project card should link: its page when it has one, otherwise its anchor on the list. */
export function projectHref(p: Pick<ProjectMeta, "slug" | "hasPage">): string {
  return p.hasPage ? `/projects/${p.slug}` : `/projects#${p.slug}`
}

export type Lang = "en" | "es"
export const LANGS: readonly Lang[] = ["en", "es"]
export type Localized<T = string> = Record<Lang, T>

export interface ProjectMeta {
  slug: string
  lang: Lang
  name: string
  tag: string
  excerpt: string
  year: string
  role: string
  status?: string
  stack: string[]
  url?: string
  cover?: string
  gallery: string[]
  order: number
  draft: boolean
  source: Lang
  translatedFrom?: Lang
  /** True when the markdown body has content, i.e. /projects/<slug> exists. */
  hasPage: boolean
}

export interface ExperienceShort {
  company: string
  role: string
  from: string
  to: string
  loc: string
}

export interface ExperienceFull {
  company: string
  role: string
  period: string
  location: string
  current?: boolean
  description: string[]
  skills: string[]
}

export interface Education {
  school: string
  degree: string
  years: string
}

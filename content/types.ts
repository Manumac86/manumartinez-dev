export type Lang = "en" | "es"
export const LANGS: readonly Lang[] = ["en", "es"]
export type Localized<T = string> = Record<Lang, T>

export interface Project {
  slug: string
  name: string
  year: string
  role: Localized
  stack: string[]
  tag: Localized
  desc: Localized
  /** Public URL, shown as an outbound link when present. */
  url?: string
  /** Screenshot under public/, e.g. /projects/fintio.jpg. */
  cover?: string
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

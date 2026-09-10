export type Lang = "en" | "es"
export const LANGS: readonly Lang[] = ["en", "es"]
export type Localized<T = string> = Record<Lang, T>

export interface Project {
  slug: string
  name: string
  year: string
  role: string
  stack: string[]
  tag: Localized
  desc: Localized
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

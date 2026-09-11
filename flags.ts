import { flag } from "flags/next"
import { readEnvFlag } from "@/lib/flags-env"

/**
 * Site sections that can be hidden from the public. Values come from environment variables
 * (`on` enables). The Vercel Toolbar can override them per browser via a signed cookie
 * (requires FLAGS_SECRET), so hidden sections stay reviewable in production.
 */
const onOff = [
  { value: true, label: "On" },
  { value: false, label: "Off" },
]

const fromEnv = (name: string) => () => readEnvFlag(name)

export const projectsFlag = flag<boolean>({
  key: "projects",
  description: "Show the Projects page, the home section and its links",
  defaultValue: false,
  options: onOff,
  decide: fromEnv("FEATURE_PROJECTS"),
})

export const blogFlag = flag<boolean>({
  key: "blog",
  description: "Show the Blog page, post pages, the home section and its links (the CMS stays available)",
  defaultValue: false,
  options: onOff,
  decide: fromEnv("FEATURE_BLOG"),
})

export const siteFlags = { projects: projectsFlag, blog: blogFlag }

export interface SiteFlags {
  projects: boolean
  blog: boolean
}

export async function getSiteFlags(): Promise<SiteFlags> {
  const [projects, blog] = await Promise.all([projectsFlag(), blogFlag()])
  return { projects, blog }
}

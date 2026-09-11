import { flag } from "flags/next"
import { vercelAdapter } from "@flags-sdk/vercel"

/**
 * Site sections that can be hidden from the public. Values are managed in Vercel → Flags
 * (per environment, no redeploy needed) and can be overridden per browser from the Vercel
 * Toolbar. `defaultValue` is the fallback when the flag cannot be evaluated.
 */
const onOff = [
  { value: true, label: "On" },
  { value: false, label: "Off" },
]

export const projectsFlag = flag<boolean>({
  key: "projects",
  description: "Show the Projects page, the home section and its links",
  defaultValue: false,
  options: onOff,
  adapter: vercelAdapter(),
})

export const blogFlag = flag<boolean>({
  key: "blog",
  description: "Show the Blog page, post pages, the home section and its links (the CMS stays available)",
  defaultValue: false,
  options: onOff,
  adapter: vercelAdapter(),
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

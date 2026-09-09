import * as React from "react"
import { siGithub, siGitlab, siX } from "simple-icons"

import { cn } from "@/lib/utils"

type BrandIconProps = React.SVGProps<SVGSVGElement> & { title?: string }

/** Decorative by default (aria-hidden); pass `title` to expose an accessible name. */
function createBrandIcon(path: string, name: string) {
  function BrandIcon({ className, title, ...props }: BrandIconProps) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        role={title ? "img" : undefined}
        aria-label={title}
        aria-hidden={title ? undefined : true}
        className={cn("size-4 shrink-0", className)}
        {...props}
      >
        {title ? <title>{title}</title> : null}
        <path d={path} />
      </svg>
    )
  }
  BrandIcon.displayName = `${name}Icon`
  return BrandIcon
}

// lucide-react v1 and simple-icons no longer ship the LinkedIn mark, so it is inlined here.
const LINKEDIN_PATH =
  "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"

export const LinkedinIcon = createBrandIcon(LINKEDIN_PATH, "LinkedIn")
export const XIcon = createBrandIcon(siX.path, "X")
export const GitlabIcon = createBrandIcon(siGitlab.path, "GitLab")
export const GithubIcon = createBrandIcon(siGithub.path, "GitHub")

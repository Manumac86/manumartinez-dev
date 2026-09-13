"use client"

import Link from "next/link"
import { Calendar, Globe, Mail, Rocket } from "lucide-react"
import { GithubIcon, GitlabIcon, LinkedinIcon, XIcon } from "@/components/icons/brand"
import { useLang } from "@/components/site/lang-provider"
import { links } from "@/content"
import type { PostsByLang } from "@/lib/posts"
import { projectHref, type ProjectsByLang } from "@/lib/project-links"
import type { SiteFlags } from "@/flags"

const socials = [
  { href: links.site, label: "manumartinez.dev", Icon: Globe },
  { href: links.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
  { href: links.x, label: "X", Icon: XIcon },
  { href: `mailto:${links.email}`, label: "Email", Icon: Mail },
  { href: links.cal, label: "Meet with me", Icon: Calendar },
  { href: links.github, label: "GitHub", Icon: GithubIcon },
  { href: links.gitlab, label: "GitLab", Icon: GitlabIcon },
  { href: links.collybrix, label: "Collybrix", Icon: Rocket },
]

const colLink = "text-sm text-fg-footer transition-colors hover:text-foreground"

export function SiteFooter({ latestPosts, projects, flags }: { latestPosts: PostsByLang; projects: ProjectsByLang; flags: SiteFlags }) {
  const { lang, t } = useLang()
  const year = new Date().getFullYear()
  return (
    <footer className="relative mt-auto border-t border-border">
      <div className="container-site flex flex-col gap-10 pt-16 pb-8">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-10">
          <div className="flex min-w-0 flex-col gap-[18px]">
            <Link href="/" className="font-display text-[22px] leading-none font-bold tracking-[0.04em]">
              MANUMARTINEZ<span className="text-green">.</span>
            </Link>
            <p className="max-w-[300px] text-sm text-fg-footer text-pretty">{t.heroSub}</p>
            <div className="flex flex-wrap gap-2">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className="flex size-10 items-center justify-center rounded-xl border border-border text-muted-foreground transition-colors hover:border-green hover:text-green"
                >
                  <Icon className="size-[18px]" />
                </a>
              ))}
            </div>
          </div>
          <div className="grid min-w-0 grid-cols-3 gap-6">
            {flags.projects && (
            <FooterCol title={t.nav.work}>
              <li>
                <Link href="/projects" className={colLink}>{t.allProjects}</Link>
              </li>
              {projects[lang].slice(0, 3).map((p) => (
                <li key={p.slug}>
                  <Link href={projectHref(p)} className={colLink}>{p.name}</Link>
                </li>
              ))}
            </FooterCol>
            )}
            {flags.blog && (
            <FooterCol title={t.nav.blog}>
              <li>
                <Link href="/blog" className={colLink}>{t.allPosts}</Link>
              </li>
              {latestPosts[lang].slice(0, 3).map((p) => (
                <li key={p.slug}>
                  <Link href={`/blog/${p.slug}`} className={colLink}>{p.title}</Link>
                </li>
              ))}
            </FooterCol>
            )}
            <FooterCol title={t.about}>
              <li><Link href="/experience" className={colLink}>{t.nav.exp}</Link></li>
              {flags.projects && <li><Link href="/projects" className={colLink}>{t.nav.work}</Link></li>}
              {flags.blog && <li><Link href="/blog" className={colLink}>{t.nav.blog}</Link></li>}
              <li><Link href="/me" className={colLink}>{t.nav.me}</Link></li>
            </FooterCol>
          </div>
        </div>
        <div aria-hidden className="pointer-events-none mt-2 -mb-18 mask-fade-b-60">
          <svg viewBox="0 0 1000 118" width="100%" preserveAspectRatio="none" className="block overflow-visible">
            <text
              x="0"
              y="112"
              textLength="1000"
              lengthAdjust="spacingAndGlyphs"
              fontSize="150"
              fill="none"
              stroke="oklch(0.80 0.05 300 / 0.75)"
              strokeWidth="1.2"
              paintOrder="stroke"
              vectorEffect="non-scaling-stroke"
              className="font-wordmark"
            >
              MANUMARTINEZ
            </text>
          </svg>
        </div>
        <div className="relative flex flex-wrap justify-between gap-3 border-t border-border-soft pt-6 font-mono text-xs text-muted-2">
          <span>© {year} Emmanuel Martinez. {t.rights}</span>
          <span>{t.footer}</span>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex min-w-0 flex-col gap-3">
      <h3 className="text-[13px] font-medium tracking-[0.06em] uppercase">{title}</h3>
      <ul className="flex flex-col gap-[9px]">{children}</ul>
    </div>
  )
}

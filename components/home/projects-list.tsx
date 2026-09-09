"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { useLang } from "@/components/site/lang-provider"
import { ArrowLink, SectionTitle } from "@/components/site/primitives"
import { projects } from "@/content"

export function ProjectsList() {
  const { lang, t } = useLang()
  return (
    <section id="work" className="container-site pt-32">
      <div className="mb-2 flex flex-wrap items-end justify-between gap-4">
        <SectionTitle>{t.projectsTitle}</SectionTitle>
        <ArrowLink href="/projects">{t.allProjects}</ArrowLink>
      </div>
      <div className="mt-6 flex flex-col">
        {projects.map((p, i) => (
          <Link
            key={p.slug}
            href={`/projects#${p.slug}`}
            className="grid items-center gap-6 rounded-xl border-t border-border px-4 py-7 transition-colors duration-200 hover:bg-card sm:grid-cols-[60px_minmax(0,2fr)_minmax(0,3fr)_auto]"
          >
            <span className="font-mono text-[13px] text-muted-2">0{i + 1}</span>
            <div className="min-w-0">
              <div className="font-display text-[30px] leading-none font-medium tracking-[-0.03em]">{p.name}</div>
              <div className="mt-1.5 text-[13px] text-violet">{p.tag[lang]}</div>
            </div>
            <p className="text-[15px] text-muted-foreground text-pretty">{p.desc[lang]}</p>
            <ArrowUpRight className="size-[22px] text-green" strokeWidth={1.5} />
          </Link>
        ))}
      </div>
    </section>
  )
}

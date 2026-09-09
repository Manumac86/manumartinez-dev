"use client"

import { useLang } from "@/components/site/lang-provider"
import { ArrowLink, SectionTitle } from "@/components/site/primitives"
import { education, experienceShort } from "@/content"
import { cn } from "@/lib/utils"

export function ExperiencePreview() {
  const { t } = useLang()
  return (
    <section id="experience" className="container-site pt-32">
      <SectionTitle className="mb-8 max-w-[18ch]">{t.expTitle}</SectionTitle>
      <div className="grid gap-3.5 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className="min-w-0 rounded-card border border-border bg-card px-7 py-2">
          {experienceShort.slice(0, 7).map((e) => (
            <div
              key={`${e.company}-${e.from}`}
              data-testid="exp-row"
              className="grid items-baseline gap-4 border-b border-border-soft py-4 sm:grid-cols-[110px_minmax(0,1fr)_auto]"
            >
              <span className={cn("font-mono text-xs", e.to ? "text-muted-2" : "text-green")}>
                {e.from} — {e.to || t.current}
              </span>
              <div className="min-w-0">
                <div className="font-medium">{e.role}</div>
                <div className="text-sm text-muted-foreground">{e.company}</div>
              </div>
              <span className="font-mono text-xs text-muted-2">{e.loc}</span>
            </div>
          ))}
          <ArrowLink href="/experience" className="py-4">
            {t.fullExp}
          </ArrowLink>
        </div>
        <div className="flex min-w-0 flex-col gap-3.5">
          {education.map((ed) => (
            <div key={ed.school} className="flex-1 rounded-card border border-border bg-gradient-edu px-6 py-[22px]">
              <div className="font-mono text-xs text-green">{ed.years}</div>
              <div className="mt-2 font-medium">{ed.school}</div>
              <div className="text-sm text-muted-foreground">{ed.degree}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

"use client"

import { useLang } from "@/components/site/lang-provider"
import { Chip } from "@/components/site/primitives"
import { projects } from "@/content"
import { cn } from "@/lib/utils"

export function ProjectsGrid({ featuredFirst = true }: { featuredFirst?: boolean }) {
  const { lang, t } = useLang()
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-3.5">
      {projects.map((p, i) => {
        const big = featuredFirst && i === 0
        return (
          <article
            key={p.slug}
            id={p.slug}
            data-featured={big || undefined}
            className={cn(
              "grid min-w-0 scroll-mt-24 gap-7 rounded-card border border-border p-7 transition-all duration-250 hover:-translate-y-[3px] hover:border-violet-deep",
              big ? "col-span-full bg-gradient-featured md:grid-cols-[minmax(0,1fr)_320px]" : "bg-card",
            )}
          >
            <div className="flex min-w-0 flex-col gap-3.5">
              <div className="flex justify-between font-mono text-xs text-muted-2">
                <span>0{i + 1}</span>
                <span>{p.year}</span>
              </div>
              <h2
                className={cn(
                  "font-display leading-[0.98] font-medium tracking-[-0.04em]",
                  big ? "text-[clamp(40px,5vw,72px)]" : "text-4xl",
                )}
              >
                {p.name}
              </h2>
              <p className="text-sm text-violet">{p.tag[lang]}</p>
              <p className="max-w-[560px] text-[15px] text-fg-2 text-pretty">{p.desc[lang]}</p>
              <div className="mt-auto grid grid-cols-[auto_1fr] gap-x-5 gap-y-2 border-t border-border pt-4 text-sm">
                <span className="pt-[3px] font-mono text-xs text-muted-2">{t.role}</span>
                <span>{p.role}</span>
                <span className="pt-[3px] font-mono text-xs text-muted-2">{t.stack}</span>
                <div className="flex flex-wrap gap-1.5">
                  {p.stack.map((s) => (
                    <Chip key={s} variant="mono">{s}</Chip>
                  ))}
                </div>
              </div>
            </div>
            <div
              className={cn(
                "flex items-center justify-center rounded-lg border border-border bg-stripes font-mono text-xs text-muted-2",
                big ? "min-h-[320px]" : "min-h-[180px]",
              )}
            >
              {p.name} · product screenshot
            </div>
          </article>
        )
      })}
    </div>
  )
}

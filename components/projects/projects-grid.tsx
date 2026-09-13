"use client"

import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { useLang } from "@/components/site/lang-provider"
import { Chip } from "@/components/site/primitives"
import { projects } from "@/content"
import { cn } from "@/lib/utils"

export function ProjectsGrid({ featuredFirst = true }: { featuredFirst?: boolean }) {
  const { lang, t } = useLang()
  return (
    <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((p, i) => {
        const big = featuredFirst && i === 0
        return (
          <article
            key={p.slug}
            id={p.slug}
            data-featured={big || undefined}
            className={cn(
              "grid min-w-0 scroll-mt-24 gap-7 rounded-card border border-border p-7 transition-all duration-250 hover:-translate-y-[3px] hover:border-violet-deep",
              big ? "col-span-full bg-gradient-featured md:grid-cols-[minmax(0,1fr)_minmax(320px,38%)]" : "bg-card",
            )}
          >
            <div className="flex min-w-0 flex-col gap-3.5">
              <div className="flex justify-between font-mono text-xs text-muted-2">
                <span>0{i + 1}</span>
                <span>{p.year}</span>
              </div>
              <h2
                className={cn(
                  big ? "text-[clamp(40px,5vw,72px)]" : "text-4xl",
                  "font-display leading-[0.98] font-medium tracking-[-0.04em]",
                )}
              >
                {p.name}
              </h2>
              <p className="text-sm text-violet">{p.tag[lang]}</p>
              <p className="max-w-[560px] text-[15px] text-fg-2 text-pretty">{p.desc[lang]}</p>
              <div className="mt-auto grid grid-cols-[auto_1fr] gap-x-5 gap-y-2 border-t border-border pt-4 text-sm">
                <span className="pt-[3px] font-mono text-xs text-muted-2">{t.role}</span>
                <span>{p.role[lang]}</span>
                <span className="pt-[3px] font-mono text-xs text-muted-2">{t.stack}</span>
                <div className="flex flex-wrap gap-1.5">
                  {p.stack.map((s) => (
                    <Chip key={s} variant="mono">{s}</Chip>
                  ))}
                </div>
                {p.url && (
                  <>
                    <span className="pt-[3px] font-mono text-xs text-muted-2">{t.web}</span>
                    <a href={p.url} target="_blank" rel="noopener noreferrer" className="inline-flex w-fit items-center gap-1 text-green hover:underline">
                      {p.url.replace(/^https?:\/\//, "")}
                      <ArrowUpRight className="size-3.5" />
                    </a>
                  </>
                )}
              </div>
            </div>
            <div
              className={cn(
                "relative flex items-center justify-center overflow-hidden rounded-lg border border-border font-mono text-xs text-muted-2",
                p.cover ? "bg-card-2" : "bg-stripes",
                big ? "min-h-[320px]" : "min-h-[180px]",
              )}
            >
              {p.cover ? (
                <Image src={p.cover} alt={`${p.name} screenshot`} fill sizes={big ? "(min-width: 768px) 40vw, 100vw" : "(min-width: 1024px) 33vw, 100vw"} className="object-cover object-top" priority={big} />
              ) : (
                <>{p.name} · product screenshot</>
              )}
            </div>
          </article>
        )
      })}
    </div>
  )
}

"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useLang } from "@/components/site/lang-provider"
import { MonoLabel } from "@/components/site/primitives"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import type { PostsByLang } from "@/lib/posts"
import { cn } from "@/lib/utils"

const ALL = "__all__"

export function BlogGrid({ posts: byLang, featuredFirst = true }: { posts: PostsByLang; featuredFirst?: boolean }) {
  const { lang, t } = useLang()
  const posts = byLang[lang]
  const [tag, setTag] = React.useState(ALL)
  const tags = React.useMemo(() => [ALL, ...Array.from(new Set(posts.map((p) => p.tag)))], [posts])
  const list = tag === ALL ? posts : posts.filter((p) => p.tag === tag)

  return (
    <>
      <div className="mb-12 grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] items-end gap-8">
        <div className="flex flex-col gap-4">
          <MonoLabel className="text-violet">{t.blogLabel}</MonoLabel>
          <h1 className="font-display text-[clamp(44px,7vw,96px)] leading-[0.95] font-medium tracking-[-0.045em]">
            {t.blogPageTitle}
          </h1>
          <p className="max-w-[560px] text-lg text-muted-foreground text-pretty">{t.blogPageSub}</p>
        </div>
        <ToggleGroup
          type="single"
          value={tag}
          onValueChange={(v) => v && setTag(v)}
          spacing={1.5}
          className="flex-wrap justify-end"
          aria-label="Filter by tag"
        >
          {tags.map((tg) => (
            <ToggleGroupItem
              key={tg}
              value={tg}
              className="h-auto rounded-full border border-border-strong bg-transparent px-3.5 py-[7px] text-[13px] font-normal text-muted-foreground shadow-none first:rounded-full last:rounded-full hover:bg-transparent hover:text-foreground data-[state=on]:border-violet-deep data-[state=on]:bg-violet-deep/20 data-[state=on]:text-foreground"
            >
              {tg === ALL ? t.allTag : tg}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p, i) => {
          const big = featuredFirst && i === 0 && tag === ALL
          return (
            <article
              key={p.slug}
              id={p.slug}
              data-featured={big || undefined}
              className={cn(
                "grid min-w-0 scroll-mt-24 gap-6 rounded-card border border-border p-7 transition-all duration-250 hover:-translate-y-[3px] hover:border-violet-deep",
                big
                  ? "col-span-full bg-gradient-featured md:grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))]"
                  : "bg-card",
              )}
            >
              <div
                className={cn(
                  "relative flex items-center justify-center overflow-hidden rounded-lg border border-border font-mono text-xs text-muted-2",
                  p.cover ? "bg-card-2" : "bg-stripes",
                  big ? "order-2 min-h-[300px]" : "min-h-[160px]",
                )}
              >
                {p.cover ? (
                  <Image src={p.cover} alt="" fill sizes={big ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 1024px) 33vw, 100vw"} className="object-cover" />
                ) : (
                  <>cover · {p.slug}</>
                )}
              </div>
              <div className="flex min-w-0 flex-col gap-3.5">
                <div className="flex justify-between font-mono text-xs text-muted-2">
                  <span className="text-violet">{p.tag}</span>
                  <span>
                    {p.date} · {p.readingTime} {t.minRead}
                  </span>
                </div>
                <h2
                  className={cn(
                    big ? "text-[clamp(32px,4.4vw,60px)]" : "text-[26px]",
                    "font-display leading-[1.02] font-medium tracking-[-0.035em] text-balance",
                  )}
                >
                  <Link href={`/blog/${p.slug}`}>{p.title}</Link>
                </h2>
                <p className="max-w-[600px] text-[15px] text-fg-2 text-pretty">{p.excerpt}</p>
                <Link href={`/blog/${p.slug}`} className="mt-auto inline-flex items-center gap-1.5 text-sm text-green">
                  {t.readMore}
                  <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </article>
          )
        })}
      </div>
    </>
  )
}

"use client"

import Link from "next/link"
import { useLang } from "@/components/site/lang-provider"
import { ArrowLink, SectionTitle } from "@/components/site/primitives"
import type { PostsByLang } from "@/lib/posts"

export function BlogPreview({ posts }: { posts: PostsByLang }) {
  const { lang, t } = useLang()
  return (
    <section id="blog" className="container-site pt-32">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <SectionTitle className="max-w-[16ch]">{t.blogTitle}</SectionTitle>
        <ArrowLink href="/blog">{t.allPosts}</ArrowLink>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-3.5">
        {posts[lang].slice(0, 3).map((p) => (
          <Link
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="flex min-h-[260px] flex-col gap-3.5 rounded-card border border-border bg-card p-7 transition-all duration-250 hover:-translate-y-[3px] hover:border-violet-deep"
          >
            <div className="flex justify-between font-mono text-xs text-muted-2">
              <span className="text-violet">{p.tag}</span>
              <span>
                {p.readingTime} {t.minRead}
              </span>
            </div>
            <h3 className="font-display text-[26px] leading-[1.08] font-medium tracking-[-0.03em] text-balance">
              {p.title}
            </h3>
            <p className="text-sm text-muted-foreground text-pretty">{p.excerpt}</p>
            <span className="mt-auto font-mono text-xs text-muted-2">{p.date}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}

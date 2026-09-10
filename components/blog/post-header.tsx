import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { MonoLabel } from "@/components/site/primitives"
import { copy, type Lang } from "@/content"
import { formatDate } from "@/lib/format"
import type { Post } from "@/lib/posts"
import { cn } from "@/lib/utils"

export function PostHeader({ post, lang, size = "lg", className }: { post: Post; lang: Lang; size?: "lg" | "md"; className?: string }) {
  const t = copy[lang]
  const { meta } = post
  return (
    <header className={cn("flex flex-col gap-5", className)}>
      <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground">
        <ArrowLeft className="size-3.5" />
        {t.backToBlog}
      </Link>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-muted-2">
        <MonoLabel className="text-violet">{meta.tag}</MonoLabel>
        <span>·</span>
        <time dateTime={meta.date}>{formatDate(meta.date, lang)}</time>
        <span>·</span>
        <span>
          {meta.readingTime} {t.minRead}
        </span>
      </div>
      <h1
        className={cn(
          "font-display font-medium tracking-[-0.04em] text-balance",
          size === "lg" ? "text-[clamp(36px,5.5vw,76px)] leading-[0.98]" : "text-[clamp(32px,4.4vw,56px)] leading-[1.02]",
        )}
      >
        {meta.title}
      </h1>
      <p className="max-w-[720px] text-lg text-muted-foreground text-pretty">{meta.excerpt}</p>
      {post.fallback && (
        <p className="rounded-md border border-border-violet-soft bg-card px-4 py-2.5 text-sm text-fg-2" role="note">
          {t.notTranslated}
        </p>
      )}
      {!post.fallback && meta.translatedFrom && meta.translatedFrom !== meta.lang && (
        <p className="font-mono text-xs text-muted-2">{t.autoTranslated}</p>
      )}
    </header>
  )
}

import Image from "next/image"
import { PostBody } from "@/components/blog/post-body"
import { PostHeader } from "@/components/blog/post-header"
import { Toc } from "@/components/blog/toc"
import { Chip, MonoLabel } from "@/components/site/primitives"
import { copy, type Lang } from "@/content"
import type { Post } from "@/lib/posts"

export function CaseStudyTemplate({ post, lang }: { post: Post; lang: Lang }) {
  const t = copy[lang]
  const { meta } = post
  const facts = [
    meta.client && { label: t.client, value: meta.client },
    meta.role && { label: t.role, value: meta.role },
  ].filter((f): f is { label: string; value: string } => Boolean(f))
  return (
    <article data-template="case-study" className="container-site relative pt-[clamp(48px,8vh,96px)] pb-24">
      <div className="grid gap-3.5 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className="rounded-band border border-border-violet bg-gradient-me p-[clamp(28px,4vw,48px)]">
          <PostHeader post={post} lang={lang} />
        </div>
        <aside className="flex flex-col gap-6 rounded-band border border-border bg-card p-7">
          {facts.map((f) => (
            <div key={f.label}>
              <MonoLabel className="text-muted-2">{f.label}</MonoLabel>
              <div className="mt-1.5 font-medium">{f.value}</div>
            </div>
          ))}
          {meta.stack && meta.stack.length > 0 && (
            <div>
              <MonoLabel className="text-muted-2">{t.stack}</MonoLabel>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {meta.stack.map((s) => (
                  <Chip key={s} variant="mono">{s}</Chip>
                ))}
              </div>
            </div>
          )}
          {meta.cover && (
            <div className="relative mt-auto aspect-[4/3] overflow-hidden rounded-2xl border border-border">
              <Image src={meta.cover} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
            </div>
          )}
        </aside>
      </div>
      <div className="mx-auto mt-14 grid max-w-[1100px] gap-12 lg:grid-cols-[minmax(0,1fr)_240px]">
        <PostBody html={post.html} className="max-w-[760px]" />
        <Toc headings={post.headings} label={t.onThisPage} className="hidden lg:sticky lg:top-28 lg:flex lg:self-start" />
      </div>
    </article>
  )
}

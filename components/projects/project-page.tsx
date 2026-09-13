import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import { PostBody } from "@/components/blog/post-body"
import { Toc } from "@/components/blog/toc"
import { CtaBand } from "@/components/site/cta-band"
import { Chip, MonoLabel } from "@/components/site/primitives"
import { Button } from "@/components/ui/button"
import { copy, type Lang } from "@/content"
import type { Project } from "@/lib/projects"

export function ProjectPage({ project, lang }: { project: Project; lang: Lang }) {
  const t = copy[lang]
  const { meta } = project
  const facts: { label: string; value: string }[] = [
    { label: t.year, value: meta.year },
    { label: t.role, value: meta.role },
    ...(meta.status ? [{ label: t.projectStatus, value: meta.status }] : []),
  ]
  return (
    <article data-template="project" className="container-site relative pt-[clamp(48px,8vh,96px)] pb-24">
      <div className="grid gap-3.5 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className="flex flex-col gap-5 rounded-band border border-border-violet bg-gradient-me p-[clamp(28px,4vw,48px)]">
          <Link href="/projects" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft className="size-3.5" />
            {t.allProjects}
          </Link>
          <MonoLabel className="text-violet">{meta.tag}</MonoLabel>
          <h1 className="font-display text-[clamp(40px,6vw,84px)] leading-[0.95] font-medium tracking-[-0.045em]">{meta.name}</h1>
          <p className="max-w-[720px] text-lg text-fg-2 text-pretty">{meta.excerpt}</p>
          {meta.url && (
            <div className="mt-auto">
              <Button asChild variant="hero" size="cta">
                <a href={meta.url} target="_blank" rel="noopener noreferrer">
                  {t.visitSite}
                  <ArrowUpRight />
                </a>
              </Button>
            </div>
          )}
        </div>
        <aside className="flex flex-col gap-6 rounded-band border border-border bg-card p-7">
          {facts.map((f) => (
            <div key={f.label}>
              <MonoLabel className="block text-muted-2">{f.label}</MonoLabel>
              <div className="mt-1.5 font-medium">{f.value}</div>
            </div>
          ))}
          {meta.stack.length > 0 && (
            <div>
              <MonoLabel className="block text-muted-2">{t.stack}</MonoLabel>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {meta.stack.map((s) => (
                  <Chip key={s} variant="mono">{s}</Chip>
                ))}
              </div>
            </div>
          )}
          {meta.url && (
            <div>
              <MonoLabel className="block text-muted-2">{t.web}</MonoLabel>
              <a href={meta.url} target="_blank" rel="noopener noreferrer" className="mt-1.5 inline-flex items-center gap-1 text-green hover:underline">
                {meta.url.replace(/^https?:\/\//, "")}
                <ArrowUpRight className="size-3.5" />
              </a>
            </div>
          )}
        </aside>
      </div>

      {meta.cover && (
        <div className="relative mt-3.5 aspect-[21/9] overflow-hidden rounded-band border border-border bg-card-2">
          <Image src={meta.cover} alt={`${meta.name} screenshot`} fill priority sizes="(min-width: 1680px) 1520px, 100vw" className="object-cover object-top" />
        </div>
      )}

      <div className="mx-auto mt-14 grid max-w-[1100px] gap-12 lg:grid-cols-[minmax(0,1fr)_240px]">
        <PostBody html={project.html} className="max-w-[760px]" />
        <Toc headings={project.headings} label={t.onThisPage} className="hidden lg:sticky lg:top-28 lg:flex lg:self-start" />
      </div>

      {meta.gallery.length > 0 && (
        <section className="mt-20">
          <MonoLabel className="text-muted-2">{t.screenshots}</MonoLabel>
          <div className="mt-4 grid gap-3.5 md:grid-cols-2">
            {meta.gallery.map((src, i) => (
              <div key={src} className="relative aspect-[16/9] overflow-hidden rounded-card border border-border bg-card-2">
                <Image src={src} alt={`${meta.name} screenshot ${i + 1}`} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover object-top" />
              </div>
            ))}
          </div>
        </section>
      )}

      <CtaBand className="mt-24" />
    </article>
  )
}

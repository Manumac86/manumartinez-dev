import Link from "next/link"
import { Plus } from "lucide-react"
import { Chip, MonoLabel } from "@/components/site/primitives"
import { Button } from "@/components/ui/button"
import { listPostsForAdmin, usesGithub } from "@/lib/cms-store"

export default async function AdminPostsPage() {
  const byLang = await listPostsForAdmin()
  const enBySlug = new Map(byLang.en.map((p) => [p.slug, p]))
  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <MonoLabel className="text-muted-2">Posts</MonoLabel>
          <h1 className="mt-2 font-display text-4xl font-medium tracking-[-0.03em]">{byLang.es.length} posts</h1>
          <p className="mt-1 font-mono text-xs text-muted-2">
            {usesGithub() ? "Source: GitHub — a saved post shows here right away and goes live after the deploy." : "Source: local files"}
          </p>
        </div>
        <Button asChild variant="green" size="pill">
          <Link href="/admin/new"><Plus />New post</Link>
        </Button>
      </div>
      <ul className="flex flex-col gap-2.5">
        {byLang.es.map((p) => {
          const en = enBySlug.get(p.slug)
          const hasEn = en?.lang === "en"
          return (
            <li key={p.slug}>
              <Link href={`/admin/${p.slug}`} className="grid items-center gap-4 rounded-2xl border border-border-soft bg-card-2 px-5 py-4 transition-colors hover:border-violet-hover sm:grid-cols-[minmax(0,1fr)_auto_auto_auto]">
                <div className="min-w-0">
                  <div className="truncate font-medium">{p.title}</div>
                  <div className="mt-0.5 font-mono text-xs text-muted-2">/blog/{p.slug} · {p.template}</div>
                </div>
                <Chip variant="cert">{p.tag}</Chip>
                <span className="font-mono text-xs text-muted-2">{p.date}</span>
                <div className="flex gap-1.5">
                  {p.draft && <Chip variant="mono" className="border-violet-deep text-violet">draft</Chip>}
                  <Chip variant="mono" className={hasEn ? "border-green/50 text-green" : "text-muted-2"}>{hasEn ? "es + en" : "es only"}</Chip>
                </div>
              </Link>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

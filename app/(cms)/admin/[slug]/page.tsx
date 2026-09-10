import Link from "next/link"
import { notFound } from "next/navigation"
import { ExternalLink } from "lucide-react"
import { PostEditor } from "@/components/cms/post-editor"
import { markdownToForm } from "@/lib/cms"
import { loadPostSource, usesGithub } from "@/lib/cms-store"
import { getAllPosts, getPostTags } from "@/lib/posts"
import { isTranslationCurrent } from "@/lib/translate"

export default async function EditPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  if (!/^[a-z0-9-]+$/.test(slug)) notFound()
  const stored = await loadPostSource(slug)
  if (!stored) notFound()
  const tags = getPostTags(await getAllPosts("es", { includeDrafts: true }))
  const form = markdownToForm(slug, stored.source)
  form.source = stored.sourceLang
  const translation = !usesGithub() ? "unknown" : stored.translation ? (isTranslationCurrent(stored.source, stored.translation) ? "current" : "stale") : "missing"
  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <h1 className="font-display text-3xl font-medium tracking-[-0.03em]">{form.title}</h1>
        <Link href={`/blog/${slug}`} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          View live<ExternalLink className="size-3.5" />
        </Link>
      </div>
      <PostEditor mode="edit" initial={form} tags={tags} translation={translation} />
    </>
  )
}

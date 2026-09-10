"use server"

import { put } from "@vercel/blob"
import { buildPostFiles } from "@/lib/cms"
import { postFormSchema } from "@/lib/post-form"
import { requireEditor } from "@/lib/cms-session"
import { commitFiles, postPaths, readRepoFile } from "@/lib/github"
import { renderMarkdown } from "@/lib/markdown"
import { isTranslationCurrent } from "@/lib/translate"

export type SaveResult =
  | { ok: true; commitUrl: string; translated: boolean; slug: string }
  | { ok: false; error: string; issues?: Record<string, string> }

export async function previewMarkdown(markdown: string): Promise<string> {
  await requireEditor()
  return renderMarkdown(markdown.slice(0, 200_000))
}

export async function savePost(_prev: SaveResult | null, formData: FormData): Promise<SaveResult> {
  const user = await requireEditor()
  const str = (k: string) => (formData.get(k) ?? "").toString()
  const parsed = postFormSchema.safeParse({
    slug: str("slug"),
    title: str("title"),
    excerpt: str("excerpt"),
    tag: str("tag"),
    date: str("date"),
    template: str("template"),
    source: str("source"),
    draft: formData.get("draft") === "on",
    cover: str("cover"),
    client: str("client"),
    role: str("role"),
    stack: str("stack"),
    body: str("body"),
    retranslate: formData.get("retranslate") === "on",
  })
  if (!parsed.success) {
    const issues: Record<string, string> = {}
    for (const i of parsed.error.issues) issues[i.path.join(".")] = i.message
    return { ok: false, error: "invalid", issues }
  }
  const form = parsed.data
  if (!process.env.GITHUB_TOKEN) return { ok: false, error: "GITHUB_TOKEN is not configured — cannot publish." }
  try {
    const paths = postPaths(form.slug)
    const target = form.source === "es" ? "en" : "es"
    const existing = await readRepoFile(paths[target])
    const { files, translated } = await buildPostFiles(form, existing)
    const commit = await commitFiles(
      `post: ${form.slug}${form.draft ? " (draft)" : ""}\n\nSaved from the CMS by ${user.email}.${translated ? " Translation regenerated." : ""}`,
      [
        { path: paths.es, content: files.es },
        { path: paths.en, content: files.en },
      ],
    )
    return { ok: true, commitUrl: commit.url, translated, slug: form.slug }
  } catch (err) {
    console.error(err)
    return { ok: false, error: err instanceof Error ? err.message : "Unknown error" }
  }
}

export async function deletePost(slug: string): Promise<{ ok: true; commitUrl: string } | { ok: false; error: string }> {
  const user = await requireEditor()
  if (!/^[a-z0-9-]+$/.test(slug)) return { ok: false, error: "Bad slug" }
  if (!process.env.GITHUB_TOKEN) return { ok: false, error: "GITHUB_TOKEN is not configured." }
  try {
    const paths = postPaths(slug)
    const commit = await commitFiles(`post: remove ${slug}\n\nDeleted from the CMS by ${user.email}.`, [
      { path: paths.es, content: null },
      { path: paths.en, content: null },
    ])
    return { ok: true, commitUrl: commit.url }
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Unknown error" }
  }
}

const MAX_COVER_BYTES = 5 * 1024 * 1024

export async function uploadCover(formData: FormData): Promise<{ ok: true; url: string } | { ok: false; error: string }> {
  await requireEditor()
  const file = formData.get("file")
  const slug = (formData.get("slug") ?? "post").toString().replace(/[^a-z0-9-]/g, "") || "post"
  if (!(file instanceof File)) return { ok: false, error: "No file" }
  if (!file.type.startsWith("image/")) return { ok: false, error: "Only images are allowed" }
  if (file.size > MAX_COVER_BYTES) return { ok: false, error: "Max 5 MB" }
  const ext = file.name.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg"
  try {
    const blob = await put(`blog/${slug}/cover-${Date.now()}.${ext}`, file, { access: "public", contentType: file.type })
    return { ok: true, url: blob.url }
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Upload failed" }
  }
}

export async function translationStatus(slug: string): Promise<"current" | "stale" | "missing" | "unknown"> {
  await requireEditor()
  if (!process.env.GITHUB_TOKEN) return "unknown"
  const paths = postPaths(slug)
  const [es, en] = await Promise.all([readRepoFile(paths.es), readRepoFile(paths.en)])
  if (!es || !en) return "missing"
  return isTranslationCurrent(es, en) ? "current" : "stale"
}

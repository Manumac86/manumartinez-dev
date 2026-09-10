import matter from "gray-matter"
import { z } from "zod"
import type { Lang } from "@/content/types"
import { POST_TEMPLATES } from "@/lib/posts"
import { hashSource, isTranslationCurrent, translatePost, type Generate } from "@/lib/translate"

export const slugSchema = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers and dashes")

export const postFormSchema = z.object({
  slug: slugSchema,
  title: z.string().trim().min(1).max(160),
  excerpt: z.string().trim().min(1).max(400),
  tag: z.string().trim().min(1).max(40),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  template: z.enum(POST_TEMPLATES),
  source: z.enum(["en", "es"]),
  draft: z.boolean(),
  cover: z.string().url().optional().or(z.literal("")),
  client: z.string().trim().max(120).optional().or(z.literal("")),
  role: z.string().trim().max(120).optional().or(z.literal("")),
  stack: z.string().trim().max(400).optional().or(z.literal("")),
  body: z.string().min(1),
  retranslate: z.boolean().default(false),
})
export type PostForm = z.infer<typeof postFormSchema>

export function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80)
}

/** Serialises the source-language markdown file from the form. */
export function buildSourceMarkdown(form: PostForm): string {
  const fm: Record<string, unknown> = {
    title: form.title,
    excerpt: form.excerpt,
    tag: form.tag,
    date: form.date,
    template: form.template,
    source: form.source,
  }
  if (form.draft) fm.draft = true
  if (form.cover) fm.cover = form.cover
  if (form.client) fm.client = form.client
  if (form.role) fm.role = form.role
  const stack = (form.stack ?? "").split(",").map((s) => s.trim()).filter(Boolean)
  if (stack.length) fm.stack = stack
  return matter.stringify(`\n${form.body.trim()}\n`, fm)
}

export interface BuildResult {
  files: Record<Lang, string>
  translated: boolean
}

/**
 * Produces both language files. The translation is regenerated only when the source body changed
 * (hash mismatch), when there is no stored translation, or when the editor asks for it.
 */
export async function buildPostFiles(
  form: PostForm,
  existingTranslation: string | null,
  generate?: Generate,
): Promise<BuildResult> {
  const source = buildSourceMarkdown(form)
  const target: Lang = form.source === "es" ? "en" : "es"
  const reuse = existingTranslation !== null && !form.retranslate && isTranslationCurrent(source, existingTranslation)
  if (reuse) {
    // Copy non-translated metadata (date, tag, template, draft, cover…) so both files stay in sync.
    const { data, content } = matter(existingTranslation)
    const { data: srcData } = matter(source)
    const merged = { ...srcData, title: data.title, excerpt: data.excerpt, source: form.source, translatedFrom: form.source, sourceHash: data.sourceHash }
    return { files: { [form.source]: source, [target]: matter.stringify(content, merged) } as Record<Lang, string>, translated: false }
  }
  const translation = await translatePost({ source, from: form.source, to: target }, generate)
  return { files: { [form.source]: source, [target]: translation } as Record<Lang, string>, translated: true }
}

export { hashSource }

/** Parses a stored markdown file back into editor form values. */
export function markdownToForm(slug: string, markdown: string): PostForm {
  const { data, content } = matter(markdown)
  const date = data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date ?? "")
  return {
    slug,
    title: String(data.title ?? ""),
    excerpt: String(data.excerpt ?? ""),
    tag: String(data.tag ?? ""),
    date,
    template: (POST_TEMPLATES as readonly string[]).includes(data.template) ? (data.template as PostForm["template"]) : "article",
    source: data.source === "en" ? "en" : "es",
    draft: Boolean(data.draft),
    cover: typeof data.cover === "string" ? data.cover : "",
    client: typeof data.client === "string" ? data.client : "",
    role: typeof data.role === "string" ? data.role : "",
    stack: Array.isArray(data.stack) ? data.stack.join(", ") : "",
    body: content.trim(),
    retranslate: false,
  }
}

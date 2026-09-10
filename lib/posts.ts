import { readdir, readFile, stat } from "node:fs/promises"
import path from "node:path"
import matter from "gray-matter"
import readingTime from "reading-time"
import { z } from "zod"
import { LANGS, type Lang } from "@/content/types"
import { extractHeadings, renderMarkdown, type Heading } from "@/lib/markdown"

export const POST_TEMPLATES = ["article", "note", "case-study"] as const
export type PostTemplate = (typeof POST_TEMPLATES)[number]

const frontmatterSchema = z.object({
  title: z.string().min(1),
  excerpt: z.string().min(1),
  tag: z.string().min(1),
  date: z.coerce.date(),
  template: z.enum(POST_TEMPLATES).default("article"),
  cover: z.string().optional(),
  readingTime: z.number().int().positive().optional(),
  draft: z.boolean().default(false),
  source: z.enum(["en", "es"]).default("es"),
  translatedFrom: z.enum(["en", "es"]).optional(),
  sourceHash: z.string().optional(),
  client: z.string().optional(),
  role: z.string().optional(),
  stack: z.array(z.string()).optional(),
})

export interface PostMeta {
  slug: string
  lang: Lang
  title: string
  excerpt: string
  tag: string
  /** ISO date, YYYY-MM-DD */
  date: string
  readingTime: number
  template: PostTemplate
  cover?: string
  draft: boolean
  source: Lang
  translatedFrom?: Lang
  client?: string
  role?: string
  stack?: string[]
}

export interface Post {
  meta: PostMeta
  html: string
  headings: Heading[]
  /** True when the requested language was missing and another one was served. */
  fallback: boolean
}

export type PostsByLang = Record<Lang, PostMeta[]>

export const DEFAULT_POSTS_DIR = path.join(process.cwd(), "content", "posts")

interface LoadOptions {
  dir?: string
  includeDrafts?: boolean
}

async function readPostFile(dir: string, slug: string, lang: Lang): Promise<{ meta: PostMeta; body: string } | null> {
  const file = path.join(dir, slug, `${lang}.md`)
  let raw: string
  try {
    raw = await readFile(file, "utf8")
  } catch {
    return null
  }
  const { data, content } = matter(raw)
  const parsed = frontmatterSchema.safeParse(data)
  if (!parsed.success) {
    throw new Error(`Invalid frontmatter in ${path.relative(process.cwd(), file)}: ${parsed.error.issues.map((i) => `${i.path.join(".")} ${i.message}`).join("; ")}`)
  }
  const fm = parsed.data
  const meta: PostMeta = {
    slug,
    lang,
    title: fm.title,
    excerpt: fm.excerpt,
    tag: fm.tag,
    date: fm.date.toISOString().slice(0, 10),
    readingTime: fm.readingTime ?? Math.max(1, Math.round(readingTime(content).minutes)),
    template: fm.template,
    cover: fm.cover,
    draft: fm.draft,
    source: fm.source,
    translatedFrom: fm.translatedFrom,
    client: fm.client,
    role: fm.role,
    stack: fm.stack,
  }
  return { meta, body: content }
}

export async function getPostSlugs(options: LoadOptions = {}): Promise<string[]> {
  const dir = options.dir ?? DEFAULT_POSTS_DIR
  let entries: string[]
  try {
    entries = await readdir(dir)
  } catch {
    return []
  }
  const slugs: string[] = []
  for (const entry of entries) {
    if (entry.startsWith(".")) continue
    const s = await stat(path.join(dir, entry))
    if (s.isDirectory()) slugs.push(entry)
  }
  return slugs.sort()
}

/** All posts for one language, newest first. Falls back to the other language when a translation is missing. */
export async function getAllPosts(lang: Lang, options: LoadOptions = {}): Promise<PostMeta[]> {
  const dir = options.dir ?? DEFAULT_POSTS_DIR
  const slugs = await getPostSlugs({ dir })
  const posts: PostMeta[] = []
  for (const slug of slugs) {
    const found = (await readPostFile(dir, slug, lang)) ?? (await readPostFile(dir, slug, otherLang(lang)))
    if (!found) continue
    if (found.meta.draft && !options.includeDrafts) continue
    posts.push(found.meta)
  }
  return posts.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.slug.localeCompare(b.slug)))
}

export async function getAllPostsByLang(options: LoadOptions = {}): Promise<PostsByLang> {
  const [en, es] = await Promise.all(LANGS.map((l) => getAllPosts(l, options)))
  return { en, es }
}

export async function getPost(slug: string, lang: Lang, options: LoadOptions = {}): Promise<Post | null> {
  const dir = options.dir ?? DEFAULT_POSTS_DIR
  if (!/^[a-z0-9-]+$/.test(slug)) return null
  let fallback = false
  let found = await readPostFile(dir, slug, lang)
  if (!found) {
    found = await readPostFile(dir, slug, otherLang(lang))
    fallback = found !== null
  }
  if (!found) return null
  if (found.meta.draft && !options.includeDrafts) return null
  const html = await renderMarkdown(found.body)
  return { meta: found.meta, html, headings: extractHeadings(html), fallback }
}

export function otherLang(lang: Lang): Lang {
  return lang === "en" ? "es" : "en"
}

export function getPostTags(posts: PostMeta[]): string[] {
  return Array.from(new Set(posts.map((p) => p.tag)))
}

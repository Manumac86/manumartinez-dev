import { readdir, readFile, stat } from "node:fs/promises"
import path from "node:path"
import matter from "gray-matter"
import { z } from "zod"
import { LANGS, type Lang, type ProjectMeta } from "@/content/types"
import { extractHeadings, renderMarkdown, type Heading } from "@/lib/markdown"
import { projectHref, type ProjectsByLang } from "@/lib/project-links"

export { projectHref, type ProjectsByLang }

const frontmatterSchema = z.object({
  name: z.string().min(1),
  tag: z.string().min(1),
  excerpt: z.string().min(1),
  year: z.coerce.string().min(4),
  role: z.string().min(1),
  status: z.string().optional(),
  stack: z.array(z.string()).default([]),
  url: z.string().url().optional(),
  cover: z.string().optional(),
  gallery: z.array(z.string()).default([]),
  order: z.number().default(100),
  draft: z.boolean().default(false),
  source: z.enum(["en", "es"]).default("es"),
  translatedFrom: z.enum(["en", "es"]).optional(),
  sourceHash: z.string().optional(),
})

export interface Project {
  meta: ProjectMeta
  html: string
  headings: Heading[]
  fallback: boolean
}

export const DEFAULT_PROJECTS_DIR = path.join(process.cwd(), "content", "projects")

interface LoadOptions {
  dir?: string
  includeDrafts?: boolean
}

export function parseProjectMarkdown(slug: string, lang: Lang, raw: string, label = `${slug}/${lang}.md`): { meta: ProjectMeta; body: string } {
  const { data, content } = matter(raw)
  const parsed = frontmatterSchema.safeParse(data)
  if (!parsed.success) {
    throw new Error(`Invalid frontmatter in ${label}: ${parsed.error.issues.map((i) => `${i.path.join(".")} ${i.message}`).join("; ")}`)
  }
  const fm = parsed.data
  const body = content.trim()
  return {
    meta: {
      slug,
      lang,
      name: fm.name,
      tag: fm.tag,
      excerpt: fm.excerpt,
      year: fm.year,
      role: fm.role,
      status: fm.status,
      stack: fm.stack,
      url: fm.url,
      cover: fm.cover,
      gallery: fm.gallery,
      order: fm.order,
      draft: fm.draft,
      source: fm.source,
      translatedFrom: fm.translatedFrom,
      hasPage: body.length > 0,
    },
    body,
  }
}

async function readProjectFile(dir: string, slug: string, lang: Lang) {
  const file = path.join(dir, slug, `${lang}.md`)
  let raw: string
  try {
    raw = await readFile(/* turbopackIgnore: true */ file, "utf8")
  } catch {
    return null
  }
  return parseProjectMarkdown(slug, lang, raw, path.relative(process.cwd(), file))
}

export async function getProjectSlugs(options: LoadOptions = {}): Promise<string[]> {
  const dir = options.dir ?? DEFAULT_PROJECTS_DIR
  let entries: string[]
  try {
    entries = await readdir(/* turbopackIgnore: true */ dir)
  } catch {
    return []
  }
  const slugs: string[] = []
  for (const entry of entries) {
    if (entry.startsWith(".")) continue
    const s = await stat(path.join(/* turbopackIgnore: true */ dir, entry))
    if (s.isDirectory()) slugs.push(entry)
  }
  return slugs.sort()
}

function otherLang(lang: Lang): Lang {
  return lang === "en" ? "es" : "en"
}

function byOrder(a: ProjectMeta, b: ProjectMeta): number {
  return a.order - b.order || a.slug.localeCompare(b.slug)
}

/** Projects for one language ordered by `order`, falling back to the other language when a translation is missing. */
export async function getAllProjects(lang: Lang, options: LoadOptions = {}): Promise<ProjectMeta[]> {
  const dir = options.dir ?? DEFAULT_PROJECTS_DIR
  const slugs = await getProjectSlugs({ dir })
  const out: ProjectMeta[] = []
  for (const slug of slugs) {
    const found = (await readProjectFile(dir, slug, lang)) ?? (await readProjectFile(dir, slug, otherLang(lang)))
    if (!found) continue
    if (found.meta.draft && !options.includeDrafts) continue
    out.push(found.meta)
  }
  return out.sort(byOrder)
}

export async function getAllProjectsByLang(options: LoadOptions = {}): Promise<ProjectsByLang> {
  const [en, es] = await Promise.all(LANGS.map((l) => getAllProjects(l, options)))
  return { en, es }
}

/** A project page. Null when the slug is unknown or the project has no body. */
export async function getProject(slug: string, lang: Lang, options: LoadOptions = {}): Promise<Project | null> {
  const dir = options.dir ?? DEFAULT_PROJECTS_DIR
  if (!/^[a-z0-9-]+$/.test(slug)) return null
  let fallback = false
  let found = await readProjectFile(dir, slug, lang)
  if (!found) {
    found = await readProjectFile(dir, slug, otherLang(lang))
    fallback = found !== null
  }
  if (!found || !found.meta.hasPage) return null
  if (found.meta.draft && !options.includeDrafts) return null
  const html = await renderMarkdown(found.body)
  return { meta: found.meta, html, headings: extractHeadings(html), fallback }
}


import "server-only"
import { readFile } from "node:fs/promises"
import path from "node:path"
import matter from "gray-matter"
import type { Lang } from "@/content/types"
import { listRepoDirs, postPaths, readRepoFile } from "@/lib/github"
import { DEFAULT_POSTS_DIR, getAllPostsByLang, otherLang, parsePostMarkdown, type PostsByLang } from "@/lib/posts"

export interface PostSource {
  sourceLang: Lang
  source: string
  translation: string | null
}

async function readLocal(slug: string, lang: Lang): Promise<string | null> {
  try {
    return await readFile(/* turbopackIgnore: true */ path.join(DEFAULT_POSTS_DIR, slug, `${lang}.md`), "utf8")
  } catch {
    return null
  }
}

/** GitHub is the source of truth once configured (it may be ahead of the deployed build); the filesystem is the dev fallback. */
export function usesGithub(): boolean {
  return Boolean(process.env.GITHUB_TOKEN)
}

export async function loadPostSource(slug: string): Promise<PostSource | null> {
  const paths = postPaths(slug)
  const read = usesGithub() ? (p: string) => readRepoFile(p) : (p: string) => readLocal(slug, p.endsWith("en.md") ? "en" : "es")
  const [es, en] = await Promise.all([read(paths.es), read(paths.en)])
  if (!es && !en) return null
  const pick = (md: string | null) => (md ? matter(md).data : {})
  const esData = pick(es)
  // The source is whichever file is not marked as translated; default to Spanish.
  const sourceLang: Lang = es && !esData.translatedFrom ? "es" : en ? "en" : "es"
  const source = sourceLang === "es" ? es! : en!
  const translation = sourceLang === "es" ? en : es
  return { sourceLang, source, translation }
}

/**
 * Posts as they exist in the repo right now (drafts included). Falls back to the deployed
 * filesystem when GitHub is not configured. Mirrors getAllPostsByLang's language fallback.
 */
export async function listPostsForAdmin(): Promise<PostsByLang> {
  if (!usesGithub()) return getAllPostsByLang({ includeDrafts: true })
  const slugs = await listRepoDirs("content/posts")
  const files = await Promise.all(
    slugs.map(async (slug) => {
      const paths = postPaths(slug)
      const [es, en] = await Promise.all([readRepoFile(paths.es), readRepoFile(paths.en)])
      return { slug, es, en }
    }),
  )
  const byLang: PostsByLang = { en: [], es: [] }
  for (const lang of ["en", "es"] as const) {
    for (const f of files) {
      const raw = f[lang] ?? f[otherLang(lang)]
      const rawLang: Lang = f[lang] ? lang : otherLang(lang)
      if (!raw) continue
      byLang[lang].push(parsePostMarkdown(f.slug, rawLang, raw).meta)
    }
    byLang[lang].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.slug.localeCompare(b.slug)))
  }
  return byLang
}

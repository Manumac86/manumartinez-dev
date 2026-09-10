import path from "node:path"
import { describe, expect, it } from "vitest"
import { getAllPosts, getAllPostsByLang, getPost, getPostSlugs, getPostTags } from "@/lib/posts"
import { extractHeadings, renderMarkdown } from "@/lib/markdown"

const dir = path.join(process.cwd(), "lib", "__fixtures__", "posts")

describe("posts loader", () => {
  it("lists slugs from directories", async () => {
    expect(await getPostSlugs({ dir })).toEqual(["draft-only", "es-only", "hello-world"])
  })

  it("returns published posts newest first, hiding drafts by default", async () => {
    const es = await getAllPosts("es", { dir })
    expect(es.map((p) => p.slug)).toEqual(["hello-world", "es-only"])
    const withDrafts = await getAllPosts("es", { dir, includeDrafts: true })
    expect(withDrafts.map((p) => p.slug)).toEqual(["draft-only", "hello-world", "es-only"])
  })

  it("falls back to the other language when a translation is missing", async () => {
    const en = await getAllPosts("en", { dir })
    const esOnly = en.find((p) => p.slug === "es-only")
    expect(esOnly?.lang).toBe("es")
    expect(esOnly?.title).toBe("Solo español")
    const post = await getPost("es-only", "en", { dir })
    expect(post?.fallback).toBe(true)
    const native = await getPost("hello-world", "en", { dir })
    expect(native?.fallback).toBe(false)
    expect(native?.meta.translatedFrom).toBe("es")
  })

  it("parses frontmatter, computes reading time and exposes case-study fields", async () => {
    const post = await getPost("es-only", "es", { dir })
    expect(post?.meta).toMatchObject({ template: "case-study", client: "Fintio", stack: ["Next.js", "Python"], date: "2026-07-01", readingTime: 1 })
  })

  it("renders markdown with heading ids and highlighted code", async () => {
    const post = await getPost("hello-world", "es", { dir })
    expect(post?.html).toContain('<h2 id="sección-uno">')
    expect(post?.html).toContain("<strong>negrita</strong>")
    expect(post?.html).toMatch(/<pre[^>]*data-language="ts"/)
    expect(post?.headings).toEqual([{ level: 2, id: "sección-uno", text: "Sección uno" }])
  })

  it("returns null for unknown or unsafe slugs and hidden drafts", async () => {
    expect(await getPost("nope", "es", { dir })).toBeNull()
    expect(await getPost("../etc", "es", { dir })).toBeNull()
    expect(await getPost("draft-only", "es", { dir })).toBeNull()
    expect((await getPost("draft-only", "es", { dir, includeDrafts: true }))?.meta.draft).toBe(true)
  })

  it("groups by language and derives tags", async () => {
    const byLang = await getAllPostsByLang({ dir })
    expect(byLang.en).toHaveLength(2)
    expect(getPostTags(byLang.es)).toEqual(["Startups", "Collybrix"])
  })

  it("markdown helpers work standalone", async () => {
    const html = await renderMarkdown("## Uno\n\n### Dos\n\ntexto")
    expect(extractHeadings(html).map((h) => h.id)).toEqual(["uno", "dos"])
  })
})

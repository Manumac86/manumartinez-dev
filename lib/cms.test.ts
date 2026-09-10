import matter from "gray-matter"
import { describe, expect, it } from "vitest"
import { buildPostFiles, buildSourceMarkdown, markdownToForm, postFormSchema, slugify, type PostForm } from "@/lib/cms"

const form: PostForm = {
  slug: "hola-mundo",
  title: "Hola mundo",
  excerpt: "Resumen",
  tag: "Startups",
  date: "2026-09-10",
  template: "case-study",
  source: "es",
  draft: true,
  cover: "https://x.public.blob.vercel-storage.com/c.jpg",
  client: "Fintio",
  role: "Founder",
  stack: "Next.js, Python",
  body: "## Uno\n\nTexto.",
  retranslate: false,
}

const fakeGenerate = async () => JSON.stringify({ title: "Hello world", excerpt: "Summary", body: "## One\n\nText." })

describe("cms", () => {
  it("slugifies titles with accents", () => {
    expect(slugify("¿Por qué tomamos equity? — Colláboración")).toBe("por-que-tomamos-equity-collaboracion")
    expect(postFormSchema.shape.slug.safeParse("bad slug").success).toBe(false)
  })

  it("serialises the source file with only the relevant frontmatter", () => {
    const md = buildSourceMarkdown(form)
    const { data, content } = matter(md)
    expect(data).toEqual({ title: "Hola mundo", excerpt: "Resumen", tag: "Startups", date: "2026-09-10", template: "case-study", source: "es", draft: true, cover: form.cover, client: "Fintio", role: "Founder", stack: ["Next.js", "Python"] })
    expect(content.trim()).toBe("## Uno\n\nTexto.")
    expect(matter(buildSourceMarkdown({ ...form, draft: false, cover: "", client: "", stack: "" })).data).not.toHaveProperty("draft")
  })

  it("translates when there is no stored translation, and reuses a current one", async () => {
    const first = await buildPostFiles(form, null, fakeGenerate)
    expect(first.translated).toBe(true)
    expect(matter(first.files.en).data).toMatchObject({ title: "Hello world", translatedFrom: "es", client: "Fintio" })

    let calls = 0
    const counting = async () => { calls++; return fakeGenerate() }
    const second = await buildPostFiles({ ...form, tag: "Product", draft: false }, first.files.en, counting)
    expect(second.translated).toBe(false)
    expect(calls).toBe(0)
    expect(matter(second.files.en).data).toMatchObject({ title: "Hello world", tag: "Product" })
    expect(matter(second.files.en).data).not.toHaveProperty("draft")

    const third = await buildPostFiles({ ...form, body: "## Uno\n\nTexto nuevo." }, first.files.en, counting)
    expect(third.translated).toBe(true)
    expect(calls).toBe(1)

    const forced = await buildPostFiles({ ...form, retranslate: true }, first.files.en, counting)
    expect(forced.translated).toBe(true)
    expect(calls).toBe(2)
  })

  it("round-trips a markdown file into form values", () => {
    const md = buildSourceMarkdown(form)
    expect(markdownToForm("hola-mundo", md)).toEqual(form)
  })
})

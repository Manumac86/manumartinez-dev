import matter from "gray-matter"
import { describe, expect, it } from "vitest"
import { buildPrompt, hashSource, isTranslationCurrent, translatePost, validateTranslation } from "@/lib/translate"

const source = `---
title: Hola mundo
excerpt: Un resumen.
tag: Startups
date: 2026-08-21
template: article
source: es
---

## Uno

Texto con \`código\`.

\`\`\`ts
const a = 1
\`\`\`
`

describe("translate", () => {
  it("builds a prompt with the translatable fields and the body only", () => {
    const p = buildPrompt({ source, from: "es", to: "en" })
    expect(p).toContain("from Spanish to English")
    expect(p).toContain('title: "Hola mundo"')
    expect(p).toContain("## Uno")
    expect(p).not.toContain("tag: Startups")
  })

  it("produces a translated markdown file with copied frontmatter and a source hash", async () => {
    const generate = async () => JSON.stringify({ title: "Hello world", excerpt: "A summary.", body: "## One\n\nText with `código`.\n\n```ts\nconst a = 1\n```" })
    const out = await translatePost({ source, from: "es", to: "en" }, generate)
    const { data, content } = matter(out)
    expect(data).toMatchObject({ title: "Hello world", excerpt: "A summary.", tag: "Startups", template: "article", source: "es", translatedFrom: "es" })
    expect(data.sourceHash).toBe(hashSource(matter(source).content))
    expect(content.trim().startsWith("## One")).toBe(true)
    expect(isTranslationCurrent(source, out)).toBe(true)
    expect(isTranslationCurrent(source.replace("Texto", "Otro texto"), out)).toBe(false)
  })

  it("tolerates chatter around the JSON and rejects structural drift", async () => {
    const chatty = async () => "Sure! " + JSON.stringify({ title: "T", excerpt: "E", body: "## One\n\n```ts\nconst a = 1\n```" }) + "\nDone."
    await expect(translatePost({ source, from: "es", to: "en" }, chatty)).resolves.toContain("## One")
    const drifted = async () => JSON.stringify({ title: "T", excerpt: "E", body: "## One\n\nno code here" })
    await expect(translatePost({ source, from: "es", to: "en" }, drifted)).rejects.toThrow("code blocks")
    expect(() => validateTranslation("# a\n# b", "# a")).toThrow("headings")
  })
})

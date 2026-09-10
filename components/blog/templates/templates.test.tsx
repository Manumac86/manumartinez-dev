import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { postTemplates } from "@/components/blog/templates"
import type { Post } from "@/lib/posts"

const base: Post = {
  meta: {
    slug: "demo",
    lang: "es",
    title: "Demo",
    excerpt: "Extracto",
    tag: "Product",
    date: "2026-05-18",
    readingTime: 4,
    template: "article",
    draft: false,
    source: "es",
  },
  html: '<h2 id="uno">Uno</h2><p>Hola</p>',
  headings: [{ id: "uno", text: "Uno", level: 2 }],
  fallback: false,
}

describe("post templates", () => {
  it("article renders header, body, toc and localised date", () => {
    const Article = postTemplates.article
    render(<Article post={base} lang="es" />)
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Demo")
    expect(screen.getByRole("navigation", { name: "En esta página" })).toBeInTheDocument()
    expect(screen.getByText("18 de mayo de 2026")).toBeInTheDocument()
    expect(screen.getByText("4 min")).toBeInTheDocument()
  })

  it("note has no toc and shows the fallback notice in English", () => {
    const Note = postTemplates.note
    render(<Note post={{ ...base, fallback: true }} lang="en" />)
    expect(screen.queryByRole("navigation", { name: "On this page" })).toBeNull()
    expect(screen.getByRole("note")).toHaveTextContent(/isn't translated yet/)
  })

  it("case study shows client, role and stack", () => {
    const CaseStudy = postTemplates["case-study"]
    render(<CaseStudy post={{ ...base, meta: { ...base.meta, template: "case-study", client: "Fintio", role: "Founder", stack: ["Next.js"] } }} lang="en" />)
    expect(screen.getByText("Fintio")).toBeInTheDocument()
    expect(screen.getByText("Founder")).toBeInTheDocument()
    expect(screen.getByText("Next.js")).toBeInTheDocument()
  })
})

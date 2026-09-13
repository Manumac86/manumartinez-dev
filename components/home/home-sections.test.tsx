import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { LangProvider } from "@/components/site/lang-provider"
import { ProjectsList } from "@/components/home/projects-list"
import { ExperiencePreview } from "@/components/home/experience-preview"
import { BlogPreview } from "@/components/home/blog-preview"
import { getAllPostsByLang } from "@/lib/posts"
import { getAllProjectsByLang } from "@/lib/projects"

const wrap = (ui: React.ReactNode) => render(<LangProvider initialLang="es">{ui}</LangProvider>)

describe("home sections", () => {
  it("lists published projects with zero-padded index linking to page or anchor", async () => {
    wrap(<ProjectsList projects={await getAllProjectsByLang()} />)
    expect(screen.getAllByRole("link", { name: /0[1-4]/ })).toHaveLength(3)
    expect(screen.getByRole("link", { name: /Fintio/ })).toHaveAttribute("href", "/projects/fintio")
    expect(screen.getByRole("link", { name: /Parrot/ })).toHaveAttribute("href", "/projects/parrot")
  })

  it("shows 7 roles, current one labelled Ahora, plus 3 schools", () => {
    wrap(<ExperiencePreview />)
    expect(screen.getAllByTestId("exp-row")).toHaveLength(7)
    expect(screen.getByText("2025 — Ahora")).toBeInTheDocument()
    expect(screen.getByText("Platzi")).toBeInTheDocument()
  })

  it("shows the 3 latest posts in Spanish", async () => {
    wrap(<BlogPreview posts={await getAllPostsByLang()} />)
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(3)
    expect(screen.getByText(/Sistemas multi-agente/)).toBeInTheDocument()
  })
})

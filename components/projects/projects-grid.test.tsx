import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { LangProvider } from "@/components/site/lang-provider"
import { ProjectsGrid } from "@/components/projects/projects-grid"
import { getAllProjectsByLang } from "@/lib/projects"

describe("ProjectsGrid", () => {
  it("renders the published projects, first one featured", async () => {
    const projects = await getAllProjectsByLang()
    render(
      <LangProvider initialLang="en">
        <ProjectsGrid projects={projects} />
      </LangProvider>,
    )
    const articles = screen.getAllByRole("article")
    expect(articles).toHaveLength(3)
    expect(articles[0]).toHaveAttribute("id", "milano")
    expect(articles[0]).toHaveAttribute("data-featured", "true")
    expect(articles[1]).not.toHaveAttribute("data-featured")
    expect(screen.getByRole("link", { name: /fintio\.app/ })).toHaveAttribute("href", "https://fintio.app")
    expect(screen.getByRole("img", { name: "Fintio screenshot" })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "Fintio" })).toHaveAttribute("href", "/projects/fintio")
    expect(screen.queryByRole("link", { name: "Parrot" })).toBeNull()
    expect(screen.getByRole("link", { name: "Milano" })).toHaveAttribute("href", "/projects/milano")
  })
})

import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { LangProvider } from "@/components/site/lang-provider"
import { ProjectsGrid } from "@/components/projects/projects-grid"

describe("ProjectsGrid", () => {
  it("renders 4 anchored articles, first one featured", () => {
    render(
      <LangProvider initialLang="en">
        <ProjectsGrid />
      </LangProvider>,
    )
    const articles = screen.getAllByRole("article")
    expect(articles).toHaveLength(4)
    expect(articles[0]).toHaveAttribute("id", "fintio")
    expect(articles[0]).toHaveAttribute("data-featured", "true")
    expect(articles[1]).not.toHaveAttribute("data-featured")
  })
})

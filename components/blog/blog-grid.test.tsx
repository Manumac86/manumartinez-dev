import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"
import { LangProvider } from "@/components/site/lang-provider"
import { BlogGrid } from "@/components/blog/blog-grid"

describe("BlogGrid", () => {
  it("shows all posts with the first featured, then filters by tag and drops the featured treatment", async () => {
    render(
      <LangProvider initialLang="en">
        <BlogGrid />
      </LangProvider>,
    )
    expect(screen.getAllByRole("article")).toHaveLength(4)
    expect(screen.getAllByRole("article")[0]).toHaveAttribute("data-featured", "true")
    await userEvent.click(screen.getByRole("radio", { name: "Startups" }))
    const filtered = screen.getAllByRole("article")
    expect(filtered).toHaveLength(1)
    expect(filtered[0]).toHaveAttribute("id", "technical-cofounder-playbook")
    expect(filtered[0]).not.toHaveAttribute("data-featured")
  })
})

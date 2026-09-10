import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"
import { LangProvider } from "@/components/site/lang-provider"
import { BlogGrid } from "@/components/blog/blog-grid"
import { getAllPostsByLang } from "@/lib/posts"

describe("BlogGrid", () => {
  it("shows all posts with the first featured, then filters by tag and drops the featured treatment", async () => {
    const posts = await getAllPostsByLang()
    render(
      <LangProvider initialLang="en">
        <BlogGrid posts={posts} />
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

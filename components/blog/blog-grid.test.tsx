import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"
import { LangProvider } from "@/components/site/lang-provider"
import { BlogGrid } from "@/components/blog/blog-grid"
import { getAllPostsByLang } from "@/lib/posts"

describe("BlogGrid", () => {
  it("shows all posts with the first featured, then filters by tag and drops the featured treatment", async () => {
    const posts = await getAllPostsByLang()
    const all = posts.en
    const tag = all[all.length - 1].tag
    const expected = all.filter((p) => p.tag === tag)
    render(
      <LangProvider initialLang="en">
        <BlogGrid posts={posts} />
      </LangProvider>,
    )
    expect(screen.getAllByRole("article")).toHaveLength(all.length)
    expect(screen.getAllByRole("article")[0]).toHaveAttribute("data-featured", "true")
    await userEvent.click(screen.getByRole("radio", { name: tag }))
    const filtered = screen.getAllByRole("article")
    expect(filtered.map((a) => a.id)).toEqual(expected.map((p) => p.slug))
    expect(filtered[0]).not.toHaveAttribute("data-featured")
  })
})

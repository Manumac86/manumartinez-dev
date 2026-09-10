import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { LangProvider } from "@/components/site/lang-provider"
import { SiteFooter } from "@/components/site/site-footer"
import { getAllPostsByLang } from "@/lib/posts"

describe("SiteFooter", () => {
  it("renders social links, project links, latest posts and location", async () => {
    const latestPosts = await getAllPostsByLang()
    render(
      <LangProvider initialLang="en">
        <SiteFooter latestPosts={latestPosts} />
      </LangProvider>,
    )
    expect(screen.getByLabelText("LinkedIn")).toHaveAttribute("href", expect.stringContaining("linkedin.com"))
    expect(screen.getByLabelText("GitLab")).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "Fintio" })).toHaveAttribute("href", "/projects#fintio")
    expect(screen.getByRole("link", { name: /Multi-agent systems in production/ })).toHaveAttribute(
      "href",
      "/blog/multi-agent-production",
    )
    expect(screen.getByText(/Madrid, Spain/)).toBeInTheDocument()
  })
})

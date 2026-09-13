import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { LangProvider } from "@/components/site/lang-provider"
import { SiteFooter } from "@/components/site/site-footer"
import { getAllPostsByLang } from "@/lib/posts"
import { getAllProjectsByLang } from "@/lib/projects"

describe("SiteFooter", () => {
  it("renders social links, project links, latest posts and location", async () => {
    const latestPosts = await getAllPostsByLang()
    render(
      <LangProvider initialLang="en">
        <SiteFooter latestPosts={latestPosts} projects={await getAllProjectsByLang()} flags={{ projects: true, blog: true }} />
      </LangProvider>,
    )
    expect(screen.getByLabelText("LinkedIn")).toHaveAttribute("href", expect.stringContaining("linkedin.com"))
    expect(screen.getByLabelText("GitLab")).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "Fintio" })).toHaveAttribute("href", "/projects/fintio")
    expect(screen.getByRole("link", { name: "Milano" })).toHaveAttribute("href", "/projects/milano")
    expect(screen.getByRole("link", { name: /Multi-agent systems in production/ })).toHaveAttribute(
      "href",
      "/blog/multi-agent-production",
    )
    expect(screen.getByText(/Madrid, Spain/)).toBeInTheDocument()
  })

  it("drops the Projects and Blog columns when the flags are off", async () => {
    const latestPosts = await getAllPostsByLang()
    render(
      <LangProvider initialLang="en">
        <SiteFooter latestPosts={latestPosts} projects={await getAllProjectsByLang()} flags={{ projects: false, blog: false }} />
      </LangProvider>,
    )
    expect(screen.queryByRole("heading", { name: "Projects" })).toBeNull()
    expect(screen.queryByRole("link", { name: "Fintio" })).toBeNull()
    expect(screen.getByRole("link", { name: "Experience" })).toBeInTheDocument()
  })
})

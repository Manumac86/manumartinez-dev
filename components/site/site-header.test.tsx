import { render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import { LangProvider } from "@/components/site/lang-provider"
import { SiteHeader } from "@/components/site/site-header"

vi.mock("next/navigation", () => ({ usePathname: () => "/blog" }))

describe("SiteHeader", () => {
  it("marks the current route active and shows the other language", () => {
    render(
      <LangProvider initialLang="en">
        <SiteHeader />
      </LangProvider>,
    )
    expect(screen.getByRole("link", { name: "Blog" })).toHaveAttribute("aria-current", "page")
    expect(screen.getByRole("link", { name: "Projects" })).not.toHaveAttribute("aria-current")
    expect(screen.getByRole("button", { name: /switch to español/i })).toHaveTextContent("ES")
  })
})

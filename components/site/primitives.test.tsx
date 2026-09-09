import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { ArrowLink, Chip, MonoLabel } from "@/components/site/primitives"

describe("primitives", () => {
  it("renders mono label with the mono-label utility", () => {
    render(<MonoLabel>stack</MonoLabel>)
    expect(screen.getByText("stack")).toHaveClass("mono-label")
  })

  it("chip variants", () => {
    render(<Chip variant="mono">Next.js</Chip>)
    expect(screen.getByText("Next.js")).toHaveClass("font-mono")
  })

  it("external arrow link opens in new tab", () => {
    render(
      <ArrowLink href="https://collybrix.com" external>
        collybrix.com
      </ArrowLink>,
    )
    expect(screen.getByRole("link")).toHaveAttribute("target", "_blank")
  })
})

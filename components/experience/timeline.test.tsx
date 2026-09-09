import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"
import { LangProvider } from "@/components/site/lang-provider"
import { Timeline } from "@/components/experience/timeline"

describe("Timeline", () => {
  it("renders 18 roles, first open by default, single-open accordion", async () => {
    render(
      <LangProvider initialLang="en">
        <Timeline />
      </LangProvider>,
    )
    const triggers = screen.getAllByRole("button")
    expect(triggers).toHaveLength(18)
    expect(triggers[0]).toHaveAttribute("aria-expanded", "true")
    expect(screen.getByText("Now")).toBeInTheDocument()
    await userEvent.click(triggers[2])
    expect(triggers[0]).toHaveAttribute("aria-expanded", "false")
    expect(triggers[2]).toHaveAttribute("aria-expanded", "true")
  })
})

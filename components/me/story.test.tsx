import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { LangProvider } from "@/components/site/lang-provider"
import { Story } from "@/components/me/story"

describe("Story", () => {
  it("renders the 5 Spanish paragraphs and the sticky title", () => {
    render(
      <LangProvider initialLang="es">
        <Story />
      </LangProvider>,
    )
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("De frontend a VP de Ingeniería")
    expect(screen.getAllByTestId("story-p")).toHaveLength(5)
  })
})

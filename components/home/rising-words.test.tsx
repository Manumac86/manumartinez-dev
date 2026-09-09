import { render } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { RisingWords } from "@/components/home/rising-words"

describe("RisingWords", () => {
  it("wraps every word in its own clipped span", () => {
    const { container } = render(<RisingWords text="I build AI-native products" replayKey="en" />)
    expect(container.querySelectorAll("[data-word]")).toHaveLength(4)
    expect(container.textContent).toBe("I build AI-native products")
  })
})

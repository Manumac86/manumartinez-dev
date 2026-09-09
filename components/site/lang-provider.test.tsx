import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"
import { LangProvider, useLang } from "@/components/site/lang-provider"
import { parseLang } from "@/lib/lang"

function Probe() {
  const { lang, t, toggle } = useLang()
  return (
    <button onClick={toggle}>
      {lang}:{t.nav.work}
    </button>
  )
}

describe("LangProvider", () => {
  it("parses cookie values safely", () => {
    expect(parseLang("es")).toBe("es")
    expect(parseLang("fr")).toBe("en")
    expect(parseLang(undefined)).toBe("en")
  })

  it("toggles language, copy and persists a cookie", async () => {
    render(
      <LangProvider initialLang="en">
        <Probe />
      </LangProvider>,
    )
    expect(screen.getByRole("button")).toHaveTextContent("en:Projects")
    await userEvent.click(screen.getByRole("button"))
    expect(screen.getByRole("button")).toHaveTextContent("es:Proyectos")
    expect(document.cookie).toContain("lang=es")
    expect(document.documentElement.lang).toBe("es")
  })
})

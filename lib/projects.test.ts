import path from "node:path"
import { describe, expect, it } from "vitest"
import { getAllProjects, getAllProjectsByLang, getProject, projectHref } from "@/lib/projects"

const dir = path.join(process.cwd(), "lib", "__fixtures__", "projects")

describe("projects loader", () => {
  it("orders by `order` and falls back to the other language", async () => {
    const es = await getAllProjects("es", { dir })
    expect(es.map((p) => p.slug)).toEqual(["beta", "alpha"])
    const en = await getAllProjects("en", { dir })
    expect(en.find((p) => p.slug === "beta")?.lang).toBe("es")
    expect(en.find((p) => p.slug === "alpha")?.tag).toBe("Alpha tag")
  })

  it("flags which projects have a page and builds hrefs accordingly", async () => {
    const { es } = await getAllProjectsByLang({ dir })
    const alpha = es.find((p) => p.slug === "alpha")!
    const beta = es.find((p) => p.slug === "beta")!
    expect(alpha.hasPage).toBe(true)
    expect(beta.hasPage).toBe(false)
    expect(projectHref(alpha)).toBe("/projects/alpha")
    expect(projectHref(beta)).toBe("/projects#beta")
    expect(alpha.gallery).toHaveLength(2)
    expect(alpha.url).toBe("https://alpha.test")
  })

  it("renders a project page and refuses card-only or unknown slugs", async () => {
    const alpha = await getProject("alpha", "en", { dir })
    expect(alpha?.html).toContain('<h2 id="problem">')
    expect(alpha?.fallback).toBe(false)
    expect(await getProject("beta", "es", { dir })).toBeNull()
    expect(await getProject("nope", "es", { dir })).toBeNull()
  })
})

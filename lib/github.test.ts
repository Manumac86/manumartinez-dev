import { describe, expect, it } from "vitest"
import { commitFiles, postPaths, readRepoFile, type GithubConfig } from "@/lib/github"

function fakeGithub() {
  const calls: { method: string; url: string; body?: unknown }[] = []
  const fetchImpl: typeof fetch = async (input, init) => {
    const url = String(input)
    const body = init?.body ? JSON.parse(String(init.body)) : undefined
    calls.push({ method: init?.method ?? "GET", url, body })
    const json = (data: unknown, status = 200) => new Response(JSON.stringify(data), { status, headers: { "content-type": "application/json" } })
    if (url.includes("/contents/content/posts/missing/")) return new Response("Not Found", { status: 404 })
    if (url.includes("/contents/")) return json({ content: Buffer.from("---\ntitle: Hola\n---\n").toString("base64"), encoding: "base64" })
    if (url.endsWith("/git/ref/heads/main")) return json({ object: { sha: "head123" } })
    if (url.endsWith("/git/commits/head123")) return json({ tree: { sha: "tree000" } })
    if (url.endsWith("/git/blobs")) return json({ sha: `blob-${calls.length}` })
    if (url.endsWith("/git/trees")) return json({ sha: "tree999" })
    if (url.endsWith("/git/commits")) return json({ sha: "commit42", html_url: "https://github.com/x/y/commit/commit42" })
    if (url.endsWith("/git/refs/heads/main")) return json({ ref: "refs/heads/main" })
    return new Response("nope", { status: 500 })
  }
  const cfg: GithubConfig = { token: "t", owner: "Manumac86", repo: "manumartinez-dev", branch: "main", fetchImpl }
  return { cfg, calls }
}

describe("github client", () => {
  it("reads a file and returns null on 404", async () => {
    const { cfg } = fakeGithub()
    expect(await readRepoFile("content/posts/hola/es.md", cfg)).toContain("title: Hola")
    expect(await readRepoFile("content/posts/missing/es.md", cfg)).toBeNull()
  })

  it("commits several files in one commit on top of the branch head", async () => {
    const { cfg, calls } = fakeGithub()
    const result = await commitFiles("post: hola", [
      { path: "content/posts/hola/es.md", content: "es" },
      { path: "content/posts/hola/en.md", content: "en" },
      { path: "content/posts/old/es.md", content: null },
    ], cfg)
    expect(result).toEqual({ sha: "commit42", url: "https://github.com/x/y/commit/commit42" })
    const tree = calls.find((c) => c.url.endsWith("/git/trees"))?.body as { base_tree: string; tree: { path: string; sha: string | null }[] }
    expect(tree.base_tree).toBe("tree000")
    expect(tree.tree.map((t) => t.path)).toEqual(["content/posts/hola/es.md", "content/posts/hola/en.md", "content/posts/old/es.md"])
    expect(tree.tree[2].sha).toBeNull()
    const commit = calls.find((c) => c.url.endsWith("/git/commits") && c.method === "POST")?.body as { parents: string[]; message: string }
    expect(commit.parents).toEqual(["head123"])
    expect(commit.message).toBe("post: hola")
    expect(calls.at(-1)).toMatchObject({ method: "PATCH", body: { sha: "commit42", force: false } })
  })

  it("rejects empty commits and surfaces API errors", async () => {
    const { cfg } = fakeGithub()
    await expect(commitFiles("x", [], cfg)).rejects.toThrow("Nothing to commit")
    await expect(readRepoFile("weird/path", { ...cfg, fetchImpl: async () => new Response("boom", { status: 500 }) })).rejects.toThrow("→ 500")
  })

  it("derives post paths", () => {
    expect(postPaths("hola")).toEqual({ es: "content/posts/hola/es.md", en: "content/posts/hola/en.md" })
  })
})

describe("listRepoDirs", () => {
  it("returns only directories, sorted", async () => {
    const fetchImpl: typeof fetch = async () =>
      new Response(JSON.stringify([{ name: "zeta", type: "dir" }, { name: "README.md", type: "file" }, { name: "alpha", type: "dir" }]), { status: 200 })
    const { listRepoDirs } = await import("@/lib/github")
    expect(await listRepoDirs("content/posts", { token: "t", owner: "o", repo: "r", branch: "main", fetchImpl })).toEqual(["alpha", "zeta"])
  })
})

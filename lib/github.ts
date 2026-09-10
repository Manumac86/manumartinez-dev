/**
 * Minimal GitHub Contents/Git Data client used by the CMS to commit posts.
 * Uses the Git Data API so several files land in ONE commit (atomic publish).
 */

export interface GithubConfig {
  token: string
  owner: string
  repo: string
  branch: string
  apiBase?: string
  fetchImpl?: typeof fetch
}

export interface FileChange {
  path: string
  /** UTF-8 content. `null` deletes the file. */
  content: string | null
}

export interface CommitResult {
  sha: string
  url: string
}

function envConfig(): GithubConfig {
  const token = process.env.GITHUB_TOKEN
  const repo = process.env.GITHUB_REPO ?? "Manumac86/manumartinez-dev"
  const [owner, name] = repo.split("/")
  if (!token) throw new Error("GITHUB_TOKEN is not configured")
  if (!owner || !name) throw new Error("GITHUB_REPO must be owner/repo")
  return { token, owner, repo: name, branch: process.env.GITHUB_BRANCH ?? "main" }
}

async function gh<T>(cfg: GithubConfig, method: string, path: string, body?: unknown): Promise<T> {
  const f = cfg.fetchImpl ?? fetch
  const res = await f(`${cfg.apiBase ?? "https://api.github.com"}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${cfg.token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      ...(body ? { "Content-Type": "application/json" } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  })
  if (!res.ok) {
    const text = await res.text().catch(() => "")
    throw new Error(`GitHub ${method} ${path} → ${res.status} ${text.slice(0, 200)}`)
  }
  return (await res.json()) as T
}

/** Reads a text file from the branch; null when missing. */
export async function readRepoFile(path: string, cfg: GithubConfig = envConfig()): Promise<string | null> {
  try {
    const data = await gh<{ content: string; encoding: string }>(
      cfg,
      "GET",
      `/repos/${cfg.owner}/${cfg.repo}/contents/${encodeURI(path)}?ref=${encodeURIComponent(cfg.branch)}`,
    )
    return Buffer.from(data.content, "base64").toString("utf8")
  } catch (err) {
    if (err instanceof Error && err.message.includes("→ 404")) return null
    throw err
  }
}

/** Commits all changes atomically on top of the branch head. */
export async function commitFiles(message: string, changes: FileChange[], cfg: GithubConfig = envConfig()): Promise<CommitResult> {
  if (changes.length === 0) throw new Error("Nothing to commit")
  const base = `/repos/${cfg.owner}/${cfg.repo}`
  const ref = await gh<{ object: { sha: string } }>(cfg, "GET", `${base}/git/ref/heads/${encodeURIComponent(cfg.branch)}`)
  const headSha = ref.object.sha
  const headCommit = await gh<{ tree: { sha: string } }>(cfg, "GET", `${base}/git/commits/${headSha}`)

  const tree = await Promise.all(
    changes.map(async (c) => {
      if (c.content === null) return { path: c.path, mode: "100644", type: "blob", sha: null }
      const blob = await gh<{ sha: string }>(cfg, "POST", `${base}/git/blobs`, { content: c.content, encoding: "utf-8" })
      return { path: c.path, mode: "100644", type: "blob", sha: blob.sha }
    }),
  )
  const newTree = await gh<{ sha: string }>(cfg, "POST", `${base}/git/trees`, { base_tree: headCommit.tree.sha, tree })
  const commit = await gh<{ sha: string; html_url: string }>(cfg, "POST", `${base}/git/commits`, {
    message,
    tree: newTree.sha,
    parents: [headSha],
  })
  await gh(cfg, "PATCH", `${base}/git/refs/heads/${encodeURIComponent(cfg.branch)}`, { sha: commit.sha, force: false })
  return { sha: commit.sha, url: commit.html_url }
}

export function postPaths(slug: string): { es: string; en: string } {
  return { es: `content/posts/${slug}/es.md`, en: `content/posts/${slug}/en.md` }
}

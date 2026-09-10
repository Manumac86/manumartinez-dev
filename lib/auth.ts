/** Who may use the CMS: a Clerk user with `publicMetadata.role = "editor"` or an email on the CMS_EDITORS allowlist. */

export interface EditorCandidate {
  emails: string[]
  role?: unknown
}

export type EnvLike = Record<string, string | undefined>

export function editorAllowlist(env: EnvLike = process.env): string[] {
  return (env.CMS_EDITORS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean)
}

export function isEditor(candidate: EditorCandidate, env: EnvLike = process.env): boolean {
  if (candidate.role === "editor") return true
  const allow = editorAllowlist(env)
  return candidate.emails.some((e) => allow.includes(e.toLowerCase()))
}

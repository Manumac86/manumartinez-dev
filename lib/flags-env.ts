/** A flag is on only when its variable is exactly "on" (case-insensitive). Anything else, including unset, is off. */
export function readEnvFlag(name: string, env: Record<string, string | undefined> = process.env): boolean {
  return (env[name] ?? "").trim().toLowerCase() === "on"
}

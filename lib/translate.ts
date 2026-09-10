import { createHash } from "node:crypto"
import matter from "gray-matter"
import { generateText } from "ai"
import type { Lang } from "@/content/types"

export const TRANSLATION_MODEL = process.env.TRANSLATION_MODEL ?? "anthropic/claude-sonnet-5"

const LANG_NAME: Record<Lang, string> = { en: "English", es: "Spanish" }

export interface TranslateInput {
  /** Full markdown file including frontmatter. */
  source: string
  from: Lang
  to: Lang
}

export type Generate = (prompt: string) => Promise<string>

const defaultGenerate: Generate = async (prompt) => {
  const { text } = await generateText({ model: TRANSLATION_MODEL, prompt, temperature: 0.2 })
  return text
}

export function hashSource(markdown: string): string {
  return createHash("sha256").update(markdown).digest("hex").slice(0, 16)
}

/** Fields that must be translated inside the frontmatter. Everything else is copied verbatim. */
const TRANSLATED_FIELDS = ["title", "excerpt"] as const

export function buildPrompt({ source, from, to }: TranslateInput): string {
  const { data, content } = matter(source)
  const fields = TRANSLATED_FIELDS.filter((k) => typeof data[k] === "string").map((k) => `${k}: ${JSON.stringify(data[k])}`)
  return [
    `You are a professional translator. Translate the following blog post from ${LANG_NAME[from]} to ${LANG_NAME[to]}.`,
    "Rules:",
    "- Preserve Markdown structure exactly: headings, lists, links, images, tables, blockquotes and code blocks.",
    "- Never translate code, URLs, product names, or anything inside backticks or fenced code blocks.",
    "- Keep the author's voice: direct, technical, first person. Do not add or remove content.",
    `- Output ONLY a JSON object with keys ${JSON.stringify([...TRANSLATED_FIELDS, "body"])}. No prose, no code fences.`,
    "",
    "FRONTMATTER FIELDS:",
    ...fields,
    "",
    "BODY:",
    content.trim(),
  ].join("\n")
}

function parseJsonObject(text: string): Record<string, string> {
  const start = text.indexOf("{")
  const end = text.lastIndexOf("}")
  if (start === -1 || end === -1) throw new Error("Translator did not return a JSON object")
  return JSON.parse(text.slice(start, end + 1)) as Record<string, string>
}

const FENCE = /```[\s\S]*?```/g

/** Sanity checks: same number of code fences and headings, otherwise the model drifted. */
export function validateTranslation(sourceBody: string, translatedBody: string): void {
  const fences = (s: string) => (s.match(FENCE) ?? []).length
  const headings = (s: string) => (s.replace(FENCE, "").match(/^#{1,6}\s/gm) ?? []).length
  if (fences(sourceBody) !== fences(translatedBody)) throw new Error("Translation changed the number of code blocks")
  if (headings(sourceBody) !== headings(translatedBody)) throw new Error("Translation changed the number of headings")
}

/** Returns the translated markdown file (frontmatter + body) ready to be written as `<to>.md`. */
export async function translatePost(input: TranslateInput, generate: Generate = defaultGenerate): Promise<string> {
  const { data, content } = matter(input.source)
  const raw = await generate(buildPrompt(input))
  const out = parseJsonObject(raw)
  if (typeof out.body !== "string") throw new Error("Translator returned no body")
  validateTranslation(content, out.body)
  const fm: Record<string, unknown> = { ...data }
  for (const k of TRANSLATED_FIELDS) if (typeof out[k] === "string" && out[k].trim()) fm[k] = out[k].trim()
  fm.source = input.from
  fm.translatedFrom = input.from
  fm.sourceHash = hashSource(content)
  return matter.stringify(`\n${out.body.trim()}\n`, fm)
}

/** True when the stored translation was produced from the current source body. */
export function isTranslationCurrent(sourceMarkdown: string, translatedMarkdown: string): boolean {
  const { content } = matter(sourceMarkdown)
  const { data } = matter(translatedMarkdown)
  return data.sourceHash === hashSource(content)
}

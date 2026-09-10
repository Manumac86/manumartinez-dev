/** Client-safe part of the CMS: form schema, slug helper and template list. No Node APIs here. */
import { z } from "zod"

export const POST_TEMPLATES = ["article", "note", "case-study"] as const
export type PostTemplate = (typeof POST_TEMPLATES)[number]

export const slugSchema = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers and dashes")

export const postFormSchema = z.object({
  slug: slugSchema,
  title: z.string().trim().min(1).max(160),
  excerpt: z.string().trim().min(1).max(400),
  tag: z.string().trim().min(1).max(40),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  template: z.enum(POST_TEMPLATES),
  source: z.enum(["en", "es"]),
  draft: z.boolean(),
  cover: z.string().url().optional().or(z.literal("")),
  client: z.string().trim().max(120).optional().or(z.literal("")),
  role: z.string().trim().max(120).optional().or(z.literal("")),
  stack: z.string().trim().max(400).optional().or(z.literal("")),
  body: z.string().min(1),
  retranslate: z.boolean().default(false),
})
export type PostForm = z.infer<typeof postFormSchema>

export function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80)
}

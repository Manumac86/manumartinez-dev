import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypePrettyCode from "rehype-pretty-code"
import rehypeSlug from "rehype-slug"
import rehypeStringify from "rehype-stringify"
import remarkGfm from "remark-gfm"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import { unified } from "unified"

export interface Heading {
  id: string
  text: string
  level: 2 | 3
}

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype)
  .use(rehypeSlug)
  .use(rehypeAutolinkHeadings, { behavior: "wrap", properties: { className: ["heading-link"] } })
  .use(rehypePrettyCode, { theme: "vesper", keepBackground: false, defaultLang: "text" })
  .use(rehypeStringify)

/** Renders markdown to HTML with GFM, heading anchors and Shiki-highlighted code blocks. */
export async function renderMarkdown(markdown: string): Promise<string> {
  const file = await processor.process(markdown)
  return String(file)
}

/** Extracts h2/h3 headings from rendered HTML for a table of contents. */
export function extractHeadings(html: string): Heading[] {
  const out: Heading[] = []
  const re = /<h([23]) id="([^"]+)">(.*?)<\/h\1>/gs
  let m: RegExpExecArray | null
  while ((m = re.exec(html))) {
    out.push({ level: Number(m[1]) as 2 | 3, id: m[2], text: m[3].replace(/<[^>]+>/g, "") })
  }
  return out
}

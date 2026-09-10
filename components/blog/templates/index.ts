import type { Lang } from "@/content"
import type { Post, PostTemplate } from "@/lib/posts"
import { ArticleTemplate } from "./article"
import { CaseStudyTemplate } from "./case-study"
import { NoteTemplate } from "./note"

export type PostTemplateComponent = (props: { post: Post; lang: Lang }) => React.ReactNode

export const postTemplates: Record<PostTemplate, PostTemplateComponent> = {
  article: ArticleTemplate,
  note: NoteTemplate,
  "case-study": CaseStudyTemplate,
}

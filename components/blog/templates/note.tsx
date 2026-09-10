import { PostBody } from "@/components/blog/post-body"
import { PostHeader } from "@/components/blog/post-header"
import type { Lang } from "@/content"
import type { Post } from "@/lib/posts"

export function NoteTemplate({ post, lang }: { post: Post; lang: Lang }) {
  return (
    <article data-template="note" className="container-site relative pt-[clamp(48px,8vh,96px)] pb-24">
      <div className="mx-auto max-w-[720px]">
        <PostHeader post={post} lang={lang} size="md" />
        <PostBody html={post.html} className="mt-12" />
      </div>
    </article>
  )
}

import { PostEditor } from "@/components/cms/post-editor"
import type { PostForm } from "@/lib/cms"
import { getAllPosts, getPostTags } from "@/lib/posts"

export default async function NewPostPage() {
  const tags = getPostTags(await getAllPosts("es", { includeDrafts: true }))
  const initial: PostForm = {
    slug: "",
    title: "",
    excerpt: "",
    tag: tags[0] ?? "",
    date: new Date().toISOString().slice(0, 10),
    template: "article",
    source: "es",
    draft: true,
    cover: "",
    client: "",
    role: "",
    stack: "",
    body: "",
    retranslate: false,
  }
  return <PostEditor mode="new" initial={initial} tags={tags} translation="missing" />
}

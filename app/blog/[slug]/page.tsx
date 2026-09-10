import type { Metadata } from "next"
import { cookies } from "next/headers"
import { notFound } from "next/navigation"
import { PageBackdrop } from "@/components/site/page-backdrop"
import { postTemplates } from "@/components/blog/templates"
import { LANG_COOKIE, parseLang } from "@/lib/lang"
import { getPost, getPostSlugs, shouldIncludeDrafts } from "@/lib/posts"

type Params = Promise<{ slug: string }>

export async function generateStaticParams() {
  return (await getPostSlugs()).map((slug) => ({ slug }))
}

async function loadPost(slug: string) {
  const lang = parseLang((await cookies()).get(LANG_COOKIE)?.value)
  const post = await getPost(slug, lang, { includeDrafts: shouldIncludeDrafts() })
  return { lang, post }
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const { post } = await loadPost(slug)
  if (!post) return {}
  return {
    title: post.meta.title,
    description: post.meta.excerpt,
    openGraph: {
      type: "article",
      title: post.meta.title,
      description: post.meta.excerpt,
      publishedTime: post.meta.date,
      images: post.meta.cover ? [post.meta.cover] : undefined,
    },
  }
}

export default async function PostPage({ params }: { params: Params }) {
  const { slug } = await params
  const { lang, post } = await loadPost(slug)
  if (!post) notFound()
  const Template = postTemplates[post.meta.template]
  return (
    <>
      <PageBackdrop glow="page" />
      <Template post={post} lang={lang} />
    </>
  )
}

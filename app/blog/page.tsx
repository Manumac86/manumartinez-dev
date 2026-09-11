import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { blogFlag } from "@/flags"
import { PageBackdrop } from "@/components/site/page-backdrop"
import { BlogGrid } from "@/components/blog/blog-grid"
import { NewsletterBand } from "@/components/blog/newsletter-band"
import { getAllPostsByLang } from "@/lib/posts"

export const metadata: Metadata = {
  title: "Writing",
  description: "Long-form notes on building AI-native products, leading engineering teams and accelerating startups.",
}

export default async function BlogPage() {
  if (!(await blogFlag())) notFound()
  const posts = await getAllPostsByLang()
  return (
    <>
      <PageBackdrop glow="page" />
      <main className="container-site relative pt-[clamp(64px,10vh,120px)] pb-24">
        <BlogGrid posts={posts} />
        <NewsletterBand />
      </main>
    </>
  )
}

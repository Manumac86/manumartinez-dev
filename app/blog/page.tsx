import type { Metadata } from "next"
import { PageBackdrop } from "@/components/site/page-backdrop"
import { BlogGrid } from "@/components/blog/blog-grid"
import { NewsletterBand } from "@/components/blog/newsletter-band"

export const metadata: Metadata = {
  title: "Writing",
  description: "Long-form notes on building AI-native products, leading engineering teams and accelerating startups.",
}

export default function BlogPage() {
  return (
    <>
      <PageBackdrop glow="page" />
      <main className="container-site relative pt-[clamp(64px,10vh,120px)] pb-24">
        <BlogGrid />
        <NewsletterBand />
      </main>
    </>
  )
}

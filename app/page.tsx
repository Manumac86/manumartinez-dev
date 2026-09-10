import { PageBackdrop } from "@/components/site/page-backdrop"
import { Hero } from "@/components/home/hero"
import { Bento } from "@/components/home/bento"
import { ProjectsList } from "@/components/home/projects-list"
import { ExperiencePreview } from "@/components/home/experience-preview"
import { BlogPreview } from "@/components/home/blog-preview"
import { TalkSection } from "@/components/home/talk-section"
import { getAllPostsByLang } from "@/lib/posts"

export default async function HomePage() {
  const posts = await getAllPostsByLang()
  return (
    <>
      <PageBackdrop glow="home" />
      <main id="top" className="relative">
        <Hero />
        <Bento />
        <ProjectsList />
        <ExperiencePreview />
        <BlogPreview posts={posts} />
        <TalkSection />
      </main>
    </>
  )
}

import { PageBackdrop } from "@/components/site/page-backdrop"
import { Hero } from "@/components/home/hero"
import { Bento } from "@/components/home/bento"
import { ProjectsList } from "@/components/home/projects-list"
import { ExperiencePreview } from "@/components/home/experience-preview"
import { BlogPreview } from "@/components/home/blog-preview"
import { TalkSection } from "@/components/home/talk-section"
import { getAllPostsByLang } from "@/lib/posts"
import { getSiteFlags } from "@/flags"

export default async function HomePage() {
  const [posts, flags] = await Promise.all([getAllPostsByLang(), getSiteFlags()])
  return (
    <>
      <PageBackdrop glow="home" />
      <main id="top" className="relative">
        <Hero projectsEnabled={flags.projects} />
        <Bento />
        {flags.projects && <ProjectsList />}
        <ExperiencePreview />
        {flags.blog && <BlogPreview posts={posts} />}
        <TalkSection />
      </main>
    </>
  )
}

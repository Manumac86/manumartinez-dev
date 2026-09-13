import type { Metadata } from "next"
import { cookies } from "next/headers"
import { notFound } from "next/navigation"
import { PageBackdrop } from "@/components/site/page-backdrop"
import { ProjectPage } from "@/components/projects/project-page"
import { projectsFlag } from "@/flags"
import { LANG_COOKIE, parseLang } from "@/lib/lang"
import { getAllProjects, getProject } from "@/lib/projects"
import { shouldIncludeDrafts } from "@/lib/posts"

type Params = Promise<{ slug: string }>

export async function generateStaticParams() {
  return (await getAllProjects("es", { includeDrafts: true })).filter((p) => p.hasPage).map((p) => ({ slug: p.slug }))
}

async function load(slug: string) {
  if (!(await projectsFlag())) return { lang: "en" as const, project: null }
  const lang = parseLang((await cookies()).get(LANG_COOKIE)?.value)
  const project = await getProject(slug, lang, { includeDrafts: shouldIncludeDrafts() })
  return { lang, project }
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const { project } = await load(slug)
  if (!project) return {}
  return {
    title: project.meta.name,
    description: project.meta.excerpt,
    openGraph: { type: "website", title: project.meta.name, description: project.meta.excerpt, images: project.meta.cover ? [project.meta.cover] : undefined },
  }
}

export default async function ProjectDetailPage({ params }: { params: Params }) {
  const { slug } = await params
  const { lang, project } = await load(slug)
  if (!project) notFound()
  return (
    <>
      <PageBackdrop glow="blue" />
      <ProjectPage project={project} lang={lang} />
    </>
  )
}

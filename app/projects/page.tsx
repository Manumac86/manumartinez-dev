import type { Metadata } from "next"
import { PageBackdrop } from "@/components/site/page-backdrop"
import { PageHeader } from "@/components/site/page-header"
import { ProjectsGrid } from "@/components/projects/projects-grid"
import { CtaBand } from "@/components/site/cta-band"

export const metadata: Metadata = {
  title: "Projects",
  description: "Products built at Collybrix and beyond — each one a real bet on a real problem.",
}

export default function ProjectsPage() {
  return (
    <>
      <PageBackdrop glow="blue" />
      <main className="container-site relative pt-[clamp(64px,10vh,120px)] pb-24">
        <PageHeader label="projectsLabel" title="projPageTitle" sub="projPageSub" labelClass="text-blue" />
        <ProjectsGrid />
        <CtaBand className="mt-24" />
      </main>
    </>
  )
}

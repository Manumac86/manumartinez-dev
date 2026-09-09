import type { Metadata } from "next"
import { PageBackdrop } from "@/components/site/page-backdrop"
import { PageHeader } from "@/components/site/page-header"
import { Chip } from "@/components/site/primitives"
import { Timeline } from "@/components/experience/timeline"
import { EducationRow } from "@/components/experience/education-row"
import { RolesChip } from "@/components/experience/roles-chip"
import { experienceFull } from "@/content"

export const metadata: Metadata = {
  title: "Experience",
  description: "Fifteen years, three continents, one obsession: shipping.",
}

export default function ExperiencePage() {
  return (
    <>
      <PageBackdrop glow="page" />
      <main className="container-site relative pt-[clamp(64px,10vh,120px)] pb-24">
        <PageHeader label="expLabel" title="expTitle" labelClass="text-green">
          <div className="mt-2 flex flex-wrap gap-2">
            <RolesChip count={experienceFull.length} />
            <Chip>2010 — 2026</Chip>
            <Chip>Argentina · US · Spain</Chip>
          </div>
        </PageHeader>
        <Timeline />
        <EducationRow />
      </main>
    </>
  )
}

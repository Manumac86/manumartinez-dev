import type { Metadata } from "next"
import { PageBackdrop } from "@/components/site/page-backdrop"
import { MeHero } from "@/components/me/me-hero"
import { Story } from "@/components/me/story"
import { Facts } from "@/components/me/facts"
import { CtaBand } from "@/components/site/cta-band"

export const metadata: Metadata = {
  title: "Me",
  description: "From frontend to VP of Engineering to technical co-founder.",
}

export default function MePage() {
  return (
    <>
      <PageBackdrop glow="page" />
      <main className="container-site relative pt-[clamp(64px,10vh,120px)] pb-24">
        <MeHero />
        <Story />
        <Facts />
        <CtaBand className="mt-24" />
      </main>
    </>
  )
}

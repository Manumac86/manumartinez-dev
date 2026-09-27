import type { Metadata } from "next"
import Link from "next/link"
import { cookies } from "next/headers"
import { PageBackdrop } from "@/components/site/page-backdrop"
import { MonoLabel } from "@/components/site/primitives"
import { TypeformEmbed } from "@/components/research/typeform-embed"
import { copy } from "@/content"
import { LANG_COOKIE, parseLang } from "@/lib/lang"

export const metadata: Metadata = {
  title: "Research",
  description: "A short study on how software teams hand off work between product, tech and design.",
}

export default async function ResearchFormPage() {
  const t = copy[parseLang((await cookies()).get(LANG_COOKIE)?.value)]
  return (
    <>
      <PageBackdrop glow="page" />
      <main className="container-site relative pt-[clamp(64px,10vh,120px)] pb-24">
        <div className="mx-auto flex max-w-[880px] flex-col gap-10">
          <header className="flex flex-col gap-5">
            <MonoLabel className="text-violet">{t.researchLabel}</MonoLabel>
            <h1 className="font-display text-[clamp(32px,4.4vw,56px)] leading-[1.02] font-medium tracking-[-0.04em] text-balance">
              {t.researchTitle}
            </h1>
            <p className="max-w-[720px] text-lg text-muted-foreground text-pretty">{t.researchSub}</p>
          </header>
          <TypeformEmbed
            id="01M3HPDMVRBH0PQBMRW172QWHY"
            className="h-[min(720px,80vh)] min-h-[520px] overflow-hidden rounded-xl border border-border bg-card"
          />
          <Link href="/estudio/privacidad" className="font-mono text-xs text-muted-2 transition-colors hover:text-foreground">
            {t.researchPrivacy}
          </Link>
        </div>
      </main>
    </>
  )
}

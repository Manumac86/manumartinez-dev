"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLang } from "@/components/site/lang-provider"
import { RisingWords } from "@/components/home/rising-words"
import { links } from "@/content"

export function Hero() {
  const { lang, t } = useLang()
  return (
    <section className="container-site flex flex-col items-center gap-7 pt-[clamp(80px,14vh,160px)] pb-12 text-center">
      <div className="mono-label inline-flex items-start gap-2.5 tracking-[0.06em] text-green">
        <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-green shadow-[0_0_12px_var(--green)]" />
        <span>{t.status}</span>
      </div>
      <h1 className="max-w-[16ch] font-display text-[clamp(44px,7.2vw,104px)] leading-[0.95] font-medium tracking-[-0.045em] text-balance">
        <RisingWords text={t.heroTitle} replayKey={lang} />
      </h1>
      <p className="max-w-[640px] text-lg text-muted-foreground text-pretty">{t.heroSub}</p>
      <div className="flex flex-wrap justify-center gap-3">
        <Button asChild variant="hero" size="cta">
          <a href={links.cal} target="_blank" rel="noopener noreferrer">
            {t.ctaPrimary}
            <ArrowRight />
          </a>
        </Button>
        <Button asChild variant="heroOutline" size="cta">
          <Link href="/projects">{t.ctaSecondary}</Link>
        </Button>
      </div>
    </section>
  )
}

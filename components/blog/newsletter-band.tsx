"use client"

import { useLang } from "@/components/site/lang-provider"
import { MonoLabel } from "@/components/site/primitives"
import { NewsletterForm } from "@/components/site/newsletter-form"

export function NewsletterBand() {
  const { t } = useLang()
  return (
    <div className="mt-24 grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] items-center gap-8 rounded-band border border-border-violet bg-gradient-band p-[clamp(28px,5vw,56px)]">
      <div className="flex flex-col gap-2.5">
        <MonoLabel className="text-green">{t.newsLabel}</MonoLabel>
        <h2 className="font-display text-[clamp(30px,4vw,48px)] leading-[0.98] font-medium tracking-[-0.04em]">
          {t.newsTitle}
        </h2>
        <p className="text-fg-2">{t.newsBody}</p>
      </div>
      <NewsletterForm variant="band" />
    </div>
  )
}

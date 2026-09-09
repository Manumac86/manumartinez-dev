"use client"

import { BlurHighlight } from "@/components/react-bits/blur-highlight"
import { useLang } from "@/components/site/lang-provider"
import { MonoLabel } from "@/components/site/primitives"
import { bio } from "@/content"

export function Story() {
  const { lang, t } = useLang()
  return (
    <section className="mt-24 grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] items-start gap-12">
      <div className="flex flex-col gap-3 md:sticky md:top-24">
        <MonoLabel className="text-violet">{t.storyLabel}</MonoLabel>
        <h2 className="font-display text-[clamp(32px,4.4vw,56px)] leading-[0.98] font-medium tracking-[-0.04em] text-balance">
          {t.storyTitle}
        </h2>
      </div>
      <div className="flex flex-col gap-[22px] text-[17px] text-fg-story text-pretty">
        {bio[lang].map((p) => (
          <p key={p.slice(0, 40)} data-testid="story-p">
            <BlurHighlight blurAmount={6} inactiveOpacity={0.35} blurDuration={0.7} viewportOptions={{ once: true, amount: 0.3 }}>
              {p}
            </BlurHighlight>
          </p>
        ))}
      </div>
    </section>
  )
}

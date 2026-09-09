"use client"

import Image from "next/image"
import { useLang } from "@/components/site/lang-provider"
import { MonoLabel } from "@/components/site/primitives"
import { Button } from "@/components/ui/button"
import { links } from "@/content"

export function MeHero() {
  const { t } = useLang()
  const chips = [
    { href: `mailto:${links.email}`, label: links.email },
    { href: links.cal, label: "cal.com", external: true },
    { href: links.linkedin, label: "LinkedIn", external: true },
  ]
  return (
    <div className="grid items-stretch gap-3.5 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
      <div className="flex min-w-0 flex-col gap-5 rounded-band border border-border-violet bg-gradient-me p-[clamp(28px,4vw,48px)]">
        <MonoLabel className="text-green">{t.meLabel}</MonoLabel>
        <h1 className="font-display text-[clamp(40px,6vw,84px)] leading-[0.95] font-medium tracking-[-0.045em]">
          Emmanuel Martinez
        </h1>
        <p className="text-lg text-fg-2">{t.meRole}</p>
        <div className="mt-2 rounded-xl border border-dashed border-[oklch(0.55_0.08_300)] bg-stripes-dark px-6 py-5 font-mono text-[13px] leading-[1.7] text-muted-foreground">
          {t.bioPlaceholder}
        </div>
        <div className="mt-auto flex flex-wrap gap-2">
          {chips.map((c) => (
            <Button key={c.label} asChild variant="chipLink" size="chip">
              <a href={c.href} target={c.external ? "_blank" : undefined} rel={c.external ? "noopener noreferrer" : undefined}>
                {c.label}
              </a>
            </Button>
          ))}
        </div>
      </div>
      <div className="relative min-h-[420px] min-w-0 overflow-hidden rounded-band border border-border-violet-soft">
        <Image
          src="/images/portrait.jpg"
          alt="Emmanuel Martinez"
          fill
          priority
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover object-[center_20%]"
        />
        <div aria-hidden className="photo-overlay-me absolute inset-0" />
        <div aria-hidden className="photo-tint absolute inset-0" />
        <div className="absolute bottom-6 left-6 font-mono text-xs text-green">Madrid, ES · UTC+1</div>
      </div>
    </div>
  )
}

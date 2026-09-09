"use client"

import { useLang } from "@/components/site/lang-provider"

const facts = [
  { n: "15+", color: "text-blue" },
  { n: "2", color: "text-violet" },
  { n: "18", color: "text-green" },
  { n: "500+", color: "text-blue" },
]

export function Facts() {
  const { t } = useLang()
  return (
    <section className="mt-24 grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-3.5">
      {facts.map((f, i) => (
        <div key={f.n} className="rounded-card border border-border bg-card px-7 py-6">
          <div className={`font-display text-[44px] leading-none font-medium tracking-[-0.04em] ${f.color}`}>{f.n}</div>
          <div className="mt-2 text-sm text-muted-foreground">{t.facts[i]}</div>
        </div>
      ))}
    </section>
  )
}

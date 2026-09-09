"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { useLang } from "@/components/site/lang-provider"
import { Chip, MonoLabel } from "@/components/site/primitives"
import { links, stack } from "@/content"

const card = "min-w-0 rounded-card border border-border bg-card"

export function Bento() {
  const { t } = useLang()
  const stats = [
    { n: "15+", color: "text-blue", label: t.stats[0] },
    { n: "2", color: "text-violet", label: t.stats[1] },
    { n: "100K", color: "text-green", label: t.stats[2] },
  ]
  return (
    <section id="collybrix" className="container-site grid gap-3.5 pt-12">
      <div className="grid gap-3.5 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className="relative flex min-w-0 flex-col gap-[18px] overflow-hidden rounded-card border border-border-violet bg-gradient-colly p-8">
          <div
            aria-hidden
            className="absolute -right-[60px] -bottom-[60px] size-[260px] animate-spin-slow rounded-full border border-dashed border-violet-deep/50 motion-reduce:animate-none"
          />
          <MonoLabel className="text-violet-soft">{t.collyLabel}</MonoLabel>
          <h2 className="font-display text-[clamp(28px,3.4vw,42px)] leading-[1.02] font-medium tracking-[-0.035em] text-balance">
            {t.collyTitle}
          </h2>
          <p className="max-w-[560px] text-fg-2 text-pretty">{t.collyBody}</p>
          <a
            href={links.collybrix}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto inline-flex items-center gap-1.5 text-sm text-green"
          >
            collybrix.com
            <ArrowUpRight className="size-3.5" />
          </a>
        </div>
        <Link
          href="/me"
          className="group relative flex min-h-[340px] min-w-0 flex-col justify-end overflow-hidden rounded-card border border-border-violet-soft transition-colors duration-250 hover:border-green"
        >
          <Image
            src="/images/portrait.jpg"
            alt="Emmanuel Martinez"
            fill
            priority
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover object-[center_15%]"
          />
          <div aria-hidden className="photo-overlay absolute inset-0" />
          <div aria-hidden className="photo-tint absolute inset-0" />
          <div className="relative p-6">
            <div className="font-display text-2xl leading-[1.05] font-medium tracking-[-0.02em]">Emmanuel Martinez</div>
            <div className="mt-1 text-sm text-fg-2">CEO &amp; Co-Founder @ Collybrix</div>
            <div className="mt-2.5 font-mono text-xs text-green">Madrid, ES · UTC+1 → {t.nav.me}</div>
          </div>
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-3">
        {stats.map((s) => (
          <div key={s.n} className={`${card} px-7 py-6`}>
            <div className={`font-display text-[56px] leading-none font-medium tracking-[-0.04em] ${s.color}`}>{s.n}</div>
            <div className="mt-2 text-sm text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>
      <div className={`${card} flex flex-wrap items-center gap-2 px-7 py-5`}>
        <MonoLabel className="mr-2 text-muted-2">{t.stackLabel}</MonoLabel>
        {stack.map((s) => (
          <Chip key={s}>{s}</Chip>
        ))}
      </div>
    </section>
  )
}

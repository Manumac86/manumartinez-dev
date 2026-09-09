"use client"

import { useLang } from "@/components/site/lang-provider"
import { MonoLabel } from "@/components/site/primitives"
import type { Copy } from "@/content"
import { cn } from "@/lib/utils"

type StringKey = { [K in keyof Copy]: Copy[K] extends string ? K : never }[keyof Copy]

export function PageHeader({
  label,
  title,
  sub,
  labelClass,
  className,
  children,
}: {
  label: StringKey
  title: StringKey
  sub?: StringKey
  labelClass?: string
  className?: string
  children?: React.ReactNode
}) {
  const { t } = useLang()
  return (
    <div className={cn("mb-14 flex max-w-[820px] flex-col gap-4", className)}>
      <MonoLabel className={labelClass}>{t[label]}</MonoLabel>
      <h1 className="font-display text-[clamp(44px,7vw,96px)] leading-[0.95] font-medium tracking-[-0.045em] text-balance">
        {t[title]}
      </h1>
      {sub && <p className="max-w-[600px] text-lg text-muted-foreground text-pretty">{t[sub]}</p>}
      {children}
    </div>
  )
}

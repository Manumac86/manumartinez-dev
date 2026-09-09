"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useLang } from "@/components/site/lang-provider"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function CtaBand({ className }: { className?: string }) {
  const { t } = useLang()
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-between gap-6 rounded-band border border-border-violet bg-gradient-band p-[clamp(28px,5vw,56px)]",
        className,
      )}
    >
      <h2 className="max-w-[600px] font-display text-[clamp(30px,4vw,52px)] leading-[0.98] font-medium tracking-[-0.04em] text-balance">
        {t.talkTitle}
      </h2>
      <Button asChild variant="green" size="cta">
        <Link href="/#talk">
          {t.nav.talk}
          <ArrowRight />
        </Link>
      </Button>
    </div>
  )
}

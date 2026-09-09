"use client"

import { Accordion as AccordionPrimitive } from "radix-ui"
import { useLang } from "@/components/site/lang-provider"
import { Chip } from "@/components/site/primitives"
import { experienceFull } from "@/content"
import { cn } from "@/lib/utils"

export function Timeline({ expandAll = false }: { expandAll?: boolean }) {
  const { t } = useLang()
  const rootProps = expandAll
    ? ({ type: "multiple", defaultValue: experienceFull.map((_, i) => String(i)) } as const)
    : ({ type: "single", collapsible: true, defaultValue: "0" } as const)
  return (
    <div className="relative min-w-0">
      <div aria-hidden className="timeline-line absolute top-6 bottom-6 left-[19px] w-px" />
      <AccordionPrimitive.Root {...rootProps} className="flex flex-col gap-2.5">
        {experienceFull.map((e, i) => (
          <AccordionPrimitive.Item key={`${e.company}-${e.period}`} value={String(i)} className="group relative pl-[52px]">
            <span
              aria-hidden
              className={cn(
                "absolute top-[26px] left-[13px] size-[13px] rounded-full transition-colors",
                e.current
                  ? "bg-green shadow-[0_0_0_4px_oklch(0.76_0.10_165/0.25),0_0_16px_oklch(0.76_0.10_165/0.6)]"
                  : "bg-border-strong shadow-[0_0_0_4px_var(--background)] group-data-[state=open]:bg-violet",
              )}
            />
            <div className="rounded-2xl border border-border-soft bg-card-2 transition-all duration-250 hover:border-violet-hover group-data-[state=open]:border-border-violet group-data-[state=open]:bg-card-3">
              <AccordionPrimitive.Header>
                <AccordionPrimitive.Trigger className="flex w-full flex-wrap items-start justify-between gap-4 rounded-2xl px-[22px] py-[18px] text-left outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 group-data-[state=open]:pb-0">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="font-display text-[22px] leading-[1.1] font-medium tracking-[-0.025em]">{e.role}</span>
                      {e.current && (
                        <span className="rounded-full bg-green/15 px-2 py-[3px] font-mono text-[11px] text-green">
                          {t.current}
                        </span>
                      )}
                    </div>
                    <div className="mt-1 text-sm text-violet">{e.company}</div>
                  </div>
                  <div className="text-right font-mono text-xs leading-[1.7] text-muted-2">
                    <div>{e.period}</div>
                    <div>{e.location}</div>
                  </div>
                </AccordionPrimitive.Trigger>
              </AccordionPrimitive.Header>
              <AccordionPrimitive.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                <div className="px-[22px] pt-4 pb-[18px]">
                  <ul className="flex flex-col gap-2 text-[15px] text-fg-2">
                    {e.description.map((d) => (
                      <li key={d} className="flex gap-2.5">
                        <span className="shrink-0 text-green">→</span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                  {e.skills.length > 0 && (
                    <div className="mt-3.5 flex flex-wrap gap-1.5">
                      {e.skills.map((s) => (
                        <Chip key={s} variant="mono">{s}</Chip>
                      ))}
                    </div>
                  )}
                </div>
              </AccordionPrimitive.Content>
            </div>
          </AccordionPrimitive.Item>
        ))}
      </AccordionPrimitive.Root>
    </div>
  )
}

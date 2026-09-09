"use client"

import { useLang } from "@/components/site/lang-provider"
import { Chip, MonoLabel } from "@/components/site/primitives"
import { certifications, education, languages } from "@/content"

export function EducationRow() {
  const { t } = useLang()
  return (
    <>
      <div className="mt-10 grid min-w-0 gap-3.5 sm:grid-cols-3">
        <MonoLabel className="col-span-full px-1 text-muted-2">{t.education}</MonoLabel>
        {education.map((ed) => (
          <div
            key={ed.school}
            className="flex min-h-[180px] flex-col justify-between gap-5 rounded-card border border-border bg-gradient-edu p-7"
          >
            <div className="font-mono text-xs text-green">{ed.years}</div>
            <div>
              <div className="font-display text-[22px] leading-[1.1] font-medium tracking-[-0.025em]">{ed.school}</div>
              <div className="mt-1.5 text-sm text-muted-foreground">{ed.degree}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3.5 grid min-w-0 gap-3.5 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className="rounded-card border border-border bg-card px-6 py-[22px]">
          <MonoLabel className="mb-3 block text-muted-2">{t.certifications}</MonoLabel>
          <div className="flex flex-wrap gap-1.5">
            {certifications.map((c) => (
              <Chip key={c} variant="cert">{c}</Chip>
            ))}
          </div>
        </div>
        <div className="rounded-card border border-border bg-card px-6 py-[22px]">
          <MonoLabel className="mb-3 block text-muted-2">{t.languages}</MonoLabel>
          <div className="flex flex-col gap-1.5 text-sm">
            {languages.map((l) => (
              <div key={l.name} className="flex justify-between">
                <span>{l.name}</span>
                <span className="text-muted-foreground">{t.languageLevels[l.level]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

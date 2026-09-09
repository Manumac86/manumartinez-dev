"use client"

import { useLang } from "@/components/site/lang-provider"
import { Button } from "@/components/ui/button"
import { MonoLabel, SectionTitle } from "@/components/site/primitives"
import { NewsletterForm } from "@/components/site/newsletter-form"
import { ContactForm } from "@/components/site/contact-form"
import { links } from "@/content"

export function TalkSection() {
  const { t } = useLang()
  const chips = [
    { href: `mailto:${links.email}`, label: links.email },
    { href: links.cal, label: "cal.com", external: true },
    { href: links.linkedin, label: "LinkedIn", external: true },
  ]
  return (
    <section id="talk" className="container-site scroll-mt-24 pt-32 pb-24">
      <div className="relative grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-12 overflow-hidden rounded-band border border-border-violet bg-gradient-band p-[clamp(28px,5vw,64px)]">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-[200px] left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-violet-deep/35 blur-[100px]"
        />
        <div className="relative flex flex-col gap-5">
          <MonoLabel className="text-green">{t.talkLabel}</MonoLabel>
          <SectionTitle className="leading-[0.98]">{t.talkTitle}</SectionTitle>
          <p className="text-[17px] text-fg-2">{t.talkBody}</p>
          <div className="mt-1 flex flex-wrap gap-2">
            {chips.map((c) => (
              <Button key={c.label} asChild variant="chipLink" size="chip">
                <a
                  href={c.href}
                  target={c.external ? "_blank" : undefined}
                  rel={c.external ? "noopener noreferrer" : undefined}
                >
                  {c.label}
                </a>
              </Button>
            ))}
          </div>
          <div className="mt-6 flex flex-col gap-2.5 border-t border-border-violet-soft pt-6">
            <MonoLabel className="text-violet-soft">
              {t.newsLabel} — {t.newsTitle}
            </MonoLabel>
            <NewsletterForm variant="inline" />
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  )
}

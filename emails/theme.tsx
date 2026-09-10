import type * as React from "react"
import { Body, Container, Head, Hr, Html, Link, Preview, Section, Tailwind, Text, pixelBasedPreset } from "react-email"
import type { Lang } from "@/content/types"

/** Brand tokens flattened to hex (email clients don't understand OKLCH). */
export const emailColors = {
  page: "#0b0a14",
  card: "#151223",
  border: "#2a2640",
  text: "#f1f0f6",
  muted: "#b1adc4",
  faint: "#7f7a93",
  green: "#7fd9b8",
  violet: "#b78ce8",
}

export const SITE_URL = "https://manumartinez.dev"

export function EmailShell({ lang, preview, children, footer }: { lang: Lang; preview: string; children: React.ReactNode; footer?: React.ReactNode }) {
  return (
    <Html lang={lang} dir="ltr">
      <Tailwind config={{ presets: [pixelBasedPreset], theme: { extend: { colors: emailColors } } }}>
        <Head />
        <Body className="bg-page m-0 py-10 font-sans" style={{ fontFamily: "'Geist', -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" }}>
          <Preview>{preview}</Preview>
          <Container className="mx-auto max-w-[560px] px-5">
            <Section className="mb-4">
              <Link href={SITE_URL} className="text-text text-[18px] font-bold tracking-[1px] no-underline">
                MANUMARTINEZ<span className="text-green">.</span>
              </Link>
            </Section>
            <Section className="bg-card border-border rounded-[20px] border border-solid px-8 py-7">{children}</Section>
            <Section className="mt-6">
              <Text className="text-faint m-0 text-[12px] leading-[18px]">
                Emmanuel Martinez · CEO &amp; Co-Founder @ Collybrix · Madrid, ES
              </Text>
              {footer}
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

export function EmailDivider() {
  return <Hr className="border-border my-5 border-solid" />
}

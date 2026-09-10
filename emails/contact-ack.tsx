import { Heading, Link, Text } from "react-email"
import type { Lang } from "@/content/types"
import { EmailDivider, EmailShell } from "./theme"

export interface ContactAckProps {
  lang: Lang
  name: string
  message: string
}

const copy = {
  en: {
    preview: "Got your message. I'll get back to you within 48 hours.",
    title: (name: string) => `Thanks, ${name}.`,
    body: "I received your message. I'll get back to you within the next 48 hours.",
    quote: "What you sent",
    tail: "Prefer to talk sooner? Book a slot at ",
  },
  es: {
    preview: "Recibí tu mensaje. Me pondré en contacto contigo antes de las siguientes 48 horas.",
    title: (name: string) => `Gracias, ${name}.`,
    body: "Recibí tu mensaje. Me pondré en contacto contigo antes de las siguientes 48 horas.",
    quote: "Lo que enviaste",
    tail: "¿Prefieres hablar antes? Reserva un hueco en ",
  },
} as const

export default function ContactAck({ lang, name, message }: ContactAckProps) {
  const t = copy[lang]
  return (
    <EmailShell lang={lang} preview={t.preview}>
      <Heading as="h1" className="text-text m-0 text-[28px] leading-[32px] font-medium tracking-[-0.5px]">
        {t.title(name)}
      </Heading>
      <Text className="text-muted mt-4 mb-0 text-[16px] leading-[26px]">{t.body}</Text>
      <EmailDivider />
      <Text className="text-faint m-0 text-[11px] tracking-[1px] uppercase">{t.quote}</Text>
      <Text className="text-muted border-violet mt-2 mb-0 border-0 border-l-2 border-solid pl-4 text-[15px] leading-[24px] whitespace-pre-wrap">{message}</Text>
      <EmailDivider />
      <Text className="text-muted m-0 text-[14px] leading-[22px]">
        {t.tail}
        <Link href="https://cal.com/emmanuel-martinez/30min" className="text-green underline">
          cal.com/emmanuel-martinez/30min
        </Link>
        .
      </Text>
    </EmailShell>
  )
}

ContactAck.PreviewProps = { lang: "es", name: "Ana", message: "Estoy construyendo una fintech y necesito un co-founder técnico." } satisfies ContactAckProps

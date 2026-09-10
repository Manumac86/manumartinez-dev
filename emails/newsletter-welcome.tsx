import { Button, Heading, Link, Text } from "react-email"
import type { Lang } from "@/content/types"
import { EmailDivider, EmailShell, SITE_URL } from "./theme"

export interface NewsletterWelcomeProps {
  lang: Lang
  unsubscribeUrl: string
}

const copy = {
  en: {
    preview: "You're in. One useful idea every two weeks.",
    title: "You're in.",
    body: "Thanks for subscribing. Every two weeks I send one useful idea on AI engineering, technical strategy for founders and what we learn at Collybrix. No noise.",
    cta: "Read the latest posts",
    unsub: "Not for you? ",
    unsubLink: "Unsubscribe in one click",
    unsubTail: " — no questions asked.",
  },
  es: {
    preview: "Listo. Una idea útil cada dos semanas.",
    title: "Listo, estás dentro.",
    body: "Gracias por suscribirte. Cada dos semanas envío una idea útil sobre ingeniería con IA, estrategia técnica para founders y lo que aprendemos en Collybrix. Sin ruido.",
    cta: "Leer los últimos posts",
    unsub: "¿No es para vos? ",
    unsubLink: "Date de baja con un clic",
    unsubTail: ", sin preguntas.",
  },
} as const

export default function NewsletterWelcome({ lang, unsubscribeUrl }: NewsletterWelcomeProps) {
  const t = copy[lang]
  return (
    <EmailShell
      lang={lang}
      preview={t.preview}
      footer={
        <Text className="text-faint m-0 mt-1 text-[12px] leading-[18px]">
          {t.unsub}
          <Link href={unsubscribeUrl} className="text-faint underline">
            {t.unsubLink}
          </Link>
          {t.unsubTail}
        </Text>
      }
    >
      <Heading as="h1" className="text-text m-0 text-[28px] leading-[32px] font-medium tracking-[-0.5px]">
        {t.title}
      </Heading>
      <Text className="text-muted mt-4 mb-0 text-[16px] leading-[26px]">{t.body}</Text>
      <EmailDivider />
      <Button href={`${SITE_URL}/blog`} className="bg-green box-border rounded-[12px] px-5 py-3 text-[14px] font-medium text-[#0b0a14] no-underline">
        {t.cta}
      </Button>
    </EmailShell>
  )
}

NewsletterWelcome.PreviewProps = { lang: "es", unsubscribeUrl: `${SITE_URL}/api/newsletter/unsubscribe?email=you%40example.com&token=abc` } satisfies NewsletterWelcomeProps

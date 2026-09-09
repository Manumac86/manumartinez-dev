import type { Metadata } from "next"
import { cookies } from "next/headers"
import { Analytics } from "@vercel/analytics/next"
import { LangProvider, LANG_COOKIE, parseLang } from "@/components/site/lang-provider"
import { fontClassNames } from "./fonts"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL("https://manumartinez.dev"),
  title: {
    default: "Emmanuel Martinez — AI-native products with founders who move fast",
    template: "%s · Emmanuel Martinez",
  },
  description:
    "CEO & Co-Founder @ Collybrix. 15+ years shipping software — now acting as temporary technical co-founder for startups going from idea to 100K users.",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-dark-32x32.png" },
    ],
    apple: "/apple-icon.png",
  },
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const lang = parseLang((await cookies()).get(LANG_COOKIE)?.value)
  return (
    <html lang={lang} className={fontClassNames}>
      <body>
        <LangProvider initialLang={lang}>
          <div className="relative flex min-h-screen flex-col overflow-x-clip">{children}</div>
        </LangProvider>
        <Analytics />
      </body>
    </html>
  )
}

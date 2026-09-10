import type { Metadata } from "next"
import { cookies } from "next/headers"
import { Analytics } from "@vercel/analytics/next"
import { LangProvider } from "@/components/site/lang-provider"
import { LANG_COOKIE, parseLang } from "@/lib/lang"
import { getAllPostsByLang } from "@/lib/posts"
import { SiteHeader } from "@/components/site/site-header"
import { SiteFooter } from "@/components/site/site-footer"
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
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const lang = parseLang((await cookies()).get(LANG_COOKIE)?.value)
  const latestPosts = await getAllPostsByLang()
  return (
    <html lang={lang} className={fontClassNames}>
      <body>
        <LangProvider initialLang={lang}>
          <div className="relative flex min-h-screen flex-col overflow-x-clip">
            <SiteHeader />
            {children}
            <SiteFooter latestPosts={latestPosts} />
          </div>
        </LangProvider>
        <Analytics />
      </body>
    </html>
  )
}

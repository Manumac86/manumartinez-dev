import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={fontClassNames}>
      <body>
        <div className="relative flex min-h-screen flex-col overflow-x-clip">{children}</div>
        <Analytics />
      </body>
    </html>
  )
}

import { Archivo_Black, Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google"

export const fontDisplay = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
  variable: "--font-next-display",
})
export const fontSans = Geist({ subsets: ["latin"], display: "swap", variable: "--font-next-sans" })
export const fontMono = Geist_Mono({ subsets: ["latin"], display: "swap", variable: "--font-next-mono" })
export const fontWordmark = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-next-wordmark",
})

export const fontClassNames = [fontDisplay.variable, fontSans.variable, fontMono.variable, fontWordmark.variable].join(" ")

"use client"

import * as React from "react"
import { copy, type Copy, type Lang, LANGS } from "@/content"

export const LANG_COOKIE = "lang"

export function parseLang(value?: string | null): Lang {
  return (LANGS as readonly string[]).includes(value ?? "") ? (value as Lang) : "en"
}

interface LangContextValue {
  lang: Lang
  t: Copy
  setLang: (lang: Lang) => void
  toggle: () => void
}

const LangContext = React.createContext<LangContextValue | null>(null)

export function LangProvider({ initialLang, children }: { initialLang: Lang; children: React.ReactNode }) {
  const [lang, setLangState] = React.useState<Lang>(initialLang)

  const setLang = React.useCallback((next: Lang) => {
    setLangState(next)
    document.cookie = `${LANG_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`
    document.documentElement.lang = next
  }, [])

  const toggle = React.useCallback(() => setLang(lang === "en" ? "es" : "en"), [lang, setLang])

  const value = React.useMemo(() => ({ lang, t: copy[lang], setLang, toggle }), [lang, setLang, toggle])

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export function useLang(): LangContextValue {
  const ctx = React.useContext(LangContext)
  if (!ctx) throw new Error("useLang must be used inside <LangProvider>")
  return ctx
}

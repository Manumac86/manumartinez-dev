"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { copy, type Copy, type Lang } from "@/content"
import { LANG_COOKIE } from "@/lib/lang"

interface LangContextValue {
  lang: Lang
  t: Copy
  setLang: (lang: Lang) => void
  toggle: () => void
}

const LangContext = React.createContext<LangContextValue | null>(null)

export function LangProvider({ initialLang, children }: { initialLang: Lang; children: React.ReactNode }) {
  const [lang, setLangState] = React.useState<Lang>(initialLang)
  const router = useRouter()

  const setLang = React.useCallback(
    (next: Lang) => {
      setLangState(next)
      document.cookie = `${LANG_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`
      document.documentElement.lang = next
      // Server-rendered content (post bodies) re-renders with the new cookie.
      router.refresh()
    },
    [router],
  )

  const toggle = React.useCallback(() => setLang(lang === "en" ? "es" : "en"), [lang, setLang])

  const value = React.useMemo(() => ({ lang, t: copy[lang], setLang, toggle }), [lang, setLang, toggle])

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export function useLang(): LangContextValue {
  const ctx = React.useContext(LangContext)
  if (!ctx) throw new Error("useLang must be used inside <LangProvider>")
  return ctx
}

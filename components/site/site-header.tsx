"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useLang } from "@/components/site/lang-provider"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  const { lang, t, toggle } = useLang()
  const pathname = usePathname()
  const nav = [
    { href: "/projects", label: t.nav.work },
    { href: "/blog", label: t.nav.blog },
    { href: "/experience", label: t.nav.exp },
  ]
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)
  const other = lang === "en" ? "ES" : "EN"
  const otherName = lang === "en" ? "Español" : "English"

  return (
    <header className="sticky top-4 z-20 flex justify-center px-4">
      <div className="flex items-center gap-2 rounded-full border border-border-strong bg-card/80 p-1.5 shadow-[0_20px_50px_-20px_oklch(0_0_0/0.6)] backdrop-blur-[16px]">
        <Link href="/" className="px-3.5 py-1.5 font-display text-[15px] font-bold tracking-[-0.02em]">
          EM<span className="text-green">.</span>
        </Link>
        <nav className="hidden items-center gap-0.5 text-sm sm:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "rounded-full px-3 py-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground",
                isActive(item.href) && "bg-secondary text-foreground",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon-sm" className="rounded-full sm:hidden" aria-label={t.nav.menu}>
              <Menu />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" className="min-w-40 rounded-2xl border-border-strong bg-card">
            {[...nav, { href: "/me", label: t.nav.me }].map((item) => (
              <DropdownMenuItem key={item.href} asChild>
                <Link href={item.href}>{item.label}</Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <button
          type="button"
          onClick={toggle}
          aria-label={`Switch to ${otherName}`}
          className="rounded-full border border-border-strong px-2.5 py-[5px] font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          {other}
        </button>
        <Button asChild variant="pillGreen" size="pill">
          <Link href="/#talk">{t.nav.talk}</Link>
        </Button>
      </div>
    </header>
  )
}

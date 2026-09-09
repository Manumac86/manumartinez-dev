import * as React from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

export function MonoLabel({ className, ...props }: React.ComponentProps<"span">) {
  return <span className={cn("mono-label", className)} {...props} />
}

const chipStyles = {
  default: "rounded-full border border-border-strong px-3 py-1.5 text-[13px] text-fg-3",
  mono: "rounded-full border border-border-strong px-[9px] py-1 font-mono text-[11px] text-fg-3",
  cert: "rounded-full border border-border-strong px-2.5 py-[5px] text-xs text-fg-3",
} as const

export function Chip({
  variant = "default",
  className,
  ...props
}: React.ComponentProps<"span"> & { variant?: keyof typeof chipStyles }) {
  return <span className={cn(chipStyles[variant], className)} {...props} />
}

export function ArrowLink({
  href,
  external,
  className,
  children,
}: {
  href: string
  external?: boolean
  className?: string
  children: React.ReactNode
}) {
  const cls = cn(
    "inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground",
    className,
  )
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
        <ArrowRight className="size-3.5" />
      </a>
    )
  }
  return (
    <Link href={href} className={cls}>
      {children}
      <ArrowRight className="size-3.5" />
    </Link>
  )
}

export function SectionTitle({ className, ...props }: React.ComponentProps<"h2">) {
  return (
    <h2
      className={cn(
        "font-display text-[clamp(36px,5vw,64px)] leading-none font-medium tracking-[-0.04em] text-balance",
        className,
      )}
      {...props}
    />
  )
}

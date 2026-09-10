import { MonoLabel } from "@/components/site/primitives"
import type { Heading } from "@/lib/markdown"
import { cn } from "@/lib/utils"

export function Toc({ headings, label, className }: { headings: Heading[]; label: string; className?: string }) {
  if (headings.length === 0) return null
  return (
    <nav aria-label={label} className={cn("flex flex-col gap-3", className)}>
      <MonoLabel className="text-muted-2">{label}</MonoLabel>
      <ol className="flex flex-col gap-2 border-l border-border pl-4 text-sm">
        {headings.map((h) => (
          <li key={h.id} className={cn(h.level === 3 && "pl-3")}>
            <a href={`#${h.id}`} className="text-muted-foreground transition-colors hover:text-foreground">
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}

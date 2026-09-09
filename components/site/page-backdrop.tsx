import { cn } from "@/lib/utils"

export function PageBackdrop({ glow = "page" }: { glow?: "home" | "page" | "blue" }) {
  return (
    <>
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0",
          glow === "home" ? "bg-glow-home" : glow === "blue" ? "bg-glow-blue" : "bg-glow-page",
        )}
      />
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 bg-grid-violet opacity-60",
          glow === "home" ? "h-screen" : "h-[70vh] mask-fade-b",
        )}
      />
    </>
  )
}

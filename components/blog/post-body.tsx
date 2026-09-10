import { cn } from "@/lib/utils"

export function PostBody({ html, className }: { html: string; className?: string }) {
  return (
    <div
      className={cn("prose prose-site max-w-none", className)}
      // Rendered server-side from trusted markdown in content/posts.
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

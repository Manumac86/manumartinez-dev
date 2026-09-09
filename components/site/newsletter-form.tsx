"use client"

import { useActionState } from "react"
import { subscribeNewsletter } from "@/app/actions/contact"
import { useLang } from "@/components/site/lang-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const field =
  "h-auto rounded-sm border-input bg-background/60 px-3.5 py-[11px] text-base shadow-none focus-visible:border-green focus-visible:ring-0 md:text-base"

export function NewsletterForm({ variant = "inline" }: { variant?: "inline" | "band" }) {
  const { t } = useLang()
  const [state, action, pending] = useActionState(subscribeNewsletter, null)
  const band = variant === "band"
  return (
    <form action={action} className="flex flex-col gap-2.5">
      <div className="flex flex-wrap gap-2">
        <Input
          type="email"
          name="email"
          required
          placeholder={t.newsPlaceholder}
          aria-label={t.fEmail}
          className={cn(field, "min-w-[180px] flex-1", band && "min-w-[200px] rounded-md px-4 py-[13px]")}
        />
        {band ? (
          <Button type="submit" variant="green" size="cta" disabled={pending} className="px-5 py-[13px] text-sm">
            {t.newsCta}
          </Button>
        ) : (
          <Button
            type="submit"
            variant="outline"
            disabled={pending}
            className="h-auto rounded-sm border-border-chip bg-transparent px-4 py-[11px] text-base shadow-none hover:bg-green hover:text-background"
          >
            {t.newsCta}
          </Button>
        )}
      </div>
      {state?.ok && (
        <p className="text-[13px] text-green" role="status">
          {t.newsDone}
        </p>
      )}
      {state && !state.ok && (
        <p className="text-[13px] text-destructive" role="alert">
          {t.newsError}
        </p>
      )}
    </form>
  )
}

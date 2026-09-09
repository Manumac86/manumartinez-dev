"use client"

import { useActionState } from "react"
import { sendContact } from "@/app/actions/contact"
import { useLang } from "@/components/site/lang-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const field =
  "h-auto rounded-md border-input bg-background/60 px-4 py-3.5 text-base shadow-none focus-visible:border-green focus-visible:ring-0 md:text-base"

export function ContactForm() {
  const { t } = useLang()
  const [state, action, pending] = useActionState(sendContact, null)
  return (
    <form action={action} className="relative flex flex-col gap-3">
      <Input name="name" required placeholder={t.fName} aria-label={t.fName} className={field} />
      <Input type="email" name="email" required placeholder={t.fEmail} aria-label={t.fEmail} className={field} />
      <Textarea name="message" required rows={6} placeholder={t.fMsg} aria-label={t.fMsg} className={`${field} min-h-0 resize-y`} />
      <Button type="submit" variant="green" size="cta" disabled={pending} className="px-5 py-4 text-[15px]">
        {pending ? t.fSending : t.fSend}
      </Button>
      {state?.ok && (
        <p className="text-sm text-green" role="status">
          {t.fDone}
        </p>
      )}
      {state && !state.ok && (
        <p className="text-sm text-destructive" role="alert">
          {t.fError}
        </p>
      )}
    </form>
  )
}

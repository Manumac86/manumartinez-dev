import { cookies } from "next/headers"
import { LANG_COOKIE, parseLang } from "@/lib/lang"
import { unsubscribeNewsletterContact } from "@/lib/mail"
import { verifyEmailToken } from "@/lib/newsletter-token"

const copy = {
  en: { ok: "You're unsubscribed. Sorry to see you go.", bad: "This unsubscribe link is invalid or expired.", missing: "That email isn't subscribed.", back: "Back to manumartinez.dev" },
  es: { ok: "Baja confirmada. Una pena verte ir.", bad: "Este enlace de baja no es válido.", missing: "Ese email no está suscrito.", back: "Volver a manumartinez.dev" },
}

function page(lang: "en" | "es", message: string, status: number): Response {
  const t = copy[lang]
  const html = `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${message}</title></head>
<body style="margin:0;background:#0b0a14;color:#f1f0f6;font-family:Geist,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;display:flex;min-height:100vh;align-items:center;justify-content:center;text-align:center;padding:24px">
<main><p style="font-size:22px;margin:0 0 16px">${message}</p><a href="/" style="color:#7fd9b8">${t.back}</a></main></body></html>`
  return new Response(html, { status, headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" } })
}

async function handle(req: Request): Promise<Response> {
  const lang = parseLang((await cookies()).get(LANG_COOKIE)?.value)
  const url = new URL(req.url)
  const email = url.searchParams.get("email") ?? ""
  const token = url.searchParams.get("token") ?? ""
  if (!email || !token || !verifyEmailToken(email, token)) return page(lang, copy[lang].bad, 400)
  const done = await unsubscribeNewsletterContact(email)
  return page(lang, done ? copy[lang].ok : copy[lang].missing, done ? 200 : 404)
}

export const GET = handle
// RFC 8058 one-click unsubscribe (mail clients POST to the List-Unsubscribe URL).
export const POST = handle

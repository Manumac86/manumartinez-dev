# manumartinez.dev

Personal site of Emmanuel Martinez — dark, bilingual (EN/ES), five pages: Home, Projects, Blog, Experience, Me.

## Stack

Next.js 16 (App Router) · React 19 · Tailwind CSS 4 · shadcn/ui v4 (`radix-ui`) · `motion` · TypeScript 7 · vitest + Testing Library. Package manager: **bun**.

## Scripts

```bash
bun install        # deps
bun run dev        # http://localhost:3000
bun run build      # production build (runs type-check)
bun run lint       # eslint
bun run test       # vitest
```

## Environment

| Variable | Purpose |
|---|---|
| `RESEND_API_KEY` | Resend API key. Without it, contact/newsletter forms log to the console in development and fail gracefully in production. |
| `RESEND_AUDIENCE_ID` | Resend audience that stores newsletter subscribers. |
| `CONTACT_TO` | Inbox for contact-form messages (default `me@manumartinez.dev`). |
| `CONTACT_FROM` | Sender used by Resend (must be a verified domain). |
| `REACTBITS_LICENSE_KEY` | React Bits Pro registry access for `bun x shadcn@latest add @reactbits-pro/...`. |

## Content

All copy and data live in `content/` (typed, EN + ES). Language is persisted in a `lang` cookie and read by the root layout.

## Design

The design handoff (reference HTML, tokens, data) lives locally in `docs/` and is not committed.

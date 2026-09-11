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
bun run email      # React Email preview of emails/ on :3333
```

## Environment

| Variable | Purpose |
|---|---|
| `RESEND_API_KEY` | Resend API key. Without it, contact/newsletter forms log to the console in development and fail gracefully in production. |
| `RESEND_SEGMENT_ID` | Resend segment (formerly audience) that stores newsletter subscribers. |
| `NEWSLETTER_SECRET` | Optional HMAC secret for unsubscribe links (defaults to `RESEND_API_KEY`). |
| `FEATURE_PROJECTS`, `FEATURE_BLOG` | `on` shows the section (page, home block, nav and footer links). Anything else hides it with 404s. Off in Production until the content is reviewed; on in Preview/Development. |
| `FLAGS_SECRET` | Signs Vercel Toolbar flag overrides, so hidden sections can be previewed per browser in production. |
| `CONTACT_TO` | Inbox for contact-form messages (default `me@manumartinez.dev`). |
| `CONTACT_FROM` | Sender used by Resend. Defaults to `hello@` + `RESEND_EMAIL_DOMAIN` (provisioned by the Marketplace; the domain must be verified in Resend). |
| `REACTBITS_LICENSE_KEY` | React Bits Pro registry access for `bun x shadcn@latest add @reactbits-pro/...`. |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY` | Clerk (Vercel Marketplace). Only `/admin` and `/sign-in` touch Clerk. |
| `CMS_EDITORS` | Comma-separated emails allowed to use the CMS (or give the Clerk user `publicMetadata.role = "editor"`). |
| `GITHUB_TOKEN` | Fine-grained PAT with **Contents: read/write** on this repo. The CMS commits posts through the GitHub API. |
| `GITHUB_REPO`, `GITHUB_BRANCH` | Defaults `Manumac86/manumartinez-dev` and `main`. |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob store for post covers (auto-provisioned). |
| `TRANSLATION_MODEL` | AI Gateway model id for auto-translation (default `anthropic/claude-sonnet-5`). Gateway auth uses Vercel OIDC. |

## Feature flags

Sections are gated with the Vercel Flags SDK (`flags.ts`). Toggle them with the `FEATURE_*` env vars (redeploy to apply) or per browser from the Vercel Toolbar. `/admin` is never gated.

## Content

All copy and data live in `content/` (typed, EN + ES). Language is persisted in a `lang` cookie and read by the root layout.

### Blog

Posts are Markdown files in `content/posts/<slug>/es.md` and `en.md` with frontmatter (`title`, `excerpt`, `tag`, `date`, `template`, `draft`, `cover`, `source`, `translatedFrom`, `sourceHash`, plus `client`/`role`/`stack` for case studies). Templates: `article`, `note`, `case-study`. Drafts render outside production and on preview deployments.

### CMS

`/admin` (Clerk-gated, editors only) edits posts in the browser: Markdown editor with preview, cover upload to Blob, automatic translation to the other language through the AI Gateway, and an atomic commit to `main` via the GitHub API. Vercel redeploys the site from that commit.

## Design

The design handoff (reference HTML, tokens, data) lives locally in `docs/` and is not committed.

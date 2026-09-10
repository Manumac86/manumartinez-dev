"use client"

import * as React from "react"
import Link from "next/link"
import { useActionState } from "react"
import CodeMirror from "@uiw/react-codemirror"
import { markdown } from "@codemirror/lang-markdown"
import { ExternalLink, ImagePlus, Loader2 } from "lucide-react"
import { previewMarkdown, savePost, uploadCover, type SaveResult } from "@/app/actions/cms"
import { PostBody } from "@/components/blog/post-body"
import { MonoLabel } from "@/components/site/primitives"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { slugify, type PostForm } from "@/lib/cms"
import { POST_TEMPLATES } from "@/lib/posts"

const field = "h-auto rounded-sm border-border-strong bg-background/60 px-3.5 py-2.5 text-sm shadow-none focus-visible:border-green focus-visible:ring-0 md:text-sm"

export interface PostEditorProps {
  mode: "new" | "edit"
  initial: PostForm
  tags: string[]
  translation?: "current" | "stale" | "missing" | "unknown"
}

export function PostEditor({ mode, initial, tags, translation = "unknown" }: PostEditorProps) {
  const [form, setForm] = React.useState<PostForm>(initial)
  const [slugTouched, setSlugTouched] = React.useState(mode === "edit")
  const [state, action, pending] = useActionState(savePost, null as SaveResult | null)
  const [html, setHtml] = React.useState("")
  const [previewing, setPreviewing] = React.useState(false)
  const [uploading, setUploading] = React.useState(false)
  const [uploadError, setUploadError] = React.useState<string | null>(null)
  const issues = state && !state.ok ? (state.issues ?? {}) : {}

  const set = <K extends keyof PostForm>(key: K, value: PostForm[K]) => setForm((f) => ({ ...f, [key]: value }))

  const onTitle = (title: string) => {
    setForm((f) => ({ ...f, title, slug: slugTouched ? f.slug : slugify(title) }))
  }

  const refreshPreview = React.useCallback(async () => {
    setPreviewing(true)
    try {
      setHtml(await previewMarkdown(form.body))
    } finally {
      setPreviewing(false)
    }
  }, [form.body])

  const onCover = async (file: File | undefined) => {
    if (!file) return
    setUploading(true)
    setUploadError(null)
    const fd = new FormData()
    fd.set("file", file)
    fd.set("slug", form.slug || "post")
    const res = await uploadCover(fd)
    setUploading(false)
    if (res.ok) set("cover", res.url)
    else setUploadError(res.error)
  }

  const isCaseStudy = form.template === "case-study"

  return (
    <form action={action} className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
      <div className="flex min-w-0 flex-col gap-4">
        <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_240px]">
          <Field label="Title" issue={issues.title}>
            <Input name="title" value={form.title} onChange={(e) => onTitle(e.target.value)} className={`${field} text-base font-medium`} required />
          </Field>
          <Field label="Slug" issue={issues.slug} hint={mode === "edit" ? "Changing it breaks existing links" : undefined}>
            <Input
              name="slug"
              value={form.slug}
              onChange={(e) => {
                setSlugTouched(true)
                set("slug", e.target.value)
              }}
              className={`${field} font-mono text-xs`}
              required
            />
          </Field>
        </div>
        <Field label="Excerpt" issue={issues.excerpt}>
          <Textarea name="excerpt" rows={2} value={form.excerpt} onChange={(e) => set("excerpt", e.target.value)} className={`${field} min-h-0`} required />
        </Field>

        <Tabs defaultValue="write" onValueChange={(v) => v === "preview" && refreshPreview()}>
          <div className="flex items-center justify-between gap-4">
            <TabsList className="h-auto rounded-full bg-card-2 p-1">
              <TabsTrigger value="write" className="rounded-full px-4 py-1.5 text-xs data-[state=active]:bg-secondary">Write</TabsTrigger>
              <TabsTrigger value="preview" className="rounded-full px-4 py-1.5 text-xs data-[state=active]:bg-secondary">Preview</TabsTrigger>
            </TabsList>
            <span className="font-mono text-xs text-muted-2">{form.body.trim().split(/\s+/).filter(Boolean).length} words</span>
          </div>
          <TabsContent value="write" className="mt-3">
            <input type="hidden" name="body" value={form.body} />
            <div className="overflow-hidden rounded-2xl border border-border-strong bg-card-2 [&_.cm-editor]:bg-transparent [&_.cm-editor]:outline-none [&_.cm-gutters]:border-r-border-soft [&_.cm-gutters]:bg-card-2 [&_.cm-scroller]:font-mono [&_.cm-scroller]:text-[14px] [&_.cm-scroller]:leading-[1.7]">
              <CodeMirror value={form.body} onChange={(v) => set("body", v)} extensions={[markdown()]} theme="dark" minHeight="60vh" basicSetup={{ lineNumbers: true, foldGutter: false, highlightActiveLine: false }} />
            </div>
            {issues.body && <p className="mt-2 text-xs text-destructive">{issues.body}</p>}
          </TabsContent>
          <TabsContent value="preview" className="mt-3">
            <div className="min-h-[60vh] rounded-2xl border border-border-strong bg-card-2 p-8">
              {previewing ? (
                <p className="inline-flex items-center gap-2 font-mono text-xs text-muted-2"><Loader2 className="size-3.5 animate-spin" />Rendering…</p>
              ) : (
                <PostBody html={html} className="max-w-[760px]" />
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <aside className="flex flex-col gap-5 self-start rounded-band border border-border bg-card p-6 lg:sticky lg:top-24">
        <MonoLabel className="text-muted-2">Settings</MonoLabel>
        <Field label="Template">
          <Select value={form.template} onValueChange={(v) => set("template", v as PostForm["template"])}>
            <SelectTrigger className={field}><SelectValue /></SelectTrigger>
            <SelectContent>
              {POST_TEMPLATES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
            </SelectContent>
          </Select>
          <input type="hidden" name="template" value={form.template} />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Tag" issue={issues.tag}>
            <Input name="tag" list="post-tags" value={form.tag} onChange={(e) => set("tag", e.target.value)} className={field} required />
            <datalist id="post-tags">{tags.map((t) => <option key={t} value={t} />)}</datalist>
          </Field>
          <Field label="Date" issue={issues.date}>
            <Input type="date" name="date" value={form.date} onChange={(e) => set("date", e.target.value)} className={field} required />
          </Field>
        </div>
        <Field label="Written in">
          <Select value={form.source} onValueChange={(v) => set("source", v as PostForm["source"])}>
            <SelectTrigger className={field}><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="es">Español → auto-translate to English</SelectItem>
              <SelectItem value="en">English → auto-translate to Spanish</SelectItem>
            </SelectContent>
          </Select>
          <input type="hidden" name="source" value={form.source} />
        </Field>
        {isCaseStudy && (
          <div className="grid gap-3 rounded-2xl border border-border-soft bg-card-2 p-4">
            <Field label="Client"><Input name="client" value={form.client ?? ""} onChange={(e) => set("client", e.target.value)} className={field} /></Field>
            <Field label="Role"><Input name="role" value={form.role ?? ""} onChange={(e) => set("role", e.target.value)} className={field} /></Field>
            <Field label="Stack (comma separated)"><Input name="stack" value={form.stack ?? ""} onChange={(e) => set("stack", e.target.value)} className={field} /></Field>
          </div>
        )}
        {!isCaseStudy && (
          <>
            <input type="hidden" name="client" value={form.client ?? ""} />
            <input type="hidden" name="role" value={form.role ?? ""} />
            <input type="hidden" name="stack" value={form.stack ?? ""} />
          </>
        )}
        <Field label="Cover" issue={issues.cover ?? uploadError ?? undefined}>
          <input type="hidden" name="cover" value={form.cover ?? ""} />
          {form.cover ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={form.cover} alt="" className="aspect-[21/9] w-full rounded-xl border border-border object-cover" />
          ) : null}
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-border-strong px-3.5 py-2 text-xs text-muted-foreground hover:text-foreground">
            {uploading ? <Loader2 className="size-3.5 animate-spin" /> : <ImagePlus className="size-3.5" />}
            {form.cover ? "Replace image" : "Upload image"}
            <input type="file" accept="image/*" className="sr-only" onChange={(e) => onCover(e.target.files?.[0])} />
          </label>
          {form.cover && (
            <button type="button" onClick={() => set("cover", "")} className="text-left text-xs text-muted-2 hover:text-foreground">Remove cover</button>
          )}
        </Field>
        <div className="flex flex-col gap-3 border-t border-border-soft pt-4">
          <Toggle name="draft" label="Draft" hint="Hidden in production, visible on previews" checked={form.draft} onChange={(v) => set("draft", v)} />
          <Toggle name="retranslate" label="Re-translate on save" hint={translationHint(translation)} checked={form.retranslate} onChange={(v) => set("retranslate", v)} />
        </div>
        <Button type="submit" variant="green" size="cta" disabled={pending} className="mt-2 w-full py-3.5 text-sm">
          {pending ? <><Loader2 className="animate-spin" />Saving & translating…</> : form.draft ? "Save draft" : "Publish"}
        </Button>
        {state?.ok && (
          <div className="rounded-2xl border border-green/40 bg-green/10 p-4 text-sm" role="status">
            <p className="font-medium text-green">Saved.{state.translated ? " Translation regenerated." : ""}</p>
            <p className="mt-1 text-xs text-muted-foreground">Vercel is deploying — live in a minute or two.</p>
            <div className="mt-2 flex flex-wrap gap-3 text-xs">
              <a href={state.commitUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-green">Commit<ExternalLink className="size-3" /></a>
              <Link href={`/blog/${state.slug}`} className="inline-flex items-center gap-1 text-green">View post<ExternalLink className="size-3" /></Link>
            </div>
          </div>
        )}
        {state && !state.ok && state.error !== "invalid" && (
          <p className="rounded-2xl border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive" role="alert">{state.error}</p>
        )}
        {state && !state.ok && state.error === "invalid" && (
          <p className="text-xs text-destructive" role="alert">Check the highlighted fields.</p>
        )}
      </aside>
    </form>
  )
}

function translationHint(status: PostEditorProps["translation"]): string {
  switch (status) {
    case "current": return "Translation is up to date"
    case "stale": return "Source changed since last translation — it will be regenerated"
    case "missing": return "No translation yet — it will be generated"
    default: return "Automatic when the source text changes"
  }
}

function Field({ label, hint, issue, children }: { label: string; hint?: string; issue?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label className="font-mono text-[11px] tracking-[0.08em] text-muted-2 uppercase">{label}</Label>
      {children}
      {issue ? <p className="text-xs text-destructive">{issue}</p> : hint ? <p className="text-xs text-muted-2">{hint}</p> : null}
    </div>
  )
}

function Toggle({ name, label, hint, checked, onChange }: { name: string; label: string; hint?: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex cursor-pointer items-start justify-between gap-4">
      <span>
        <span className="block text-sm font-medium">{label}</span>
        {hint && <span className="block text-xs text-muted-2">{hint}</span>}
      </span>
      <Switch name={name} checked={checked} onCheckedChange={onChange} className="data-[state=checked]:bg-green" />
    </label>
  )
}

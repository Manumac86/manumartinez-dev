import { readFile } from "node:fs/promises"
import path from "node:path"
import type { Metadata } from "next"
import matter from "gray-matter"
import { PageBackdrop } from "@/components/site/page-backdrop"
import { PostBody } from "@/components/blog/post-body"
import { MonoLabel } from "@/components/site/primitives"
import { formatDate } from "@/lib/format"
import { renderMarkdown } from "@/lib/markdown"

const FILE = path.join(process.cwd(), "content", "legal", "estudio-privacidad.md")

export const metadata: Metadata = {
  title: "Política de privacidad del estudio",
  description: "Qué datos personales trato en el estudio sobre traspasos entre producto, tecnología y diseño, por qué y qué derechos tienes.",
}

export default async function StudyPrivacyPage() {
  const { data, content } = matter(await readFile(/* turbopackIgnore: true */ FILE, "utf8"))
  const html = await renderMarkdown(content)
  return (
    <>
      <PageBackdrop glow="page" />
      <main lang="es" className="container-site relative pt-[clamp(64px,10vh,120px)] pb-24">
        <article className="mx-auto flex max-w-[760px] flex-col gap-10">
          <header className="flex flex-col gap-5">
            <MonoLabel className="text-violet">Privacidad</MonoLabel>
            <h1 className="font-display text-[clamp(32px,4.4vw,56px)] leading-[1.02] font-medium tracking-[-0.04em] text-balance">
              {data.title}
            </h1>
            <p className="font-mono text-xs text-muted-2">
              Última actualización: <time dateTime={data.updated}>{formatDate(data.updated, "es")}</time>
            </p>
          </header>
          <PostBody html={html} />
        </article>
      </main>
    </>
  )
}

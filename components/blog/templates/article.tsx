import Image from "next/image";
import { PostBody } from "@/components/blog/post-body";
import { PostHeader } from "@/components/blog/post-header";
import { Toc } from "@/components/blog/toc";
import { copy, type Lang } from "@/content";
import type { Post } from "@/lib/posts";

export function ArticleTemplate({ post, lang }: { post: Post; lang: Lang }) {
  const t = copy[lang];
  return (
    <article
      data-template="article"
      className="container-site relative pt-[clamp(48px,8vh,96px)] pb-24"
    >
      <div className="mx-auto max-w-[1100px]">
        <PostHeader post={post} lang={lang} className="max-w-[900px]" />
        {post.meta.cover && (
          <div className="relative mt-12 aspect-[21/9] overflow-hidden rounded-band border border-border">
            <Image
              src={post.meta.cover}
              alt=""
              fill
              priority
              sizes="(min-width: 1680px) 1520px, 100vw"
              className="object-cover"
            />
          </div>
        )}
        <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,1fr)_240px]">
          <PostBody html={post.html} className="max-w-[760px]" />
          <Toc
            headings={post.headings}
            label={t.onThisPage}
            className="hidden lg:sticky lg:top-28 lg:flex lg:self-start"
          />
        </div>
      </div>
    </article>
  );
}

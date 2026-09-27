"use client"

import Script from "next/script"

declare global {
  interface Window {
    tf?: { load?: () => void }
  }
}

/** Typeform live embed. The script scans for data-tf-live on load; tf.load() rescans after client-side navigation. */
export function TypeformEmbed({ id, className }: { id: string; className?: string }) {
  return (
    <>
      <div data-tf-live={id} className={className} />
      <Script src="https://embed.typeform.com/next/embed.js" onReady={() => window.tf?.load?.()} />
    </>
  )
}

import type { Metadata } from "next"
import { SignIn } from "@clerk/nextjs"
import { PageBackdrop } from "@/components/site/page-backdrop"

export const metadata: Metadata = { title: "Sign in", robots: { index: false, follow: false } }

export default function SignInPage() {
  return (
    <>
      <PageBackdrop glow="page" />
      <main className="container-site relative flex flex-1 items-center justify-center py-24">
        <SignIn />
      </main>
    </>
  )
}

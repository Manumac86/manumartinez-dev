import type { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"
import { SignOutButton } from "@clerk/nextjs"
import { MonoLabel } from "@/components/site/primitives"
import { Button } from "@/components/ui/button"
import { getEditor } from "@/lib/cms-session"

export const metadata: Metadata = { title: "Admin", robots: { index: false, follow: false } }

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, signedIn } = await getEditor()
  if (!signedIn) redirect("/sign-in")
  if (!user) {
    return (
      <main className="container-site relative flex flex-1 flex-col items-center justify-center gap-4 py-24 text-center">
        <MonoLabel className="text-violet">403</MonoLabel>
        <h1 className="font-display text-4xl font-medium tracking-[-0.03em]">This account can&apos;t edit the blog.</h1>
        <p className="max-w-[480px] text-muted-foreground">Ask Emmanuel to add your email to the editors list, then sign in again.</p>
        <SignOutButton>
          <Button variant="heroOutline" size="pill">Sign out</Button>
        </SignOutButton>
      </main>
    )
  }
  return (
    <div className="container-site relative flex flex-1 flex-col gap-8 py-12">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
        <div className="flex items-center gap-4">
          <Link href="/admin" className="font-display text-xl font-bold tracking-[-0.02em]">
            Blog CMS<span className="text-green">.</span>
          </Link>
          <nav className="flex items-center gap-1 text-sm">
            <Link href="/admin" className="rounded-full px-3 py-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground">Posts</Link>
            <Link href="/admin/new" className="rounded-full px-3 py-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground">New post</Link>
          </nav>
        </div>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span className="font-mono text-xs">{user.email}</span>
          <SignOutButton>
            <Button variant="heroOutline" size="pill">Sign out</Button>
          </SignOutButton>
        </div>
      </header>
      {children}
    </div>
  )
}

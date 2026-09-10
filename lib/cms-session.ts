import "server-only"
import { currentUser } from "@clerk/nextjs/server"
import { isEditor } from "@/lib/auth"

export interface CmsUser {
  id: string
  email: string
  name: string
}

/** Returns the signed-in editor, or null when signed out / not allowed. */
export async function getEditor(): Promise<{ user: CmsUser | null; signedIn: boolean }> {
  const user = await currentUser()
  if (!user) return { user: null, signedIn: false }
  const emails = user.emailAddresses.map((e) => e.emailAddress)
  if (!isEditor({ emails, role: user.publicMetadata?.role })) return { user: null, signedIn: true }
  return {
    signedIn: true,
    user: { id: user.id, email: user.primaryEmailAddress?.emailAddress ?? emails[0] ?? "", name: user.fullName ?? user.firstName ?? "Editor" },
  }
}

/** For server actions: throws unless an allowed editor is signed in. */
export async function requireEditor(): Promise<CmsUser> {
  const { user } = await getEditor()
  if (!user) throw new Error("Forbidden")
  return user
}

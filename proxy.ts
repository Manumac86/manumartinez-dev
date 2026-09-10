import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"

const isAdmin = createRouteMatcher(["/admin(.*)"])

// Clerk only runs on the CMS routes; the public site never touches it.
export default clerkMiddleware(async (auth, req) => {
  if (isAdmin(req)) await auth.protect()
})

export const config = {
  matcher: ["/admin(.*)", "/sign-in(.*)"],
}

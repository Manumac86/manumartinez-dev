import { createFlagsDiscoveryEndpoint, getProviderData } from "flags/next"
import { siteFlags } from "@/flags"

// Lets the Vercel Toolbar list the flags and set per-browser overrides.
export const GET = createFlagsDiscoveryEndpoint(async () => getProviderData(siteFlags))

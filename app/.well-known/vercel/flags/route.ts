import { createFlagsDiscoveryEndpoint } from "flags/next"
import { getProviderData } from "@flags-sdk/vercel"
import { siteFlags } from "@/flags"

// Lets the Vercel Toolbar list the flags (with their dashboard definitions) and set per-browser overrides.
export const GET = createFlagsDiscoveryEndpoint(async () => getProviderData(siteFlags))

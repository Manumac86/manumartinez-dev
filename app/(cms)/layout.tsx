import { ClerkProvider } from "@clerk/nextjs"

export default function CmsLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      signInUrl="/sign-in"
      signInFallbackRedirectUrl="/admin"
      appearance={{
        variables: {
          colorBackground: "oklch(0.14 0.03 290)",
          colorForeground: "oklch(0.95 0.01 290)",
          colorPrimary: "oklch(0.76 0.10 165)",
          colorPrimaryForeground: "oklch(0.10 0.025 290)",
          colorInput: "oklch(0.10 0.025 290)",
          colorInputForeground: "oklch(0.95 0.01 290)",
          colorNeutral: "oklch(0.95 0.01 290)",
          colorMuted: "oklch(0.20 0.04 290)",
          colorMutedForeground: "oklch(0.72 0.03 290)",
          colorBorder: "oklch(0.30 0.04 290)",
          colorDanger: "oklch(0.62 0.22 25)",
          borderRadius: "14px",
          fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif",
        },
      }}
    >
      {children}
    </ClerkProvider>
  )
}

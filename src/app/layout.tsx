import "./globals.css"
import type { Metadata } from "next"
import AppShell from "@/components/app-shell"
import AuthProvider from "@/components/session-provider"

export const metadata: Metadata = {
  title: "EdgeLog",
  description: "Minimal trading journal"
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>

        <AuthProvider>

          <AppShell>
            {children}
          </AppShell>

        </AuthProvider>

      </body>
    </html>
  )
}
import "./globals.css"
import AppShell from "@/components/app-shell"
import Providers from "@/components/providers"

export const metadata = {
  title: "EdgeLog",
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">

        <Providers>

          <main className="w-full min-h-screen px-4 xl:max-w-[640px] xl:mx-auto">

            <AppShell>
              {children}
            </AppShell>

          </main>

        </Providers>

      </body>
    </html>
  )
}
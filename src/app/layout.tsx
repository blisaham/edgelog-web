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
      <body className="bg-gray-50 flex justify-center">

        <Providers>

          <main className="w-full max-w-[430px] min-h-screen sm:px-4">

            <AppShell>
              {children}
            </AppShell>

          </main>

        </Providers>

      </body>
    </html>
  )
}
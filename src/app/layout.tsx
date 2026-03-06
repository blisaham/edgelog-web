import "./globals.css"
import AppShell from "@/components/app-shell"

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

        <main className="w-full max-w-md min-h-screen">

          <AppShell>
            {children}
          </AppShell>

        </main>

      </body>
    </html>
  )
}
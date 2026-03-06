import "./globals.css"

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
        <main className="w-full max-w-md p-4">
          {children}
        </main>
      </body>
    </html>
  )
}
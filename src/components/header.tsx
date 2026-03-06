"use client"

import Link from "next/link"
import { BarChart3, Settings } from "lucide-react"
import { useSession } from "next-auth/react"

export default function Header() {

  const { data: session } = useSession()

  return (
    <header className="flex items-center justify-between py-4">

      <Link href="/" className="text-xl font-bold">
        EDGE LOG
      </Link>

      <div className="flex items-center gap-4">

        <Link href="/stats">
          <BarChart3 className="w-5 h-5 text-black" />
        </Link>

        {session ? (
          <Link href="/settings">
            <Settings className="w-5 h-5 text-blue-600" />
          </Link>
        ) : (
          <Link href="/login">
            <Settings className="w-5 h-5 text-blue-600" />
          </Link>
        )}

      </div>

    </header>
  )
}
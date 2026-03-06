"use client"

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import Link from "next/link"

import TradeForm from "@/components/trade-form"
import { Button } from "@/components/ui/button"

export default function NewTradePage() {

  const { data: session, status } = useSession()

  if (status === "loading") return null

  if (!session) {
    redirect("/login")
  }

  return (

    <div className="space-y-4">

      <Link href="/">
        <Button variant="secondary">
          ← Back
        </Button>
      </Link>

      <TradeForm />

    </div>

  )
}
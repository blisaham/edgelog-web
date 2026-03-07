"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { createTrade } from "@/lib/db/trades"

export default function TradeForm() {

  const router = useRouter()

  const [ticker, setTicker] = useState("")
  const [edge, setEdge] = useState("")
  const [url, setUrl] = useState("")
  const [saving, setSaving] = useState(false)

  async function handleSubmit(e: React.FormEvent) {

    e.preventDefault()

    if (!ticker || !edge || !url) {
      alert("Please fill all fields")
      return
    }

    setSaving(true)

    await createTrade({
      ticker,
      edge,
      open_chart_url: url
    })

    router.push("/")

  }

  return (

    <form onSubmit={handleSubmit} className="space-y-3">

      <div>
        <label className="text-[16px] md:text-sm block mb-1">
          Ticker
        </label>

        <input
          value={ticker}
          onChange={(e) => setTicker(e.target.value)}
          className="w-full border rounded-md px-3 py-2 text-[20px] md:text-sm"
        />

      </div>

      <div>
        <label className="text-[16px] md:text-sm block mb-1">
          Edge / Entry tactic
        </label>

        <textarea
          value={edge}
          onChange={(e) => setEdge(e.target.value)}
          rows={4}
          className="w-full border rounded-md px-3 py-2 text-[20px] md:text-sm resize-none"
        />

      </div>

      <div>
        <label className="text-[16px] md:text-sm block mb-1">
          Open chart history URL
        </label>

        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full border rounded-md px-3 py-2 text-[20px] md:text-sm"
        />

      </div>

      <Button type="submit" disabled={saving}>
        {saving ? "Saving..." : "Save"}
      </Button>

    </form>

  )
}
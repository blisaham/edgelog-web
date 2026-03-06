"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

interface Props {
  onSubmit: (data: {
    ticker: string
    edge: string
    open_chart_url: string
  }) => Promise<void>
}

export default function TradeForm({ onSubmit }: Props) {

  const [ticker, setTicker] = useState("")
  const [edge, setEdge] = useState("")
  const [url, setUrl] = useState("")
  const [saving, setSaving] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!url) {
      alert("Open chart URL required")
      return
    }

    try {
      setSaving(true)

      await onSubmit({
        ticker,
        edge,
        open_chart_url: url
      })

      alert("Trade saved")

      setTicker("")
      setEdge("")
      setUrl("")
    } catch {
      alert("Failed to save trade")
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      <Input
        placeholder="Ticker"
        value={ticker}
        onChange={(e) => setTicker(e.target.value)}
      />

      <Textarea
        placeholder="Edge & entry tactic"
        value={edge}
        onChange={(e) => setEdge(e.target.value)}
      />

      <Input
        placeholder="Open chart URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <div className="flex gap-3">

        <Button type="submit" disabled={saving}>
          {saving ? "Saving..." : "Save"}
        </Button>

        <Button type="reset" variant="secondary">
          Reset
        </Button>

      </div>

    </form>
  )
}
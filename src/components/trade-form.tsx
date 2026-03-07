"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function TradeForm() {

  const [ticker, setTicker] = useState("")
  const [edge, setEdge] = useState("")
  const [url, setUrl] = useState("")

  return (

    <div className="space-y-3">

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
        <input
          value={edge}
          onChange={(e) => setEdge(e.target.value)}
          className="w-full border rounded-md px-3 py-2 text-[20px] md:text-sm"
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

      <Button>
        Save
      </Button>

    </div>

  )
}
"use client"

import { useState } from "react"
import BackButton from "@/components/back-button"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent
} from "@/components/ui/dialog"

export default function NewTradePage() {

  const [ticker, setTicker] = useState("")
  const [edge, setEdge] = useState("")
  const [chart, setChart] = useState("")
  const [open, setOpen] = useState(false)

  async function save() {

    if (!ticker || !edge || !chart) return

    await supabase
      .from("trades")
      .insert([
        {
          ticker,
          edge,
          open_chart_url: chart
        }
      ])

    setOpen(true)
  }

  function closeDialog() {

    setOpen(false)

    window.location.href = "/"
  }

  return (
    <div className="space-y-6">

      <BackButton />

      <div className="space-y-4">

        <Input
          placeholder="Ticker"
          value={ticker}
          onChange={(e) => setTicker(e.target.value)}
        />

        <Textarea
          placeholder="Edge / Entry tactic"
          value={edge}
          onChange={(e) => setEdge(e.target.value)}
        />

        <Input
          placeholder="Open chart URL"
          value={chart}
          onChange={(e) => setChart(e.target.value)}
        />

        <Button
          onClick={save}
          className="w-full"
        >
          Save Trade
        </Button>

      </div>

      {open && (

        <Dialog open={open}>

          <DialogContent>

            <div className="space-y-4 text-center">

              <p className="text-sm font-medium">
                Trade saved
              </p>

              <Button
                onClick={closeDialog}
                className="w-full"
              >
                OK
              </Button>

            </div>

          </DialogContent>

        </Dialog>

      )}

    </div>
  )
}
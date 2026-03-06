"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import { createTrade } from "@/lib/db/trades"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import {
  AlertDialog,
  AlertDialogContent
} from "@/components/ui/alert-dialog"

export default function TradeForm() {

  const router = useRouter()

  const [ticker, setTicker] = useState("")
  const [edge, setEdge] = useState("")
  const [openChart, setOpenChart] = useState("")

  const [savedDialog, setSavedDialog] = useState(false)

  async function handleSave() {

    if (!ticker || !openChart) return

    await createTrade({
      ticker,
      edge,
      open_chart_url: openChart
    })

    setSavedDialog(true)
  }

  function closeDialog() {
    setSavedDialog(false)
    router.push("/")
  }

  return (

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
        placeholder="Open chart history URL"
        value={openChart}
        onChange={(e) => setOpenChart(e.target.value)}
      />

      <Button
        onClick={handleSave}
        className="w-full"
      >
        Save
      </Button>

      <AlertDialog open={savedDialog}>

        <AlertDialogContent>

          <div className="text-lg font-semibold">
            Trade saved
          </div>

          <div className="flex justify-end mt-4">

            <Button onClick={closeDialog}>
              OK
            </Button>

          </div>

        </AlertDialogContent>

      </AlertDialog>

    </div>
  )
}
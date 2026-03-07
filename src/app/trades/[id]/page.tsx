"use client"

import { useEffect, useState } from "react"
import BackButton from "@/components/back-button"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { useSession } from "next-auth/react"
import { Dialog, DialogContent } from "@/components/ui/dialog"

export default function TradeDetailPage({ params }: any) {

  const { data: session } = useSession()

  const [trade, setTrade] = useState<any>(null)

  const [closing, setClosing] = useState(false)
  const [closeUrl, setCloseUrl] = useState("")
  const [classification, setClassification] = useState("")

  const [deleteDialog, setDeleteDialog] = useState(false)
  const [closeDialog, setCloseDialog] = useState(false)

  const [saving, setSaving] = useState(false)
  const [savedNotice, setSavedNotice] = useState(false)

  useEffect(() => {

    async function load() {

      const id = params?.id

      if (!id) {
        console.error("Missing trade id")
        return
      }

      const { data, error } = await supabase
        .from("trades")
        .select("*")
        .eq("id", id)
        .single()

      if (error) {
        console.error(error)
        return
      }

      setTrade(data)
    }

    load()

  }, [params])

  if (!trade) return null

  async function confirmDelete() {

    const id = params?.id

    if (!id) {
      console.error("Missing trade id")
      return
    }

    const { error } = await supabase
      .from("trades")
      .delete()
      .eq("id", id)

    if (error) {
      console.error(error)
      return
    }

    window.location.href = "/"
  }

  async function confirmCloseTrade() {

    const id = params?.id

    if (!id) {
      console.error("Missing trade id")
      return
    }

    if (!closeUrl || !classification) {
      return
    }

    setSaving(true)

    const { error } = await supabase
      .from("trades")
      .update({
        close_chart_url: closeUrl,
        closed_at: new Date().toISOString(),
        classification
      })
      .eq("id", id)

    setSaving(false)

    if (error) {
      console.error(error)
      return
    }

    setSavedNotice(true)

    setTimeout(() => {
      setSavedNotice(false)
      window.location.href = "/"
    }, 1200)

  }

  return (
    <div className="space-y-8">

      <BackButton />

      <div className="space-y-2">

        <h1 className="text-xl font-semibold">
          {trade.ticker}
        </h1>

        <p className="text-sm text-gray-600 whitespace-pre-wrap">
          {trade.edge}
        </p>

      </div>

      <div className="flex flex-col gap-4">

        {trade.open_chart_url && (

          <a
            href={trade.open_chart_url}
            target="_blank"
            className="block"
          >
            <Button className="w-full">
              Open chart history
            </Button>
          </a>

        )}

        {!trade.closed_at && session && (

          <div className="space-y-4">

            {!closing && (

              <Button
                onClick={() => setClosing(true)}
                className="w-full bg-blue-600 text-white"
              >
                Close trade
              </Button>

            )}

            {closing && (

              <div className="space-y-4">

                <input
                  placeholder="Close chart URL"
                  className="w-full border rounded px-3 py-2 text-sm"
                  value={closeUrl}
                  onChange={(e) => setCloseUrl(e.target.value)}
                />

                <div className="grid grid-cols-2 gap-3 text-sm">

                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      value="good_profit"
                      name="classification"
                      onChange={(e) => setClassification(e.target.value)}
                    />
                    Good Profit
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      value="good_loss"
                      name="classification"
                      onChange={(e) => setClassification(e.target.value)}
                    />
                    Good Loss
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      value="bad_profit"
                      name="classification"
                      onChange={(e) => setClassification(e.target.value)}
                    />
                    Bad Profit
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      value="bad_loss"
                      name="classification"
                      onChange={(e) => setClassification(e.target.value)}
                    />
                    Bad Loss
                  </label>

                </div>

                <Button
                  onClick={() => setCloseDialog(true)}
                  className="w-full"
                  disabled={saving}
                >
                  {saving ? "Saving..." : "Confirm close trade"}
                </Button>

                {savedNotice && (
                  <span className="text-sm text-green-600">
                    Saved
                  </span>
                )}

              </div>

            )}

          </div>

        )}

        {trade.close_chart_url && (

          <a
            href={trade.close_chart_url}
            target="_blank"
            className="block"
          >
            <Button className="w-full bg-gray-700 text-white">
              Closed chart history
            </Button>
          </a>

        )}

      </div>

      {session && (

        <Button
          onClick={() => setDeleteDialog(true)}
          className="w-full bg-red-600 text-white"
        >
          Delete trade
        </Button>

      )}

      {deleteDialog && (

        <Dialog open={deleteDialog}>

          <DialogContent>

            <div className="space-y-4 text-center">

              <p className="text-sm font-medium">
                Delete this trade?
              </p>

              <div className="flex gap-2">

                <Button
                  className="w-full"
                  onClick={() => setDeleteDialog(false)}
                >
                  Cancel
                </Button>

                <Button
                  className="w-full bg-red-600 text-white"
                  onClick={confirmDelete}
                >
                  Delete
                </Button>

              </div>

            </div>

          </DialogContent>

        </Dialog>

      )}

      {closeDialog && (

        <Dialog open={closeDialog}>

          <DialogContent>

            <div className="space-y-4 text-center">

              <p className="text-sm font-medium">
                Confirm close trade?
              </p>

              <div className="flex gap-2">

                <Button
                  className="w-full"
                  onClick={() => setCloseDialog(false)}
                >
                  Cancel
                </Button>

                <Button
                  className="w-full bg-blue-600 text-white"
                  onClick={confirmCloseTrade}
                >
                  Confirm
                </Button>

              </div>

            </div>

          </DialogContent>

        </Dialog>

      )}

    </div>
  )
}
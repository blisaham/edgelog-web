export const dynamic = "force-dynamic"
export const revalidate = 0

import { getAllTrades } from "@/lib/db/trades"
import { getSettings } from "@/lib/db/settings"
import { getTopSignals } from "@/lib/db/sector"
import { calculateGrowth } from "@/lib/utils"

import BackButton from "@/components/back-button"
import GrowthCard from "@/components/growth-card"
import { Card, CardContent } from "@/components/ui/card"
import SignalTable from "@/components/signal-table"

export default async function StatsPage() {

  const trades = await getAllTrades()
  const settings = await getSettings()
  const signals = await getTopSignals()

  const goodProfit = trades.filter(
    (t) => t.classification === "good_profit"
  ).length

  const goodLoss = trades.filter(
    (t) => t.classification === "good_loss"
  ).length

  const badProfit = trades.filter(
    (t) => t.classification === "bad_profit"
  ).length

  const badLoss = trades.filter(
    (t) => t.classification === "bad_loss"
  ).length

  let growth = 0
  let lastUpdate = ""

  if (settings) {

    growth = calculateGrowth(
      settings.starting_balance,
      settings.last_balance
    )

    if (settings.updated_at) {
      lastUpdate = settings.updated_at.slice(0, 10)
    }

  }

  let signalUpdated = ""

  if (signals && signals.length > 0 && signals[0].date) {
    signalUpdated = signals[0].date
  }

  return (
    <div className="space-y-4 pb-10">

      <BackButton />

      <GrowthCard
        ytdGrowth={growth}
        lastUpdate={lastUpdate}
      />

      <div className="grid grid-cols-2 gap-3">

        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-gray-500">Good Profit</p>
            <p className="text-lg font-semibold">{goodProfit}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-gray-500">Good Loss</p>
            <p className="text-lg font-semibold">{goodLoss}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-gray-500">Bad Profit</p>
            <p className="text-lg font-semibold">{badProfit}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-gray-500">Bad Loss</p>
            <p className="text-lg font-semibold">{badLoss}</p>
          </CardContent>
        </Card>

      </div>

      {/* Signals Table */}

      {signals && signals.length > 0 && (

        <div className="space-y-3 pt-2">

          <div className="flex justify-between items-center px-1">

            <p className="text-sm font-semibold">
              Ranked Signals
            </p>

            {signalUpdated && (
              <p className="text-[10px] text-gray-500">
                Updated {signalUpdated}
              </p>
            )}

          </div>

          <SignalTable signals={signals} />

        </div>

      )}

    </div>
  )
}
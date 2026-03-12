export const dynamic = "force-dynamic"
export const revalidate = 0

import { getAllTrades } from "@/lib/db/trades"
import { getSettings } from "@/lib/db/settings"
import { getSectorRadar } from "@/lib/db/sector"
import { calculateGrowth } from "@/lib/utils"

import BackButton from "@/components/back-button"
import GrowthCard from "@/components/growth-card"
import { Card, CardContent } from "@/components/ui/card"

function quadrantColor(q: string) {

  if (!q) return "text-gray-500"

  const val = q.toLowerCase()

  if (val.includes("leading"))
    return "text-green-600"

  if (val.includes("improving"))
    return "text-yellow-600"

  if (val.includes("weakening"))
    return "text-orange-600"

  if (val.includes("lagging"))
    return "text-red-600"

  return "text-gray-500"
}

export default async function StatsPage() {

  const trades = await getAllTrades()
  const settings = await getSettings()
  const sectors = await getSectorRadar()

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

  let radarUpdated = ""

  if (sectors && sectors.length > 0 && sectors[0].date) {
    radarUpdated = sectors[0].date
  }

  return (
    <div className="space-y-4">

      <BackButton />

      <GrowthCard
        ytdGrowth={growth}
        lastUpdate={lastUpdate}
      />

      <div className="grid grid-cols-2 gap-3">

        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-gray-500">
              Good Profit
            </p>
            <p className="text-lg font-semibold">
              {goodProfit}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-gray-500">
              Good Loss
            </p>
            <p className="text-lg font-semibold">
              {goodLoss}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-gray-500">
              Bad Profit
            </p>
            <p className="text-lg font-semibold">
              {badProfit}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-gray-500">
              Bad Loss
            </p>
            <p className="text-lg font-semibold">
              {badLoss}
            </p>
          </CardContent>
        </Card>

      </div>

      {/* Sector Radar */}

      {sectors && sectors.length > 0 && (

        <div className="space-y-3 pt-2">

          <div className="flex justify-between items-center px-1">

            <p className="text-sm font-semibold">
              Sector Radar
            </p>

            {radarUpdated && (
              <p className="text-[10px] text-gray-500">
                Updated {radarUpdated}
              </p>
            )}

          </div>

          {sectors.map((s: any) => (

            <Card key={s.sector}>

              <CardContent className="p-4">

                <div className="flex justify-between items-center">

                  <p className="text-sm font-semibold">
                    {s.sector}
                  </p>

                  <p
                    className={`text-xs font-medium ${quadrantColor(
                      s.quadrant
                    )}`}
                  >
                    {s.quadrant}
                  </p>

                </div>

                <div className="text-xs text-gray-500 mt-1">
                  Momentum: {s.momentum} · Acc: {s.acceleration}
                </div>

                {s.signals && s.signals.length > 0 ? (

                  <div className="mt-2 text-xs space-y-1">

                    {s.signals.map((sig: any) => (

                      <div
                        key={sig.ticker}
                        className="flex justify-between"
                      >

                        <span>{sig.ticker}</span>

                        <span className="text-gray-500">
                          {sig.signal}
                        </span>

                      </div>

                    ))}

                  </div>

                ) : (

                  <div className="mt-2 text-xs text-gray-400">
                    No signals
                  </div>

                )}

              </CardContent>

            </Card>

          ))}

        </div>

      )}

    </div>
  )
}
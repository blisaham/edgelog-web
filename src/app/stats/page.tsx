import { getAllTrades } from "@/lib/db/trades"
import BackButton from "@/components/back-button"
import { Card, CardContent } from "@/components/ui/card"

export default async function StatsPage() {

  const trades = await getAllTrades()

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

  return (
    <div className="space-y-4">

      <BackButton />

      <h1 className="text-lg font-semibold">
        Stats
      </h1>

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

    </div>
  )
}
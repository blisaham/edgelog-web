import { Card, CardContent } from "@/components/ui/card"

interface Props {
  openTrades: number
  goodTrades: number
  ytdGrowth: number
  lastUpdate: string
}

export default function SummaryCards({
  openTrades,
  goodTrades,
  ytdGrowth,
  lastUpdate
}: Props) {
  return (
    <div className="grid grid-cols-2 gap-3 mb-4">

      <Card>
        <CardContent className="p-3">
          <p className="text-xs text-gray-500">Open trades</p>
          <p className="text-lg font-semibold">{openTrades}</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-3">
          <p className="text-xs text-gray-500">Good trades</p>
          <p className="text-lg font-semibold">{goodTrades}</p>
        </CardContent>
      </Card>

      <Card className="col-span-2">
        <CardContent className="p-3 flex justify-between items-start">
          
          <div className="text-sm font-medium">
            Growth :
          </div>

          <div className="text-right">
            <div className="text-lg font-semibold">
              {ytdGrowth} %
            </div>

            <div className="text-[10px] text-gray-500">
              {lastUpdate}
            </div>
          </div>

        </CardContent>
      </Card>

    </div>
  )
}
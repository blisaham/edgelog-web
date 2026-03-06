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
        <CardContent>
          <p className="text-base md:text-sm text-gray-500">Open trades</p>
          <p className="text-[36px] md:text-xl font-semibold leading-none">
            {openTrades}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <p className="text-base md:text-sm text-gray-500">Good trades</p>
          <p className="text-[36px] md:text-xl font-semibold leading-none">
            {goodTrades}
          </p>
        </CardContent>
      </Card>

      <Card className="col-span-2">
        <CardContent className="flex justify-between items-start">

          <div className="text-xl md:text-sm font-medium">
            Growth :
          </div>

          <div className="text-right">

            <div className="text-[36px] md:text-xl font-semibold leading-none">
              {ytdGrowth} %
            </div>

            <div className="text-base md:text-xs text-gray-500 mt-1">
              {lastUpdate}
            </div>

          </div>

        </CardContent>
      </Card>

    </div>
  )
}
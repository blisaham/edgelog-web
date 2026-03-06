import { Card, CardContent } from "@/components/ui/card"

interface Props {
  ytdGrowth: number
  lastUpdate: string
}

export default function GrowthCard({
  ytdGrowth,
  lastUpdate
}: Props) {
  return (
    <Card>
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
  )
}
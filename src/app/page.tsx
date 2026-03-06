import { getAllTrades } from "@/lib/db/trades"
import { getBlogPosts } from "@/lib/db/blog"
import { getSettings } from "@/lib/db/settings"
import SummaryCards from "@/components/summary-cards"
import MonthTimeline from "@/components/month-timeline"

export const dynamic = "force-dynamic"
export const revalidate = 0

export default async function HomePage() {

  const trades = await getAllTrades()
  const posts = await getBlogPosts()
  const settings = await getSettings()

  const openTrades = trades.filter((t) => !t.closed_at).length

  const goodTrades = trades.filter(
    (t) =>
      t.classification === "good_profit" ||
      t.classification === "good_loss"
  ).length

  let growth = 0

  if (settings?.starting_balance && settings?.last_balance) {

    growth =
      ((settings.last_balance - settings.starting_balance) /
        settings.starting_balance) *
      100
  }

  const lastUpdate =
    trades.length > 0
      ? new Date(trades[0].opened_at).toISOString().slice(0, 10)
      : "--"

  return (
    <div className="space-y-6">

      <SummaryCards
        openTrades={openTrades}
        goodTrades={goodTrades}
        ytdGrowth={Number(growth.toFixed(2))}
        lastUpdate={lastUpdate}
      />

      <div className="flex gap-3">

        <a
          href="/trades/new"
          className="flex-1 bg-black text-white text-center py-3 rounded-md"
        >
          New Trade
        </a>

        <a
          href="/blog/new"
          className="flex-1 bg-blue-600 text-white text-center py-3 rounded-md"
        >
          New Blog
        </a>

      </div>

      <MonthTimeline
        trades={trades}
        posts={posts}
      />

    </div>
  )
}
"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import Link from "next/link"

import MonthTimeline from "@/components/month-timeline"
import SummaryCards from "@/components/summary-cards"

import { getAllTrades } from "@/lib/db/trades"
import { getBlogPosts } from "@/lib/db/blog"
import { getSettings } from "@/lib/db/settings"

import { Trade, BlogPost } from "@/types"

export default function HomePage() {

  const { data: session } = useSession()

  const [trades, setTrades] = useState<Trade[]>([])
  const [posts, setPosts] = useState<BlogPost[]>([])

  const [openTrades, setOpenTrades] = useState(0)
  const [goodTrades, setGoodTrades] = useState(0)
  const [ytdGrowth, setYtdGrowth] = useState(0)
  const [lastUpdate, setLastUpdate] = useState("")

  useEffect(() => {

    async function loadData() {

      const t = await getAllTrades()
      const p = await getBlogPosts()
      const settings = await getSettings()

      const tradesData = t || []
      const postsData = p || []

      setTrades(tradesData)
      setPosts(postsData)

      const open = tradesData.filter(trade => !trade.closed_at).length

      const good = tradesData.filter(trade =>
        trade.classification === "good_profit" ||
        trade.classification === "good_loss"
      ).length

      setOpenTrades(open)
      setGoodTrades(good)

      if (settings) {

        const start = settings.starting_balance || 0
        const last = settings.last_balance || 0

        if (start > 0) {
          const growth = ((last - start) / start) * 100
          setYtdGrowth(Number(growth.toFixed(2)))
        }

        if (settings.updated_at) {
          setLastUpdate(settings.updated_at.slice(0, 10))
        }

      }

    }

    loadData()

  }, [])

  return (

    <div className="space-y-6">

      <SummaryCards
        openTrades={openTrades}
        goodTrades={goodTrades}
        ytdGrowth={ytdGrowth}
        lastUpdate={lastUpdate}
      />

      {session && (

        <div className="flex gap-4">

          <Link
            href="/trades/new"
            className="flex-1 text-center bg-black text-white py-3 rounded-md"
          >
            New Trade
          </Link>

          <Link
            href="/blog/new"
            className="flex-1 text-center bg-blue-600 text-white py-3 rounded-md"
          >
            New Blog
          </Link>

        </div>

      )}

      <MonthTimeline
        trades={trades}
        posts={posts}
      />

    </div>

  )
}
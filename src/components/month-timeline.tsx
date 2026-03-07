"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Trade, BlogPost } from "@/types"

interface Props {
  trades: Trade[]
  posts: BlogPost[]
}

function monthKey(date: string) {
  const d = new Date(date)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, "0")
  return `${y}-${m}`
}

function tradeStatus(trade: Trade) {

  if (!trade.closed_at) {
    return (
      <span className="text-[12px] text-gray-500">
        ⏳ Open
      </span>
    )
  }

  if (!trade.classification) return null

  const good =
    trade.classification === "good_profit" ||
    trade.classification === "good_loss"

  const label = trade.classification
    .replace("_", " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())

  return (
    <span
      className={`text-[12px] font-medium ${
        good ? "text-green-600" : "text-red-600"
      }`}
    >
      {good ? "✔" : "✖"} {label}
    </span>
  )
}

export default function MonthTimeline({ trades, posts }: Props) {

  const groups: Record<string, any> = {}

  for (const trade of trades) {

    if (trade.closed_at) {

      const key = monthKey(trade.closed_at)

      if (!groups[key]) {
        groups[key] = { posts: [], open: [], closed: [] }
      }

      groups[key].closed.push(trade)

    } else {

      const key = monthKey(trade.opened_at)

      if (!groups[key]) {
        groups[key] = { posts: [], open: [], closed: [] }
      }

      groups[key].open.push(trade)

    }

  }

  for (const post of posts) {

    const key = monthKey(post.created_at)

    if (!groups[key]) {
      groups[key] = { posts: [], open: [], closed: [] }
    }

    groups[key].posts.push(post)
  }

  const months = Object.keys(groups).sort().reverse()

  const [openMonths, setOpenMonths] = useState<Record<string, boolean>>({})
  const [sections, setSections] = useState<Record<string, boolean>>({})

  useEffect(() => {

    if (months.length) {

      setOpenMonths((prev) => {

        if (Object.keys(prev).length) return prev

        return { [months[0]]: true }

      })

    }

  }, [months])

  function toggleMonth(month: string) {

    setOpenMonths((prev) => ({
      ...prev,
      [month]: !prev[month]
    }))

  }

  function toggleSection(key: string) {

    setSections((prev) => ({
      ...prev,
      [key]: !prev[key]
    }))

  }

  if (!months.length) {
    return (
      <div className="text-[16px] text-gray-500">
        No entries yet
      </div>
    )
  }

  return (
    <div className="space-y-4">

      {months.map((month) => {

        const g = groups[month]
        const open = openMonths[month]

        return (

          <div key={month}>

            <button
              onClick={() => toggleMonth(month)}
              className="w-full flex justify-between items-center font-semibold text-[20px] md:text-lg"
            >
              <span>{month}</span>

              <span className="text-[18px]">
                {open ? "−" : "+"}
              </span>
            </button>

            <div className="mt-1 border-t border-dashed border-gray-300" />

            {open && (

              <div className="mt-3 ml-4 space-y-1">

                {g.posts.map((post: BlogPost) => (

                  <Link
                    key={post.id}
                    href={`/blog/${post.id}`}
                    className="block text-[18px] md:text-sm"
                  >
                    {post.created_at.slice(8, 10)} — {post.title}
                  </Link>

                ))}

              </div>

            )}

          </div>

        )
      })}

    </div>
  )
}
"use client"

import { useState } from "react"

interface Signal {
  ticker: string
  sector: string
  quadrant: string
  signal: string
  date: string
}

const quadrantOrder: Record<string, number> = {
  Leading: 1,
  Improving: 2,
  Weakening: 3,
  Lagging: 4
}

export default function SignalTable({ signals }: { signals: Signal[] }) {

  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)

  const pageSize = 15

  const filtered = signals
    .filter((s) =>
      s.ticker.toLowerCase().includes(search.toLowerCase()) ||
      s.sector.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {

      const qa = quadrantOrder[a.quadrant] ?? 99
      const qb = quadrantOrder[b.quadrant] ?? 99

      if (qa !== qb) return qa - qb

      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })

  const totalPages = Math.ceil(filtered.length / pageSize)

  const start = (page - 1) * pageSize
  const paginated = filtered.slice(start, start + pageSize)

  return (

    <div className="space-y-3 pb-10">

      <input
        type="text"
        placeholder="Search ticker or sector..."
        className="w-full border rounded-md px-3 py-2 text-sm"
        value={search}
        onChange={(e) => {
          setPage(1)
          setSearch(e.target.value)
        }}
      />

      <div className="border rounded-md overflow-hidden">

        <table className="w-full text-sm">

          <thead className="bg-muted">

            <tr className="text-left">

              <th className="px-3 py-2">Quadrant</th>
              <th className="px-3 py-2">Ticker</th>
              <th className="px-3 py-2">Sector</th>
              <th className="px-3 py-2">Signal</th>
              <th className="px-3 py-2">Date</th>

            </tr>

          </thead>

          <tbody>

            {paginated.map((s) => (

              <tr key={s.ticker + s.date} className="border-t">

                <td className="px-3 py-2">{s.quadrant}</td>

                <td className="px-3 py-2 font-semibold">
                  {s.ticker}
                </td>

                <td className="px-3 py-2 text-muted-foreground">
                  {s.sector}
                </td>

                <td className="px-3 py-2">

                  {s.signal === "BUY" && "▲ BUY"}
                  {s.signal === "REENTRY" && "↻ REENTRY"}

                </td>

                <td className="px-3 py-2 text-muted-foreground">
                  {s.date}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {totalPages > 1 && (

        <div className="flex justify-between items-center text-sm">

          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-3 py-1 border rounded disabled:opacity-40"
          >
            Prev
          </button>

          <span>
            Page {page} / {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-3 py-1 border rounded disabled:opacity-40"
          >
            Next
          </button>

        </div>

      )}

    </div>
  )
}
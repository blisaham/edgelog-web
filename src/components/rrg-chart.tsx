"use client"

import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts"

type Point = {
  sector: string
  rs_ratio: number
  rs_mom: number
  date: string
}

type SectorData = {
  sector: string
  data: Point[]
}

/* KEEP YOUR COLOR SYSTEM */
const COLORS = [
  "#ef4444", "#22c55e", "#3b82f6", "#eab308",
  "#a855f7", "#f97316", "#06b6d4", "#84cc16",
  "#ec4899", "#14b8a6"
]

function getColor(index: number) {
  return COLORS[index % COLORS.length]
}

export default function RRGChart({ data }: { data: SectorData[] }) {

  if (!data || data.length === 0) {
    return <div>No RRG data</div>
  }

  return (
    <div className="w-full h-[460px] rounded-2xl border p-4">

      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            type="number"
            dataKey="rs_ratio"
            domain={["auto", "auto"]}
          />

          <YAxis
            type="number"
            dataKey="rs_mom"
            domain={["auto", "auto"]}
          />

          <ReferenceLine x={100} stroke="#888" />
          <ReferenceLine y={100} stroke="#888" />

          {/* ✅ Quadrant Labels */}
          <text x="20%" y="8%" fill="#3b82f6" fontSize={12}>Improving</text>
          <text x="75%" y="8%" fill="#22c55e" fontSize={12}>Leading</text>
          <text x="20%" y="95%" fill="#ef4444" fontSize={12}>Lagging</text>
          <text x="75%" y="95%" fill="#eab308" fontSize={12}>Weakening</text>

          <Tooltip
            formatter={(_, __, props: any) => {
              const p = props.payload
              return [`${p.rs_ratio.toFixed(2)}, ${p.rs_mom.toFixed(2)}`, p.sector]
            }}
          />

          {/* ✅ Sector Trails + Triangle Head */}
          {data.map((sector, i) => {

            const color = getColor(i)
            const last = sector.data[sector.data.length - 1]

            return (
              <g key={sector.sector}>

                {/* Tail */}
                <Scatter
                  data={sector.data}
                  line={{ stroke: color, strokeWidth: 2 }}
                  fill={color}
                  dataKey="rs_mom"
                />

                {/* Head (triangle) */}
                <Scatter
                  data={[last]}
                  fill={color}
                  shape="triangle"
                />

              </g>
            )
          })}

        </ScatterChart>
      </ResponsiveContainer>

      {/* ✅ Legend */}
      <div className="flex flex-wrap gap-3 mt-3 text-xs">
        {data.map((s, i) => (
          <div key={s.sector} className="flex items-center gap-1">
            <div
              className="w-3 h-3 rounded-full"
              style={{ background: getColor(i) }}
            />
            <span>{s.sector}</span>
          </div>
        ))}
      </div>

    </div>
  )
}
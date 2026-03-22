import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

type Quadrant = "Leading" | "Improving" | "Weakening" | "Lagging"

/* -------------------------------------------------------
   SECTOR RADAR (optimized)
------------------------------------------------------- */

export async function getSectorRadar() {

  // ✅ get latest date
  const { data: latestRow } = await supabase
    .from("sector_rotation")
    .select("date")
    .order("date", { ascending: false })
    .limit(1)
    .single()

  if (!latestRow) return []

  const latestDate = latestRow.date

  // ✅ fetch only latest sectors
  const { data: sectors } = await supabase
    .from("sector_rotation")
    .select("sector, quadrant")
    .eq("date", latestDate)

  // ✅ fetch signals (still simple for now)
  const { data: signals } = await supabase
    .from("signals")
    .select("ticker, sector, signal")

  if (!sectors) return []

  const order: Record<Quadrant, number> = {
    Leading: 1,
    Improving: 2,
    Weakening: 3,
    Lagging: 4
  }

  // ✅ O(n) grouping instead of filter loop
  const signalMap: Record<string, any[]> = {}

  signals?.forEach((s) => {
    if (!signalMap[s.sector]) {
      signalMap[s.sector] = []
    }
    signalMap[s.sector].push(s)
  })

  const result = sectors.map((sector: any) => ({
    ...sector,
    signals: signalMap[sector.sector] || []
  }))

  return result.sort((a: any, b: any) => {
    return (order[a.quadrant as Quadrant] ?? 99) -
           (order[b.quadrant as Quadrant] ?? 99)
  })
}

/* -------------------------------------------------------
   TOP SIGNALS (unchanged)
------------------------------------------------------- */

export async function getTopSignals(limit = 20) {

  const { data } = await supabase
    .from("signals")
    .select("ticker, sector, quadrant, signal, date")
    .order("date", { ascending: false })
    .limit(limit)

  return data ?? []

}
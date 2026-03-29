import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

type Quadrant = "Leading" | "Improving" | "Weakening" | "Lagging"

/* -------------------------------------------------------
   HELPER: GET LAST 4 DISTINCT SIGNAL DATES
------------------------------------------------------- */

async function getLast4SignalDates() {
  const { data } = await supabase
    .from("signals")
    .select("date")
    .order("date", { ascending: false })

  if (!data) return []

  const uniqueDates = [...new Set(data.map(d => d.date))]

  return uniqueDates.slice(0, 4)
}

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

  // ✅ fetch signals (LIMITED TO LAST 4 WEEKS)
  const dates = await getLast4SignalDates()

  const { data: signals } = await supabase
    .from("signals")
    .select("ticker, sector, signal")
    .in("date", dates)

  if (!sectors) return []

  const order: Record<Quadrant, number> = {
    Leading: 1,
    Improving: 2,
    Weakening: 3,
    Lagging: 4
  }

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
   TOP SIGNALS (LIMITED TO LAST 4 WEEKS)
------------------------------------------------------- */

export async function getTopSignals(limit = 20) {

  const dates = await getLast4SignalDates()
  if (dates.length === 0) return []

  const { data } = await supabase
    .from("signals")
    .select("ticker, sector, quadrant, signal, date")
    .in("date", dates)
    .order("date", { ascending: false })
    .limit(limit)

  return data ?? []

}
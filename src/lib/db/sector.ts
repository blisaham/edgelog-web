import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

type Quadrant = "Leading" | "Improving" | "Weakening" | "Lagging"

export async function getSectorRadar() {

  const { data: sectors } = await supabase
    .from("sector_rotation")
    .select("*")

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

  const result = sectors.map((sector: any) => ({
    ...sector,
    signals: signals?.filter(s => s.sector === sector.sector) || []
  }))

  return result.sort((a: any, b: any) => {
    const qa = a.quadrant as Quadrant
    const qb = b.quadrant as Quadrant

    return (order[qa] ?? 99) - (order[qb] ?? 99)
  })

}
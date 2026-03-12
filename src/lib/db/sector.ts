import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function getSectorRadar() {

  const { data: sectors } = await supabase
    .from("sector_rotation")
    .select("*")

  const { data: signals } = await supabase
    .from("signals")
    .select("ticker, sector, signal")

  if (!sectors) return []

  return sectors.map((sector) => ({
    ...sector,
    signals: signals?.filter(s => s.sector === sector.sector) || []
  }))

}
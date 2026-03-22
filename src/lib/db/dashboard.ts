import { supabase } from "@/lib/supabase"
import { cache } from "react"

export const getStatsDashboard = cache(async (limit = 20) => {

  const [tradesRes, settingsRes, signalsRes] = await Promise.all([

    supabase
      .from("trades")
      .select("classification"),

    supabase
      .from("settings")
      .select("starting_balance, last_balance, updated_at")
      .limit(1)
      .single(),

    supabase
      .from("signals")
      .select("ticker, sector, quadrant, signal, date")
      .order("date", { ascending: false })
      .limit(limit)

  ])

  return {
    trades: tradesRes.data || [],
    settings: settingsRes.data || null,
    signals: signalsRes.data || []
  }

})
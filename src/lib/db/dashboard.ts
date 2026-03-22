import { supabase } from "@/lib/supabase"

export async function getStatsDashboard(limit = 20) {

  // run in parallel (still 1 server request)
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
}
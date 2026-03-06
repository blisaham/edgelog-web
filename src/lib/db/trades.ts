import { supabase } from "@/lib/supabase"

export async function getAllTrades() {

  const { data, error } = await supabase
    .from("trades")
    .select("*")
    .order("opened_at", { ascending: false })

  if (error) {
    console.error(error)
    return []
  }

  return data || []
}

export async function createTrade(payload: {
  ticker: string
  edge: string
  open_chart_url: string
}) {

  const { error } = await supabase
    .from("trades")
    .insert([
      {
        ticker: payload.ticker,
        edge: payload.edge,
        open_chart_url: payload.open_chart_url
      }
    ])

  if (error) {
    console.error(error)
    throw error
  }
}

export async function deleteTrade(id: string) {

  const { error } = await supabase
    .from("trades")
    .delete()
    .eq("id", id)

  if (error) {
    console.error(error)
    throw error
  }
}
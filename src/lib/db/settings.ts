import { supabase } from "@/lib/supabase"

export async function getSettings() {

  const { data, error } = await supabase
    .from("settings")
    .select("*")
    .eq("id", "main")
    .single()

  if (error) {
    console.error(error)
    return null
  }

  return data
}

export async function saveBalance(starting: number, last: number) {

  const { error } = await supabase
    .from("settings")
    .upsert({
      id: "main",
      starting_balance: starting,
      last_balance: last
    })

  if (error) throw error
}

export async function saveGA(code: string) {

  const { error } = await supabase
    .from("settings")
    .upsert({
      id: "main",
      ga_code: code
    })

  if (error) throw error
}
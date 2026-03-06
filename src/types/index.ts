export type TradeClassification =
  | "good_profit"
  | "good_loss"
  | "bad_profit"
  | "bad_loss"

export interface Trade {
  id: string
  ticker: string
  edge: string
  open_chart_url: string
  close_chart_url: string | null
  classification: TradeClassification | null
  opened_at: string
  closed_at: string | null
}

export interface BlogPost {
  id: string
  title: string
  content: string
  created_at: string
}

export interface Settings {
  id: string
  starting_balance: number
  last_balance: number
  ga_code: string | null
  updated_at: string
}
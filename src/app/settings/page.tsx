"use client"

import { useEffect, useState } from "react"
import BackButton from "@/components/back-button"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { signOut } from "next-auth/react"

export default function SettingsPage() {

  const [startingBalance, setStartingBalance] = useState("")
  const [lastBalance, setLastBalance] = useState("")
  const [gaCode, setGaCode] = useState("")
  const [dialog, setDialog] = useState("")

  useEffect(() => {

    async function load() {

      const { data, error } = await supabase
        .from("settings")
        .select("*")
        .eq("id", "main")
        .single()

      if (error) {
        console.error("LOAD SETTINGS ERROR:", error)
        return
      }

      if (data) {
        setStartingBalance(String(data.starting_balance || ""))
        setLastBalance(String(data.last_balance || ""))
        setGaCode(data.ga_code || "")
      }

    }

    load()

  }, [])

  async function saveBalances() {

    const { data, error } = await supabase
      .from("settings")
      .upsert({
        id: "main",
        starting_balance: Number(startingBalance),
        last_balance: Number(lastBalance),
        updated_at: new Date().toISOString()
      })
      .select()

    if (error) {
      console.error("SAVE BALANCE ERROR:", error)
      alert("Failed to save balance")
      return
    }

    setDialog("Balances saved")

  }

  async function saveGA() {

    const { error } = await supabase
      .from("settings")
      .upsert({
        id: "main",
        ga_code: gaCode,
        updated_at: new Date().toISOString()
      })

    if (error) {
      console.error("SAVE GA ERROR:", error)
      alert("Failed to save analytics code")
      return
    }

    setDialog("Google Analytics code saved")

  }

  async function logout() {

    await signOut({
      callbackUrl: "/"
    })

  }

  function closeDialog() {
    setDialog("")
  }

  return (
    <div className="space-y-6">

      <BackButton />

      <div className="space-y-3">

        <h2 className="text-sm font-semibold">
          Balance
        </h2>

        <Input
          placeholder="Starting balance"
          value={startingBalance}
          onChange={(e) => setStartingBalance(e.target.value)}
        />

        <Input
          placeholder="Last balance"
          value={lastBalance}
          onChange={(e) => setLastBalance(e.target.value)}
        />

        <Button
          className="w-full"
          onClick={saveBalances}
        >
          Save Balance
        </Button>

      </div>

      <div className="space-y-3">

        <h2 className="text-sm font-semibold">
          Google Analytics
        </h2>

        <Input
          placeholder="GA Measurement ID"
          value={gaCode}
          onChange={(e) => setGaCode(e.target.value)}
        />

        <Button
          className="w-full"
          onClick={saveGA}
        >
          Save Analytics
        </Button>

      </div>

      <Button
        onClick={logout}
        className="w-full bg-red-600 text-white"
      >
        Logout
      </Button>

      {dialog && (

        <Dialog open={true}>

          <DialogContent>

            <div className="space-y-4 text-center">

              <p className="text-sm font-medium">
                {dialog}
              </p>

              <Button
                onClick={closeDialog}
                className="w-full"
              >
                OK
              </Button>

            </div>

          </DialogContent>

        </Dialog>

      )}

    </div>
  )
}
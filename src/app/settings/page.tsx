"use client"

import { useEffect, useState } from "react"
import BackButton from "@/components/back-button"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { signOut } from "next-auth/react"

import { getSettings, saveBalance, saveGA } from "@/lib/db/settings"

export default function SettingsPage() {

  const [startingBalance, setStartingBalance] = useState("")
  const [lastBalance, setLastBalance] = useState("")
  const [gaCode, setGaCode] = useState("")
  const [dialog, setDialog] = useState("")

  useEffect(() => {

    async function load() {

      const data = await getSettings()

      if (data) {
        setStartingBalance(String(data.starting_balance || ""))
        setLastBalance(String(data.last_balance || ""))
        setGaCode(data.ga_code || "")
      }

    }

    load()

  }, [])

  async function saveBalances() {

    await saveBalance(
      Number(startingBalance),
      Number(lastBalance)
    )

    setDialog("Balances saved")
  }

  async function saveAnalytics() {

    await saveGA(gaCode)

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

      {/* BALANCE */}

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

      {/* GOOGLE ANALYTICS */}

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
          onClick={saveAnalytics}
        >
          Save Analytics
        </Button>

      </div>

      {/* LOGOUT */}

      <Button
        onClick={logout}
        className="w-full bg-red-600 text-white"
      >
        Logout
      </Button>

      {/* SUCCESS DIALOG */}

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
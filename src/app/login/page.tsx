"use client"

import { signIn } from "next-auth/react"
import BackButton from "@/components/back-button"
import { Button } from "@/components/ui/button"

export default function LoginPage() {

  async function handleGoogle() {
    await signIn("google", { callbackUrl: "/" })
  }

  return (
    <div className="space-y-6">

      <BackButton />

      <h1 className="text-lg font-semibold text-center">
        Login
      </h1>

      <div className="flex justify-center">

        <Button
          onClick={handleGoogle}
          className="w-full max-w-xs"
        >
          Sign in with Google
        </Button>

      </div>

    </div>
  )
}
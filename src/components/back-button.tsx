"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"

export default function BackButton() {
  const router = useRouter()

  return (
    <button
      onClick={() => router.back()}
      className="flex items-center gap-2 text-sm text-gray-600 mb-3"
    >
      <ArrowLeft className="w-4 h-4" />
      Back
    </button>
  )
}
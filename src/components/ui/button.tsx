"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary"
}

export function Button({
  className,
  variant = "default",
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors px-4 py-2"

  const styles =
    variant === "secondary"
      ? "bg-gray-100 text-black hover:bg-gray-200"
      : "bg-black text-white hover:bg-black/80"

  return (
    <button className={cn(base, styles, className)} {...props} />
  )
}
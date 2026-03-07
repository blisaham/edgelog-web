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
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none disabled:opacity-50 disabled:pointer-events-none px-4 py-2 text-[20px] md:text-sm"

  const variants = {
    default: "bg-black text-white hover:bg-gray-800",
    secondary: "border border-gray-300 hover:bg-gray-100"
  }

  return (
    <button
      className={cn(base, variants[variant], className)}
      {...props}
    />
  )
}
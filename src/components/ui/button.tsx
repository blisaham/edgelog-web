import * as React from "react"
import { cn } from "@/lib/utils"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary"
}

export function Button({
  className,
  variant = "default",
  ...props
}: ButtonProps) {

  const base =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"

  const variants = {
    default:
      "bg-black text-white hover:bg-gray-800",
    secondary:
      "bg-gray-200 text-black hover:bg-gray-300"
  }

  return (
    <button
      className={cn(
        base,
        variants[variant],
        "px-4 py-2 text-lg md:text-sm",
        className
      )}
      {...props}
    />
  )
}
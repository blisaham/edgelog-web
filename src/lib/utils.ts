import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Utility used by shadcn/ui components
 * to merge Tailwind classes safely
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Calculate portfolio growth percentage
 * Used by Home page and Stats page
 */
export function calculateGrowth(
  startingBalance: number,
  lastBalance: number
) {

  const start = startingBalance || 0
  const last = lastBalance || 0

  if (start <= 0) {
    return 0
  }

  const growth = ((last - start) / start) * 100

  return Number(growth.toFixed(2))
}
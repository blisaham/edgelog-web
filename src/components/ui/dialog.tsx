"use client"

import * as React from "react"

export function Dialog({
  children
}: {
  children: React.ReactNode
}) {
  return <div>{children}</div>
}

export function DialogContent({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm">
        {children}
      </div>
    </div>
  )
}
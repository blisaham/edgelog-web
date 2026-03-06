"use client"

import { useState } from "react"

export function Accordion({ children }: { children: React.ReactNode }) {
  return <div className="space-y-2">{children}</div>
}

export function AccordionItem({ children }: { children: React.ReactNode }) {
  return <div className="border rounded-md">{children}</div>
}

export function AccordionTrigger({
  title,
  children
}: {
  title: string
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(false)

  return (
    <div>

      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-3 py-2 font-medium flex justify-between"
      >
        {title}
        <span>{open ? "-" : "+"}</span>
      </button>

      {open && (
        <div className="px-3 pb-3 text-sm">
          {children}
        </div>
      )}

    </div>
  )
}

export function AccordionContent({
  children
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
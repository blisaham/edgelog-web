"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"

export interface DialogProps extends React.ComponentProps<typeof DialogPrimitive.Root> {}

export function Dialog({ children, ...props }: DialogProps) {
  return (
    <DialogPrimitive.Root {...props}>
      {children}
    </DialogPrimitive.Root>
  )
}

export const DialogTrigger = DialogPrimitive.Trigger

export function DialogContent({
  children,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content>) {

  return (
    <DialogPrimitive.Portal>

      <DialogPrimitive.Overlay className="fixed inset-0 bg-black/40" />

      <DialogPrimitive.Content
        {...props}
        className="fixed left-1/2 top-1/2 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-4 shadow-lg"
      >
        {children}
      </DialogPrimitive.Content>

    </DialogPrimitive.Portal>
  )
}

export const DialogClose = DialogPrimitive.Close
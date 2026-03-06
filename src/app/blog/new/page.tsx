"use client"

import { useState } from "react"
import BackButton from "@/components/back-button"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent
} from "@/components/ui/dialog"

export default function NewBlogPage() {

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [open, setOpen] = useState(false)

  async function save() {

    if (!title || !content) return

    await supabase
      .from("blogposts")
      .insert([
        {
          title,
          content
        }
      ])

    setOpen(true)
  }

  function closeDialog() {

    setOpen(false)

    window.location.href = "/"
  }

  return (
    <div className="space-y-6">

      <BackButton />

      <div className="space-y-4">

        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <Textarea
          placeholder="Write your note"
          rows={8}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <Button
          onClick={save}
          className="w-full"
        >
          Save Blog
        </Button>

      </div>

      {open && (

        <Dialog open={open}>

          <DialogContent>

            <div className="space-y-4 text-center">

              <p className="text-sm font-medium">
                Blog saved
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
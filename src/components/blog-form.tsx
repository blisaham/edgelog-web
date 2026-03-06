"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import { createBlogPost } from "@/lib/db/blog"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import {
  AlertDialog,
  AlertDialogContent
} from "@/components/ui/alert-dialog"

export default function BlogForm() {

  const router = useRouter()

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  const [savedDialog, setSavedDialog] = useState(false)

  async function handleSave() {

    if (!title) return

    await createBlogPost({
      title,
      content
    })

    setSavedDialog(true)

  }

  function closeDialog() {

    setSavedDialog(false)
    router.push("/")

  }

  return (

    <div className="space-y-4">

      <Input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <Textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <Button
        onClick={handleSave}
        className="w-full"
      >
        Save
      </Button>

      <AlertDialog open={savedDialog}>

        <AlertDialogContent>

          <div className="text-lg font-semibold">
            Blog saved
          </div>

          <div className="flex justify-end mt-4">

            <Button onClick={closeDialog}>
              OK
            </Button>

          </div>

        </AlertDialogContent>

      </AlertDialog>

    </div>

  )
}
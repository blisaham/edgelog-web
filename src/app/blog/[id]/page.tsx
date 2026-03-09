"use client"

import { useEffect, useState } from "react"
import BackButton from "@/components/back-button"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useSession } from "next-auth/react"
import { Dialog, DialogContent } from "@/components/ui/dialog"

export default function BlogDetailPage({ params }: any) {

  const { data: session } = useSession()

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [deleteDialog, setDeleteDialog] = useState(false)
  const [saving, setSaving] = useState(false)
  const [savedNotice, setSavedNotice] = useState(false)

  useEffect(() => {

    async function load() {

      const id = params?.id

      if (!id) {
        console.error("Missing blog id")
        return
      }

      const { data, error } = await supabase
        .from("blogposts")
        .select("*")
        .eq("id", id)
        .single()

      if (error) {
        console.error(error)
        return
      }

      if (data) {
        setTitle(data.title)
        setContent(data.content)
      }

    }

    load()

  }, [params])

  function insertMarkdown(before: string, after: string = "") {

    const textarea = document.getElementById("blog-editor") as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd

    const selected = content.substring(start, end)

    const newText =
      content.substring(0, start) +
      before +
      selected +
      after +
      content.substring(end)

    setContent(newText)

    setTimeout(() => {
      textarea.focus()
      textarea.selectionStart = start + before.length
      textarea.selectionEnd = end + before.length
    }, 0)

  }

  function autoResize(e: React.ChangeEvent<HTMLTextAreaElement>) {

    const el = e.target
    el.style.height = "auto"
    el.style.height = el.scrollHeight + "px"

    setContent(el.value)

  }

  async function remove() {

    const id = params?.id

    if (!id) {
      console.error("Missing blog id")
      return
    }

    const { error } = await supabase
      .from("blogposts")
      .delete()
      .eq("id", id)

    if (error) {
      console.error(error)
      return
    }

    window.location.href = "/"

  }

  async function save() {

    const id = params?.id

    if (!id) {
      console.error("Missing blog id")
      return
    }

    setSaving(true)

    const { error } = await supabase
      .from("blogposts")
      .update({
        title,
        content
      })
      .eq("id", id)

    setSaving(false)

    if (error) {
      console.error(error)
      return
    }

    setSavedNotice(true)

    setTimeout(() => {
      setSavedNotice(false)
    }, 2000)

  }

  return (
    <div className="space-y-6">

      <BackButton />

      {session ? (

        <div className="space-y-4">

          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <div className="flex flex-wrap gap-2">

            <Button type="button" variant="secondary" onClick={() => insertMarkdown("# ")}>
              H1
            </Button>

            <Button type="button" variant="secondary" onClick={() => insertMarkdown("## ")}>
              H2
            </Button>

            <Button type="button" variant="secondary" onClick={() => insertMarkdown("**", "**")}>
              Bold
            </Button>

            <Button type="button" variant="secondary" onClick={() => insertMarkdown("*", "*")}>
              Italic
            </Button>

            <Button type="button" variant="secondary" onClick={() => insertMarkdown("- ")}>
              • List
            </Button>

            <Button type="button" variant="secondary" onClick={() => insertMarkdown("1. ")}>
              1. List
            </Button>

          </div>

          <Textarea
            id="blog-editor"
            rows={8}
            value={content}
            onChange={autoResize}
          />

          <div className="flex gap-3 items-center">

            <Button
              onClick={save}
              disabled={saving}
            >
              {saving ? "Saving..." : "Save"}
            </Button>

            {savedNotice && (
              <span className="text-sm text-green-600">
                Saved
              </span>
            )}

            <Button
              onClick={() => setDeleteDialog(true)}
              className="bg-red-600 text-white"
            >
              Delete
            </Button>

          </div>

        </div>

      ) : (

        <div className="space-y-3">

          <h1 className="text-lg font-semibold">
            {title}
          </h1>

          <p className="text-sm whitespace-pre-wrap">
            {content}
          </p>

        </div>

      )}

      {deleteDialog && (

        <Dialog open={deleteDialog}>

          <DialogContent>

            <div className="space-y-4 text-center">

              <p className="text-sm font-medium">
                Delete this blog?
              </p>

              <div className="flex gap-2">

                <Button
                  className="w-full"
                  onClick={() => setDeleteDialog(false)}
                >
                  Cancel
                </Button>

                <Button
                  className="w-full bg-red-600 text-white"
                  onClick={remove}
                >
                  Delete
                </Button>

              </div>

            </div>

          </DialogContent>

        </Dialog>

      )}

    </div>
  )
}
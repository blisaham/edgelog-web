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
        alert("Failed to load blog post")
        return
      }

      if (data) {
        setTitle(data.title)
        setContent(data.content)
      }

    }

    load()

  }, [params])

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
      alert("Failed to delete blog")
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
      alert("Failed to save blog")
      return
    }

    alert("Blog saved")

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

          <Textarea
            rows={8}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <div className="flex gap-3">

            <Button
              onClick={save}
              disabled={saving}
            >
              {saving ? "Saving..." : "Save"}
            </Button>

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
"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

interface Props {
  onSubmit: (data: {
    title: string
    content: string
  }) => Promise<void>
}

export default function BlogForm({ onSubmit }: Props) {

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [saving, setSaving] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    try {
      setSaving(true)

      await onSubmit({
        title,
        content
      })

      alert("Blog saved")

      setTitle("")
      setContent("")
    } catch {
      alert("Failed to save blog")
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      <Input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <Textarea
        placeholder="Content"
        rows={8}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <div className="flex gap-3">

        <Button type="submit" disabled={saving}>
          {saving ? "Saving..." : "Save"}
        </Button>

        <Button type="reset" variant="secondary">
          Reset
        </Button>

      </div>

    </form>
  )
}
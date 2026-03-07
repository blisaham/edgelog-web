"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { createBlogPost } from "@/lib/db/blog"

export default function BlogForm() {

  const router = useRouter()

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [saving, setSaving] = useState(false)

  async function handleSubmit(e: React.FormEvent) {

    e.preventDefault()

    if (!title || !content) {
      alert("Please fill all fields")
      return
    }

    setSaving(true)

    await createBlogPost({
      title,
      content
    })

    router.push("/")

  }

  return (

    <form onSubmit={handleSubmit} className="space-y-3">

      <div>
        <label className="text-[16px] md:text-sm block mb-1">
          Title
        </label>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded-md px-3 py-2 text-[20px] md:text-sm"
        />

      </div>

      <div>
        <label className="text-[16px] md:text-sm block mb-1">
          Content
        </label>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={6}
          className="w-full border rounded-md px-3 py-2 text-[20px] md:text-sm resize-none"
        />

      </div>

      <Button type="submit" disabled={saving}>
        {saving ? "Saving..." : "Save"}
      </Button>

    </form>

  )
}
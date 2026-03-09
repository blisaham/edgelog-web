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

        <div className="flex flex-wrap gap-2 mb-2">

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

        <textarea
          id="blog-editor"
          value={content}
          onChange={autoResize}
          rows={6}
          className="w-full border rounded-md px-3 py-2 text-[20px] md:text-sm overflow-hidden"
        />

      </div>

      <Button type="submit" disabled={saving}>
        {saving ? "Saving..." : "Save"}
      </Button>

    </form>

  )
}
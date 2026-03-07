"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function BlogForm() {

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  return (

    <div className="space-y-3">

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
          className="w-full border rounded-md px-3 py-2 text-[20px] md:text-sm"
          rows={4}
        />
      </div>

      <Button>
        Save
      </Button>

    </div>

  )
}
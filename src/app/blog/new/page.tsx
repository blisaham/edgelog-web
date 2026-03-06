"use client"

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import Link from "next/link"

import BlogForm from "@/components/blog-form"
import { Button } from "@/components/ui/button"

export default function NewBlogPage() {

  const { data: session, status } = useSession()

  if (status === "loading") return null

  if (!session) {
    redirect("/login")
  }

  return (

    <div className="space-y-4">

      <Link href="/">
        <Button variant="outline">
          ← Back
        </Button>
      </Link>

      <BlogForm />

    </div>

  )
}
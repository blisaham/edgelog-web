import { supabase } from "@/lib/supabase"

export async function getBlogPosts() {

  const { data, error } = await supabase
    .from("blogposts")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error(error)
    return []
  }

  return data || []
}

export async function getBlogPost(id: string) {

  const { data, error } = await supabase
    .from("blogposts")
    .select("*")
    .eq("id", id)
    .single()

  if (error) {
    console.error(error)
    return null
  }

  return data
}

export async function createBlogPost(payload: {
  title: string
  content: string
}) {

  const { error } = await supabase
    .from("blogposts")
    .insert([
      {
        title: payload.title,
        content: payload.content
      }
    ])

  if (error) {
    console.error(error)
    throw error
  }
}
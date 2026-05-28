"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { addBlog, likeBlog } from "../services/blogs"

export type BlogFormState = {
  errors?: {
    title?: string[]
    author?: string[]
    url?: string[]
  }
}

export const createBlog = async (
  _prevState: BlogFormState,
  formData: FormData
): Promise<BlogFormState> => {
  const title = formData.get("title") as string
  const author = formData.get("author") as string
  const url = formData.get("url") as string
  const userId = formData.get("userId")
    ? Number(formData.get("userId"))
    : undefined

  const errors: BlogFormState["errors"] = {}

  // Validation
  if (!title || title.length < 5) {
    errors.title = ["Title is required and must be at least 5 characters"]
  }
  if (!author || author.length < 5) {
    errors.author = ["Author is required and must be at least 5 characters"]
  }
  if (!url || url.length < 5) {
    errors.url = ["URL is required and must be at least 5 characters"]
  }

  if (Object.keys(errors).length > 0) {
    return { errors }
  }

  await addBlog(title, author, url, userId)

  revalidatePath("/blogs")
  redirect("/blogs")
}

export const likeBlogPost = async (formData: FormData) => {
  const id = Number(formData.get("id"))
  await likeBlog(id)
  revalidatePath(`/blogs/${id}`)
  revalidatePath("/blogs")
}

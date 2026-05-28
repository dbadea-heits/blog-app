"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { addBlog, likeBlog } from "../services/blogs"
import { getCurrentUser } from "@/app/services/session"
import {
  addBlogToReadingList,
} from "@/app/services/reading-list"

export type BlogFormState = {
  errors?: {
    title?: string
    author?: string
    url?: string
  }
  success?: boolean
  values?: {
    title: string
    author: string
    url: string
  }
}

export const createBlog = async (
  prevState: BlogFormState,
  formData: FormData
): Promise<BlogFormState> => {
  const currentUser = await getCurrentUser()
  if (!currentUser) {
    redirect("/login")
  }

  const title = (formData.get("title") as string)?.trim()
  const author = (formData.get("author") as string)?.trim()
  const url = (formData.get("url") as string)?.trim()
  const userId = formData.get("userId")
    ? Number(formData.get("userId"))
    : undefined

  const errors: BlogFormState["errors"] = {}

  // Validation
  if (!title || title.length < 5) {
    errors.title = "Title is required and must be at least 5 characters"
  }
  if (!author || author.length < 5) {
    errors.author = "Author is required and must be at least 5 characters"
  }
  if (!url || url.length < 5) {
    errors.url = "URL is required and must be at least 5 characters"
  }

  if (Object.keys(errors).length > 0) {
    return {
      errors,
      success: false,
      values: { title, author, url },
    }
  }

  const blog = await addBlog(title, author, url, userId)

  if (blog) {
    await addBlogToReadingList(currentUser.id, blog.id)
  }

  revalidatePath("/blogs")
  revalidatePath("/me")
  redirect("/blogs")
}

export const likeBlogPost = async (formData: FormData) => {
  const id = Number(formData.get("id"))
  await likeBlog(id)
  revalidatePath(`/blogs/${id}`)
  revalidatePath("/blogs")
}

export const addBlogToReadingListPost = async (formData: FormData) => {
  const blogId = Number(formData.get("blogId"))
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    redirect("/login")
  }

  await addBlogToReadingList(currentUser.id, blogId)

  revalidatePath(`/blogs/${blogId}`)
  revalidatePath("/me")
}

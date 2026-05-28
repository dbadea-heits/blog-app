import { eq } from "drizzle-orm"
import { db } from "../../db"
import { blogs } from "../../db/schema"

export const getBlogs = async () => {
  return db.select().from(blogs)
}

export const getBlogById = async (id: number) => {
  const result = await db.select().from(blogs).where(eq(blogs.id, id))
  return result[0]
}

export const addBlog = async (title: string, author: string, url: string) => {
  await db.insert(blogs).values({ title, author, url, likes: 0 })
}

export const likeBlog = async (id: number) => {
  const blog = await getBlogById(id)
  if (blog) {
    await db
      .update(blogs)
      .set({ likes: blog.likes + 1 })
      .where(eq(blogs.id, id))
  }
}

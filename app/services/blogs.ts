import { eq } from "drizzle-orm"
import { db } from "../../db"
import { blogs, users } from "../../db/schema"

export const getBlogs = async () => {
  return db
    .select({
      id: blogs.id,
      title: blogs.title,
      author: blogs.author,
      url: blogs.url,
      likes: blogs.likes,
      userId: blogs.userId,
      userName: users.name,
      username: users.username,
    })
    .from(blogs)
    .leftJoin(users, eq(blogs.userId, users.id))
}

export const getBlogById = async (id: number) => {
  const result = await db
    .select({
      id: blogs.id,
      title: blogs.title,
      author: blogs.author,
      url: blogs.url,
      likes: blogs.likes,
      userId: blogs.userId,
      userName: users.name,
      username: users.username,
    })
    .from(blogs)
    .leftJoin(users, eq(blogs.userId, users.id))
    .where(eq(blogs.id, id))
  return result[0]
}

export const addBlog = async (
  title: string,
  author: string,
  url: string,
  userId?: number
) => {
  await db.insert(blogs).values({ title, author, url, likes: 0, userId })
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

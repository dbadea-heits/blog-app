import { and, desc, eq } from "drizzle-orm"
import { db } from "@/db"
import { blogs, readingList, users } from "@/db/schema"

export const addBlogToReadingList = async (userId: number, blogId: number) => {
  await db
    .insert(readingList)
    .values({ userId, blogId })
    .onConflictDoNothing()
}

export const isBlogInReadingList = async (userId: number, blogId: number) => {
  const result = await db
    .select({ id: readingList.id })
    .from(readingList)
    .where(and(eq(readingList.userId, userId), eq(readingList.blogId, blogId)))
    .limit(1)

  return result.length > 0
}

export const getReadingListForUser = async (userId: number) => {
  return db
    .select({
      id: readingList.id,
      read: readingList.read,
      blogId: blogs.id,
      title: blogs.title,
      author: blogs.author,
      url: blogs.url,
      likes: blogs.likes,
      blogUserId: blogs.userId,
      userName: users.name,
      username: users.username,
    })
    .from(readingList)
    .innerJoin(blogs, eq(readingList.blogId, blogs.id))
    .leftJoin(users, eq(blogs.userId, users.id))
    .where(eq(readingList.userId, userId))
    .orderBy(desc(readingList.id))
}

export const markReadingListEntryAsRead = async (entryId: number) => {
  await db.update(readingList).set({ read: true }).where(eq(readingList.id, entryId))
}
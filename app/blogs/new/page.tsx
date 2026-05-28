import { db } from "@/db"
import { users } from "@/db/schema"
import { BlogForm } from "./form"

export default async function NewBlog() {
  const allUsers = await db.select().from(users)

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h2 className="text-2xl font-bold mb-6">Create a new blog</h2>
      <BlogForm users={allUsers} />
    </div>
  )
}

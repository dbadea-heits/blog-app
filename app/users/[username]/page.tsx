import Link from "next/link"
import { notFound } from "next/navigation"
import { db } from "@/db"
import { users } from "@/db/schema"

export default async function UserPage({
  params,
}: {
  params: Promise<{ username: string }>
}) {
  const { username } = await params

  const user = await db.query.users.findFirst({
    where: (u, { eq }) => eq(u.username, username),
    with: {
      blogs: true,
    },
  })

  if (!user) {
    notFound()
  }

  return (
    <div className="container mx-auto p-4">
      <Link
        href="/users"
        className="text-blue-600 hover:underline mb-4 inline-block"
      >
        ← Back to users
      </Link>
      <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
      <p className="text-gray-600 mb-6">@{user.username}</p>

      <h2 className="text-2xl font-bold mb-4">Blogs ({user.blogs.length})</h2>
      {user.blogs.length === 0 ? (
        <p className="text-gray-500">No blogs yet</p>
      ) : (
        <ul className="space-y-4">
          {user.blogs.map((blog) => (
            <li key={blog.id} className="border p-4 rounded">
              <Link
                href={`/blogs/${blog.id}`}
                className="text-xl font-semibold text-blue-600 hover:underline"
              >
                {blog.title}
              </Link>
              <p className="text-gray-600">{blog.url}</p>
              <p className="text-sm text-gray-500">Likes: {blog.likes}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

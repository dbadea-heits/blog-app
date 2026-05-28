import { NextRequest, NextResponse } from "next/server"
import { eq } from "drizzle-orm"
import { db } from "@/db"
import { users } from "@/db/schema"

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization")
  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.slice(7)
    : null

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const user = await db.query.users.findFirst({
    where: eq(users.token, token),
    columns: {
      id: true,
      username: true,
      name: true,
    },
    with: {
      blogs: {
        columns: {
          id: true,
          title: true,
          author: true,
          url: true,
          likes: true,
        },
      },
      readingList: {
        columns: {
          id: true,
          read: true,
        },
        with: {
          blog: {
            columns: {
              id: true,
              title: true,
              author: true,
              url: true,
              likes: true,
            },
          },
        },
      },
    },
  })

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  return NextResponse.json({
    id: user.id,
    username: user.username,
    name: user.name,
    blogs: user.blogs,
    readingList: user.readingList.map((entry) => ({
      id: entry.id,
      read: entry.read,
      blog: entry.blog,
    })),
  })
}

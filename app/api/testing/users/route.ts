import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { db } from "@/db"
import { users } from "@/db/schema"

type CreateTestUserBody = {
  username?: string
  name?: string
  password?: string
}

export async function POST(request: NextRequest) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "This endpoint is not available in production" },
      { status: 403 }
    )
  }

  const body = (await request.json()) as CreateTestUserBody

  if (!body.username || !body.name || !body.password) {
    return NextResponse.json(
      { error: "username, name and password are required" },
      { status: 400 }
    )
  }

  const passwordHash = await bcrypt.hash(body.password, 10)

  const [user] = await db
    .insert(users)
    .values({
      username: body.username,
      name: body.name,
      passwordHash,
    })
    .returning({
      id: users.id,
      username: users.username,
      name: users.name,
    })

  return NextResponse.json(user, { status: 201 })
}
"use server"

import { redirect } from "next/navigation"
import bcrypt from "bcryptjs"
import { db } from "@/db"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"

export async function registerUser(formData: FormData) {
  const username = formData.get("username") as string
  const name = formData.get("name") as string
  const password = formData.get("password") as string

  // Validate input
  if (!username || !name || !password) {
    throw new Error("All fields are required")
  }

  if (username.length < 3) {
    throw new Error("Username must be at least 3 characters long")
  }

  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters long")
  }

  // Check if username already exists
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.username, username))

  if (existingUser.length > 0) {
    throw new Error("Username already exists")
  }

  // Hash password
  const passwordHash = await bcrypt.hash(password, 10)

  // Insert user
  await db.insert(users).values({
    username,
    name,
    passwordHash,
  })

  redirect("/login")
}

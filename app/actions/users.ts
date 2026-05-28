"use server"

import bcrypt from "bcryptjs"
import { db } from "@/db"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"
import { getCurrentUser } from "@/app/services/session"
import { revalidatePath } from "next/cache"

export type RegisterFormState = {
  errors?: {
    username?: string
    name?: string
    password?: string
    passwordConfirm?: string
  }
  success?: boolean
  values?: {
    username: string
    name: string
  }
}

export async function registerUser(
  prevState: RegisterFormState,
  formData: FormData
): Promise<RegisterFormState> {
  const username = (formData.get("username") as string)?.trim()
  const name = (formData.get("name") as string)?.trim()
  const password = (formData.get("password") as string)?.trim()
  const passwordConfirm = (formData.get("passwordConfirm") as string)?.trim()

  const errors: RegisterFormState["errors"] = {}

  // Validate input
  if (!username || username.length < 4) {
    errors.username = "Username is required and must be at least 4 characters"
  }

  if (!name) {
    errors.name = "Name is required"
  }

  if (!password || password.length < 4) {
    errors.password = "Password is required and must be at least 4 characters"
  }

  if (!passwordConfirm) {
    errors.passwordConfirm = "Password confirmation is required"
  } else if (password && passwordConfirm !== password) {
    errors.passwordConfirm = "Passwords do not match"
  }

  // Check if username already exists (only if username is valid)
  if (username && username.length >= 4) {
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.username, username))

    if (existingUser.length > 0) {
      errors.username = "Username already exists"
    }
  }

  if (Object.keys(errors).length > 0) {
    return {
      errors,
      success: false,
      values: { username, name },
    }
  }

  // Hash password
  const passwordHash = await bcrypt.hash(password, 10)

  // Insert user
  await db.insert(users).values({
    username,
    name,
    passwordHash,
  })

  return { success: true }
}

export async function generateToken() {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error("Unauthorized")
  }

  const token = crypto.randomUUID()

  await db.update(users).set({ token }).where(eq(users.id, user.id))

  revalidatePath("/me")
}

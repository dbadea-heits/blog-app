"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { getCurrentUser } from "@/app/services/session"
import { markReadingListEntryAsRead } from "@/app/services/reading-list"

export const markAsRead = async (formData: FormData) => {
  const currentUser = await getCurrentUser()
  if (!currentUser) {
    redirect("/login")
  }

  const entryId = Number(formData.get("entryId"))

  await markReadingListEntryAsRead(entryId)

  revalidatePath("/me")
}
import Link from "next/link"
import { db } from "@/db"
import { users } from "@/db/schema"

export default async function UsersPage() {
  const allUsers = await db.select().from(users)

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Users</h1>
      <ul className="space-y-2">
        {allUsers.map((user) => (
          <li key={user.id}>
            <Link
              href={`/users/${user.username}`}
              className="text-blue-600 hover:underline"
            >
              {user.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

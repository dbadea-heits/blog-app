"use client"

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"

export function Nav() {
  const { data: session } = useSession()

  return (
    <nav className="bg-gray-100 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="space-x-4">
          <Link href="/" className="hover:underline">
            home
          </Link>
          {" | "}
          <Link href="/blogs" className="hover:underline">
            blogs
          </Link>
          {" | "}
          <Link href="/users" className="hover:underline">
            users
          </Link>
          {session && (
            <>
              {" | "}
              <Link href="/blogs/new" className="hover:underline">
                create new
              </Link>
            </>
          )}
        </div>
        <div>
          {session ? (
            <div className="flex items-center gap-4">
              <span>Welcome, {session.user?.name}</span>
              <button
                onClick={() => signOut({ redirectTo: "/" })}
                className="text-blue-600 hover:underline"
              >
                logout
              </button>
            </div>
          ) : (
            <div className="space-x-4">
              <Link href="/login" className="text-blue-600 hover:underline">
                login
              </Link>
              {" | "}
              <Link href="/register" className="text-blue-600 hover:underline">
                register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

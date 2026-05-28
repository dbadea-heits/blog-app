"use client"

import { signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import { FormEvent, useState, Suspense } from "react"

function LoginFormContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [error, setError] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)

  const callbackUrl = searchParams?.get("callbackUrl") || "/"

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const formData = new FormData(e.currentTarget)
    const username = formData.get("username") as string
    const password = formData.get("password") as string

    const result = await signIn("credentials", {
      username,
      password,
      redirect: false,
    })

    setIsLoading(false)

    if (result?.error) {
      setError("Invalid username or password")
    } else if (result?.ok) {
      router.push(callbackUrl)
    }
  }

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-3xl font-bold mb-6">Login</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block font-medium mb-2">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            required
            className="w-full border px-3 py-2 rounded"
            disabled={isLoading}
          />
        </div>

        <div>
          <label htmlFor="password" className="block font-medium mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            className="w-full border px-3 py-2 rounded"
            disabled={isLoading}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 rounded font-medium hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="mt-4 text-sm text-gray-600">
        Demo credentials: username <code>author</code>, password{" "}
        <code>password</code>
      </p>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginFormContent />
    </Suspense>
  )
}

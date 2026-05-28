"use client"

import Link from "next/link"
import { registerUser } from "@/app/actions/auth"
import { FormEvent, useState } from "react"

export default function RegisterPage() {
  const [error, setError] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const formData = new FormData(e.currentTarget)

    try {
      await registerUser(formData)
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An error occurred during registration"
      )
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-3xl font-bold mb-6">Register</h1>

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
            minLength={3}
            className="w-full border px-3 py-2 rounded"
            disabled={isLoading}
            placeholder="At least 3 characters"
          />
        </div>

        <div>
          <label htmlFor="name" className="block font-medium mb-2">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
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
            minLength={6}
            className="w-full border px-3 py-2 rounded"
            disabled={isLoading}
            placeholder="At least 6 characters"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 rounded font-medium hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? "Registering..." : "Register"}
        </button>
      </form>

      <p className="mt-6 text-center">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-600 hover:underline">
          Login here
        </Link>
      </p>
    </div>
  )
}

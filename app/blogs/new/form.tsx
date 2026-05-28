"use client"

import { useActionState } from "react"
import { createBlog } from "../../actions/blogs"

interface User {
  id: number
  name: string
}

export function BlogForm({ users }: { users: User[] }) {
  const [state, formAction, isPending] = useActionState(createBlog, {})

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="title" className="block font-medium mb-2">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          required
          minLength={5}
          className={`w-full border px-3 py-2 rounded ${
            state.errors?.title ? "border-red-500" : ""
          }`}
          disabled={isPending}
        />
        {state.errors?.title && (
          <p className="text-red-600 text-sm mt-1">{state.errors.title[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="author" className="block font-medium mb-2">
          Author
        </label>
        <input
          type="text"
          id="author"
          name="author"
          required
          minLength={5}
          className={`w-full border px-3 py-2 rounded ${
            state.errors?.author ? "border-red-500" : ""
          }`}
          disabled={isPending}
        />
        {state.errors?.author && (
          <p className="text-red-600 text-sm mt-1">{state.errors.author[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="url" className="block font-medium mb-2">
          URL
        </label>
        <input
          type="text"
          id="url"
          name="url"
          required
          minLength={5}
          className={`w-full border px-3 py-2 rounded ${
            state.errors?.url ? "border-red-500" : ""
          }`}
          disabled={isPending}
        />
        {state.errors?.url && (
          <p className="text-red-600 text-sm mt-1">{state.errors.url[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="userId" className="block font-medium mb-2">
          User (optional)
        </label>
        <select
          id="userId"
          name="userId"
          className="w-full border px-3 py-2 rounded"
          disabled={isPending}
        >
          <option value="">Select a user</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-blue-600 text-white py-2 rounded font-medium hover:bg-blue-700 disabled:opacity-50"
      >
        {isPending ? "Creating..." : "Create"}
      </button>
    </form>
  )
}

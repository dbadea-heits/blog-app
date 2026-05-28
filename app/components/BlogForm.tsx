"use client"

import { useActionState } from "react"
import { createBlog } from "@/app/actions/blogs"

interface User {
  id: number
  name: string
}

const fieldClass =
  "grid grid-cols-[3rem_1fr] grid-rows-[auto_auto_auto] items-baseline gap-x-5 gap-y-[0.6rem] border-b border-hairline pb-7 transition-colors duration-[400ms] ease-[var(--ease-base)] focus-within:border-copper max-[640px]:grid-cols-[2rem_1fr] max-[640px]:gap-x-3"

const fieldNumClass =
  "col-start-1 row-start-1 self-center font-sans text-[0.7rem] font-medium tracking-[0.18em] tabular-nums text-copper"

const labelClass =
  "col-start-2 row-start-1 flex items-baseline gap-3 font-serif text-[1.05rem] font-medium italic text-cream"

const inputClass =
  "col-start-2 row-start-2 w-full border-none bg-transparent py-2 font-serif text-[1.35rem] font-medium tracking-[-0.005em] text-cream outline-none placeholder:font-normal placeholder:italic placeholder:text-warm-soft disabled:opacity-50 max-[640px]:text-[1.15rem]"

const errorClass =
  "animate-rise col-start-2 row-start-3 font-serif text-[0.9rem] italic text-crimson"

export function BlogForm({ users }: { users: User[] }) {
  const [state, formAction, isPending] = useActionState(createBlog, {})

  return (
    <form
      action={formAction}
      noValidate
      className="animate-rise flex flex-col gap-10 [animation-delay:350ms]"
    >
      <div className={fieldClass}>
        <span className={fieldNumClass}>01</span>
        <label htmlFor="title" className={labelClass}>
          The title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          aria-label="Title"
          required
          minLength={5}
          placeholder="The piece you would like to add"
          className={`${inputClass} ${state.errors?.title ? "text-crimson" : ""}`}
          disabled={isPending}
        />
        {state.errors?.title && (
          <p data-testid="title-error" className={errorClass}>
            — {state.errors.title[0]}
          </p>
        )}
      </div>

      <div className={fieldClass}>
        <span className={fieldNumClass}>02</span>
        <label htmlFor="author" className={labelClass}>
          The author
        </label>
        <input
          type="text"
          id="author"
          name="author"
          aria-label="Author"
          required
          minLength={5}
          placeholder="Whose words are these"
          className={`${inputClass} ${state.errors?.author ? "text-crimson" : ""}`}
          disabled={isPending}
        />
        {state.errors?.author && (
          <p data-testid="author-error" className={errorClass}>
            — {state.errors.author[0]}
          </p>
        )}
      </div>

      <div className={fieldClass}>
        <span className={fieldNumClass}>03</span>
        <label htmlFor="url" className={labelClass}>
          The source
        </label>
        <input
          type="text"
          id="url"
          name="url"
          aria-label="URL"
          required
          minLength={5}
          placeholder="https://"
          className={`${inputClass} ${state.errors?.url ? "text-crimson" : ""}`}
          disabled={isPending}
        />
        {state.errors?.url && (
          <p data-testid="url-error" className={errorClass}>
            — {state.errors.url[0]}
          </p>
        )}
      </div>

      <div className={fieldClass}>
        <span className={fieldNumClass}>04</span>
        <label htmlFor="userId" className={labelClass}>
          Attributed to
          <span className="smallcaps text-[0.6rem] font-medium tracking-[0.18em] text-warm not-italic">
            optional
          </span>
        </label>
        <div className="group/select relative col-start-2 row-start-2 flex items-center">
          <select
            id="userId"
            name="userId"
            disabled={isPending}
            defaultValue=""
            className="w-full cursor-pointer appearance-none border-none bg-transparent py-2 pr-8 font-serif text-[1.35rem] font-medium text-cream outline-none disabled:opacity-50 max-[640px]:text-[1.15rem]"
          >
            <option value="" className="bg-ink-elevated font-sans text-base">
              — No attribution —
            </option>
            {users.map((user) => (
              <option
                key={user.id}
                value={user.id}
                className="bg-ink-elevated font-sans text-base"
              >
                {user.name}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-0 text-[0.9rem] text-copper transition-transform duration-[400ms] group-focus-within/select:rotate-180">
            ▾
          </span>
        </div>
      </div>

      <div className="flex justify-end pt-6">
        <button
          type="submit"
          data-testid="create-blog-button"
          aria-label="Create"
          disabled={isPending}
          className="group/submit relative inline-flex cursor-pointer items-center gap-4 overflow-hidden border border-copper bg-copper px-9 py-[1.1rem] text-ink transition-colors duration-[400ms] ease-[var(--ease-base)] before:absolute before:inset-0 before:-translate-x-[101%] before:bg-ink before:transition-transform before:duration-[400ms] hover:not-disabled:text-copper hover:not-disabled:before:translate-x-0 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span className="relative z-10 font-serif text-[1.1rem] font-medium italic">
            {isPending ? "Creating..." : "Create"}
          </span>
          <span className="relative z-10 text-[1.1rem] transition-transform duration-[400ms] group-hover/submit:not-disabled:translate-x-1.5">
            {isPending ? "✦" : "→"}
          </span>
        </button>
      </div>
    </form>
  )
}

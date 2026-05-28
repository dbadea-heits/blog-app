"use client"

import Link from "next/link"
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
      setError("That combination is not on file.")
    } else if (result?.ok) {
      router.push(callbackUrl)
    }
  }

  return (
    <main className="animate-drift grid min-h-[calc(100vh-90px)] grid-cols-2 max-[900px]:grid-cols-1 max-[900px]:min-h-0">
      <div className="relative flex items-center justify-end border-r border-hairline bg-ink-raised px-12 py-16 pl-12 max-[900px]:justify-start max-[900px]:border-r-0 max-[900px]:border-b max-[900px]:px-6 max-[900px]:py-12 before:absolute before:top-16 before:right-16 before:h-[calc(100%-8rem)] before:w-px before:bg-[linear-gradient(to_bottom,var(--color-copper),transparent_30%,transparent_70%,var(--color-copper))] before:opacity-35 max-[900px]:before:hidden">
        <div className="animate-rise w-full max-w-[28rem] [animation-delay:150ms]">
          <span className="smallcaps text-[0.68rem]">Returning reader</span>

          <h1 className="my-6 font-serif text-[clamp(3rem,7vw,5rem)] leading-[0.95] font-medium tracking-[-0.03em] text-cream">
            Welcome <em className="font-normal text-copper italic">back</em>.
          </h1>

          <p className="mb-16 font-serif text-[1.2rem] leading-[1.5] italic text-cream-muted">
            Your seat has not been given away. Sign in to continue where the
            margin notes left off.
          </p>

          <div className="mt-16">
            <div className="mb-6 h-px w-16 bg-copper" />
            <p className="mb-6 font-serif text-[0.95rem] leading-[1.6] italic text-cream-muted">
              <span className="smallcaps mb-2 inline-block text-copper not-italic">
                Note from the desk
              </span>
              <br />
              For first-time visitors, a demo seat is reserved.
            </p>
            <div className="grid grid-cols-[auto_1fr] items-baseline gap-x-5 gap-y-[0.4rem]">
              <span className="smallcaps text-[0.6rem] tracking-[0.18em] text-warm">
                username
              </span>
              <span className="font-serif text-base font-medium italic text-cream">
                author
              </span>
              <span className="smallcaps text-[0.6rem] tracking-[0.18em] text-warm">
                password
              </span>
              <span className="font-serif text-base font-medium italic text-cream">
                password
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-start px-12 py-16 pr-12 max-[900px]:px-6 max-[900px]:py-12">
        <form
          onSubmit={handleSubmit}
          className="animate-rise flex w-full max-w-[26rem] flex-col gap-10 [animation-delay:250ms]"
        >
          {error && (
            <div
              role="alert"
              className="animate-rise flex items-start gap-[0.85rem] border-l-2 border-crimson bg-[rgba(192,72,72,0.06)] px-5 py-4"
            >
              <span className="font-serif text-[1.3rem] leading-none italic text-crimson">
                !
              </span>
              <span className="font-serif text-base leading-[1.5] italic text-cream">
                {error}
              </span>
            </div>
          )}

          <div className="grid grid-cols-[2.5rem_1fr] grid-rows-[auto_auto] items-baseline gap-x-4 gap-y-2 border-b border-hairline pb-6 transition-colors duration-[400ms] ease-[var(--ease-base)] focus-within:border-copper">
            <span className="col-start-1 row-start-1 font-sans text-[0.7rem] font-medium tracking-[0.18em] tabular-nums text-copper">
              01
            </span>
            <label
              htmlFor="username"
              className="col-start-2 row-start-1 font-serif text-base font-medium italic text-cream"
            >
              The name you go by
            </label>
            <input
              type="text"
              id="username"
              name="username"
              required
              placeholder="Your username"
              disabled={isLoading}
              autoComplete="username"
              className="col-start-2 row-start-2 w-full border-none bg-transparent py-1.5 font-serif text-[1.3rem] font-medium text-cream outline-none placeholder:font-normal placeholder:italic placeholder:text-warm-soft disabled:opacity-50"
            />
          </div>

          <div className="grid grid-cols-[2.5rem_1fr] grid-rows-[auto_auto] items-baseline gap-x-4 gap-y-2 border-b border-hairline pb-6 transition-colors duration-[400ms] ease-[var(--ease-base)] focus-within:border-copper">
            <span className="col-start-1 row-start-1 font-sans text-[0.7rem] font-medium tracking-[0.18em] tabular-nums text-copper">
              02
            </span>
            <label
              htmlFor="password"
              className="col-start-2 row-start-1 font-serif text-base font-medium italic text-cream"
            >
              The secret you keep
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              placeholder="••••••••"
              disabled={isLoading}
              autoComplete="current-password"
              className="col-start-2 row-start-2 w-full border-none bg-transparent py-1.5 font-serif text-[1.3rem] font-medium text-cream outline-none placeholder:font-normal placeholder:italic placeholder:text-warm-soft disabled:opacity-50"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="group/submit relative mt-4 inline-flex cursor-pointer items-center justify-between gap-4 overflow-hidden border border-cream bg-transparent px-6 py-[1.1rem] text-cream transition-colors duration-[400ms] ease-[var(--ease-base)] before:absolute before:inset-0 before:translate-y-[101%] before:bg-cream before:transition-transform before:duration-[400ms] hover:not-disabled:text-ink hover:not-disabled:before:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <span className="relative z-10 font-serif text-[1.1rem] font-medium italic">
              {isLoading ? "Opening the door…" : "Open the door"}
            </span>
            <span className="relative z-10 text-[1.1rem] transition-transform duration-[400ms] group-hover/submit:not-disabled:translate-x-1.5">
              {isLoading ? "✦" : "→"}
            </span>
          </button>

          <p className="text-center font-serif text-[0.95rem] italic text-cream-muted">
            New to the room?{" "}
            <Link
              href="/register"
              className="relative pb-0.5 text-copper transition-colors duration-[400ms] ease-[var(--ease-base)] after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-copper after:transition-transform after:duration-[400ms] hover:text-copper-bright hover:after:scale-x-100"
            >
              request a seat
            </Link>
          </p>
        </form>
      </div>
    </main>
  )
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <main className="grid min-h-[calc(100vh-90px)] place-items-center px-12 py-16">
          <p className="font-serif text-[1.1rem] italic text-cream-muted">
            One moment…
          </p>
        </main>
      }
    >
      <LoginFormContent />
    </Suspense>
  )
}

"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useActionState, useEffect } from "react"
import { registerUser } from "@/app/actions/users"

const fieldShellClass =
  "grid grid-cols-[2.5rem_1fr] grid-rows-[auto_auto_auto] items-baseline gap-x-4 gap-y-2 border-b border-hairline pb-6 transition-colors duration-[400ms] ease-[var(--ease-base)] focus-within:border-copper"

const fieldNumClass =
  "col-start-1 row-start-1 font-sans text-[0.7rem] font-medium tracking-[0.18em] tabular-nums text-copper"

const labelClass =
  "col-start-2 row-start-1 flex flex-wrap items-baseline gap-3 font-serif text-base font-medium italic text-cream"

const labelHintClass =
  "smallcaps text-[0.58rem] tracking-[0.18em] text-warm not-italic"

const inputClass =
  "col-start-2 row-start-2 w-full border-none bg-transparent py-1.5 font-serif text-[1.3rem] font-medium text-cream outline-none placeholder:font-normal placeholder:italic placeholder:text-warm-soft disabled:opacity-50"

const errorClass =
  "animate-rise col-start-2 row-start-3 font-serif text-[0.85rem] italic text-crimson"

export default function RegisterPage() {
  const router = useRouter()
  const [state, formAction, isPending] = useActionState(registerUser, {})

  useEffect(() => {
    if (state.success) {
      router.push("/login")
    }
  }, [state.success, router])

  return (
    <main className="animate-drift grid min-h-[calc(100vh-90px)] grid-cols-2 max-[900px]:grid-cols-1 max-[900px]:min-h-0">
      <div className="flex items-center justify-end border-r border-hairline bg-ink-raised px-12 py-16 max-[900px]:justify-start max-[900px]:border-r-0 max-[900px]:border-b max-[900px]:px-6 max-[900px]:py-12">
        <div className="animate-rise w-full max-w-[28rem] [animation-delay:150ms]">
          <span className="smallcaps text-[0.68rem]">By invitation</span>

          <h1 className="my-6 font-serif text-[clamp(3rem,7vw,5rem)] leading-[0.95] font-medium tracking-[-0.03em] text-cream">
            Take a <em className="font-normal text-copper italic">seat</em>.
          </h1>

          <p className="mb-12 font-serif text-[1.15rem] leading-[1.55] italic text-cream-muted">
            Add yourself to the contributors. Your name will appear under any
            piece you submit, set in italic, as is the custom.
          </p>

          <div className="flex flex-col gap-6 border-t border-hairline pt-8">
            <div className="grid grid-cols-[2.5rem_1fr] items-baseline gap-3">
              <span className="font-serif text-base font-medium italic text-copper">
                i.
              </span>
              <p className="font-serif text-base leading-[1.55] font-normal text-cream-muted">
                The room is quiet. Speak only when you have something worth
                printing.
              </p>
            </div>
            <div className="grid grid-cols-[2.5rem_1fr] items-baseline gap-3">
              <span className="font-serif text-base font-medium italic text-copper">
                ii.
              </span>
              <p className="font-serif text-base leading-[1.55] font-normal text-cream-muted">
                Your username is a handle. Your name is a byline. Choose both
                with care.
              </p>
            </div>
            <div className="grid grid-cols-[2.5rem_1fr] items-baseline gap-3">
              <span className="font-serif text-base font-medium italic text-copper">
                iii.
              </span>
              <p className="font-serif text-base leading-[1.55] font-normal text-cream-muted">
                A password is a courtesy to your future self. Confirm it
                carefully.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-start px-12 py-16 max-[900px]:px-6 max-[900px]:py-12">
        <form
          action={formAction}
          noValidate
          className="animate-rise flex w-full max-w-[26rem] flex-col gap-9 [animation-delay:250ms]"
        >
          <div className={fieldShellClass}>
            <span className={fieldNumClass}>01</span>
            <label htmlFor="username" className={labelClass}>
              The handle you'll go by
              <span className={labelHintClass}>four letters or more</span>
            </label>
            <input
              type="text"
              id="username"
              name="username"
              aria-label="Username"
              required
              minLength={4}
              placeholder="your-handle"
              defaultValue={state.values?.username}
              disabled={isPending}
              autoComplete="username"
              className={inputClass}
              aria-invalid={!!state.errors?.username}
            />
            {state.errors?.username && (
              <p data-testid="username-error" className={errorClass}>
                — {state.errors.username}
              </p>
            )}
          </div>

          <div className={fieldShellClass}>
            <span className={fieldNumClass}>02</span>
            <label htmlFor="name" className={labelClass}>
              Your full name
              <span className={labelHintClass}>for the byline</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              aria-label="Name"
              required
              placeholder="Your given name"
              defaultValue={state.values?.name}
              disabled={isPending}
              autoComplete="name"
              className={inputClass}
              aria-invalid={!!state.errors?.name}
            />
            {state.errors?.name && (
              <p data-testid="name-error" className={errorClass}>
                — {state.errors.name}
              </p>
            )}
          </div>

          <div className={fieldShellClass}>
            <span className={fieldNumClass}>03</span>
            <label htmlFor="password" className={labelClass}>
              The secret you'll keep
              <span className={labelHintClass}>four characters or more</span>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              aria-label="Password"
              required
              minLength={4}
              placeholder="••••••••"
              disabled={isPending}
              autoComplete="new-password"
              className={inputClass}
              aria-invalid={!!state.errors?.password}
            />
            {state.errors?.password && (
              <p data-testid="password-error" className={errorClass}>
                — {state.errors.password}
              </p>
            )}
          </div>

          <div className={fieldShellClass}>
            <span className={fieldNumClass}>04</span>
            <label htmlFor="passwordConfirm" className={labelClass}>
              And again, for the record
              <span className={labelHintClass}>must match</span>
            </label>
            <input
              type="password"
              id="passwordConfirm"
              name="passwordConfirm"
              aria-label="Confirm Password"
              required
              minLength={4}
              placeholder="••••••••"
              disabled={isPending}
              autoComplete="new-password"
              className={inputClass}
              aria-invalid={!!state.errors?.passwordConfirm}
            />
            {state.errors?.passwordConfirm && (
              <p data-testid="passwordConfirm-error" className={errorClass}>
                — {state.errors.passwordConfirm}
              </p>
            )}
          </div>

          <button
            type="submit"
            data-testid="register-button"
            disabled={isPending}
            className="group/submit relative mt-4 inline-flex cursor-pointer items-center justify-between gap-4 overflow-hidden border border-copper bg-copper px-6 py-[1.1rem] text-ink transition-colors duration-[400ms] ease-[var(--ease-base)] before:absolute before:inset-0 before:translate-y-[101%] before:bg-ink before:transition-transform before:duration-[400ms] hover:not-disabled:text-copper hover:not-disabled:before:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <span className="relative z-10 font-serif text-[1.1rem] font-medium italic">
              {isPending ? "Reserving your seat…" : "Reserve your seat"}
            </span>
            <span className="relative z-10 text-[1.1rem] transition-transform duration-[400ms] group-hover/submit:not-disabled:translate-x-1.5">
              {isPending ? "✦" : "→"}
            </span>
          </button>

          <p className="text-center font-serif text-[0.95rem] italic text-cream-muted">
            Already a member?{" "}
            <Link
              href="/login"
              className="relative pb-0.5 text-copper transition-colors duration-[400ms] ease-[var(--ease-base)] after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-copper after:transition-transform after:duration-[400ms] hover:text-copper-bright hover:after:scale-x-100"
            >
              sign in instead
            </Link>
          </p>
        </form>
      </div>
    </main>
  )
}

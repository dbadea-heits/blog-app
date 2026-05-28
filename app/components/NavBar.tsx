"use client"

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"

export function Nav() {
  const { data: session } = useSession()

  return (
    <nav className="sticky top-0 z-[100] bg-ink/85 backdrop-blur-xl backdrop-saturate-150">
      <div className="mx-auto grid max-w-[1400px] grid-cols-[auto_1fr_auto] items-center gap-16 px-12 py-6 max-[900px]:grid-cols-1 max-[900px]:gap-5 max-[900px]:px-6 max-[900px]:py-5">
        <Link
          href="/"
          className="flex items-baseline gap-3 transition-opacity duration-[400ms] ease-[var(--ease-base)] hover:opacity-70"
        >
          <span className="font-serif text-[2rem] leading-none font-medium tracking-[-0.03em] text-cream">
            blog
          </span>
          <span className="font-serif text-[1.5rem] leading-none text-copper">
            —
          </span>
          <span className="font-serif text-[0.95rem] font-normal italic text-cream-muted max-[900px]:hidden">
            a quiet anthology
          </span>
        </Link>

        <div className="flex justify-center gap-12 max-[900px]:flex-wrap max-[900px]:justify-start max-[900px]:gap-6">
          <Link
            href="/blogs"
            className="group/link relative flex items-baseline gap-2 py-2 text-[0.9rem] font-normal text-cream-muted transition-colors duration-[400ms] ease-[var(--ease-base)] after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-copper after:transition-transform after:duration-[400ms] hover:text-cream hover:after:scale-x-100"
          >
            <span className="text-[0.7rem] text-copper opacity-70 tabular-nums tracking-[0.05em] transition-opacity duration-[400ms] group-hover/link:opacity-100">
              01
            </span>
            <span>Reading Room</span>
          </Link>
          <Link
            href="/users"
            className="group/link relative flex items-baseline gap-2 py-2 text-[0.9rem] font-normal text-cream-muted transition-colors duration-[400ms] ease-[var(--ease-base)] after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-copper after:transition-transform after:duration-[400ms] hover:text-cream hover:after:scale-x-100"
          >
            <span className="text-[0.7rem] text-copper opacity-70 tabular-nums tracking-[0.05em] transition-opacity duration-[400ms] group-hover/link:opacity-100">
              02
            </span>
            <span>Contributors</span>
          </Link>
          {session && (
            <Link
              href="/blogs/new"
              className="group/link relative flex items-baseline gap-2 py-2 text-[0.9rem] font-normal text-cream-muted transition-colors duration-[400ms] ease-[var(--ease-base)] after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-copper after:transition-transform after:duration-[400ms] hover:text-cream hover:after:scale-x-100"
            >
              <span className="text-[0.7rem] text-copper opacity-70 tabular-nums tracking-[0.05em] transition-opacity duration-[400ms] group-hover/link:opacity-100">
                03
              </span>
              <span>Submit</span>
            </Link>
          )}
        </div>

        <div className="flex items-center justify-end gap-6 max-[900px]:justify-start">
          {session ? (
            <>
              <Link
                href="/me"
                className="flex flex-col items-end gap-[0.1rem] leading-tight transition-opacity duration-[400ms] hover:opacity-70"
              >
                <span className="smallcaps text-warm">signed in</span>
                <span className="font-serif text-base font-medium italic text-cream">
                  {session.user?.name}
                </span>
              </Link>
              <button
                onClick={() => signOut({ redirectTo: "/" })}
                className="relative cursor-pointer border-none bg-none py-2 text-[0.85rem] font-normal text-cream-muted transition-colors duration-[400ms] ease-[var(--ease-base)] after:absolute after:inset-x-0 after:bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-copper after:transition-transform after:duration-[400ms] hover:text-copper hover:after:scale-x-100"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="relative py-2 text-[0.9rem] text-cream-muted transition-colors duration-[400ms] ease-[var(--ease-base)] after:absolute after:inset-x-0 after:bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-copper after:transition-transform after:duration-[400ms] hover:text-cream hover:after:scale-x-100"
              >
                Sign in
              </Link>
              <Link
                href="/register"
                className="group/sub relative isolate flex items-center gap-[0.6rem] overflow-hidden border border-copper px-[1.4rem] py-[0.7rem] text-[0.85rem] font-medium tracking-[0.04em] text-copper-bright transition-colors duration-[400ms] ease-[var(--ease-base)] before:absolute before:inset-0 before:-z-10 before:translate-y-full before:bg-copper before:transition-transform before:duration-[400ms] hover:text-ink hover:before:translate-y-0"
              >
                <span>Subscribe</span>
                <span className="text-[0.95rem] transition-transform duration-[400ms] group-hover/sub:translate-x-[2px] group-hover/sub:-translate-y-[2px]">
                  ↗
                </span>
              </Link>
            </>
          )}
        </div>
      </div>
      <div
        aria-hidden="true"
        className="h-px bg-[linear-gradient(to_right,transparent,var(--color-hairline)_15%,var(--color-hairline)_85%,transparent)]"
      />
    </nav>
  )
}

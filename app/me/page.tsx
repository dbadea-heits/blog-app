import { redirect } from "next/navigation"
import Link from "next/link"
import { getCurrentUser } from "@/app/services/session"
import { generateToken } from "@/app/actions/users"
import { CopyTokenButton } from "./copy-token-button"
import { getReadingListForUser } from "@/app/services/reading-list"

export default async function MePage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login?callbackUrl=/me")
  }

  const readingList = await getReadingListForUser(user.id)

  return (
    <main className="animate-drift mx-auto max-w-[1100px] px-12 pt-20 pb-24 max-[768px]:px-6 max-[768px]:pt-12 max-[768px]:pb-16">
      <header className="animate-rise mb-20 [animation-delay:100ms] max-[768px]:mb-12">
        <div className="mb-10 flex items-center gap-4">
          <span className="smallcaps text-[0.68rem]">§ me</span>
          <span className="h-px w-8 bg-copper opacity-50" />
          <span className="smallcaps text-[0.68rem]">Your Profile</span>
        </div>

        <h1 className="mb-10 font-serif text-[clamp(3rem,7vw,6rem)] leading-[0.95] font-medium tracking-[-0.04em] text-cream">
          Hello,{" "}
          <em className="font-normal text-copper italic">{user.name}</em>.
        </h1>

        <p className="border-t border-hairline pt-8 font-serif text-[1.1rem] italic text-cream-muted">
          @{user.username}
        </p>
      </header>

      <section className="animate-rise border-t border-hairline pt-12 [animation-delay:200ms]">
        <h2 className="mb-2 font-sans text-[0.75rem] font-medium tracking-[0.18em] uppercase text-copper">
          API Token
        </h2>

        <div className="mt-6 rounded-sm border border-hairline bg-ink-raised p-8">
          {user.token ? (
            <div className="flex flex-col gap-4">
              <p className="smallcaps text-[0.68rem] text-warm">
                Current token
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <code className="break-all font-mono text-[0.9rem] text-cream">
                  {user.token}
                </code>
                <CopyTokenButton token={user.token} />
              </div>
            </div>
          ) : (
            <p className="font-serif italic text-cream-muted">
              No token has been generated yet.
            </p>
          )}
        </div>

        <form action={generateToken} className="mt-6">
          <button
            type="submit"
            className="cursor-pointer border border-copper bg-transparent px-8 py-3 font-sans text-[0.85rem] tracking-[0.1em] uppercase text-copper transition-all duration-[400ms] ease-[var(--ease-base)] hover:bg-copper hover:text-ink"
          >
            {user.token ? "Regenerate token" : "Generate token"}
          </button>
        </form>
      </section>

      <section className="animate-rise mt-16 border-t border-hairline pt-12 [animation-delay:300ms]">
        <div className="mb-8 flex items-center justify-between gap-4">
          <h2 className="font-sans text-[0.75rem] font-medium tracking-[0.18em] uppercase text-copper">
            Reading list
          </h2>
          <span className="smallcaps text-[0.68rem] text-warm">
            {readingList.length} {readingList.length === 1 ? "entry" : "entries"}
          </span>
        </div>

        {readingList.length === 0 ? (
          <p className="font-serif italic text-cream-muted">
            No entries have been added to your reading list yet.
          </p>
        ) : (
          <ol className="list-none border-t border-hairline">
            {readingList.map((entry, index) => (
              <li
                key={entry.id}
                className="animate-rise border-b border-hairline"
                style={{ animationDelay: `${index * 70}ms` }}
              >
                <div className="grid grid-cols-[auto_1fr_auto] items-center gap-8 px-2 py-8 max-[640px]:grid-cols-1 max-[640px]:gap-4">
                  <span className="font-sans text-[0.75rem] font-medium tracking-[0.18em] tabular-nums text-copper">
                    {String(entry.blogId).padStart(3, "0")}
                  </span>

                  <div className="flex min-w-0 flex-col gap-2">
                    <Link
                      href={`/blogs/${entry.blogId}`}
                      className="font-serif text-[clamp(1.25rem,2.5vw,1.9rem)] leading-[1.1] font-medium tracking-[-0.02em] text-cream transition-colors duration-[400ms] ease-[var(--ease-base)] hover:text-copper-bright"
                    >
                      {entry.title}
                    </Link>
                    <span className="font-serif text-base italic text-cream-muted">
                      {entry.author}
                    </span>
                  </div>

                  <span
                    className={`smallcaps text-[0.65rem] ${entry.read ? "text-warm" : "text-copper"}`}
                  >
                    {entry.read ? "Read" : "Unread"}
                  </span>
                </div>
              </li>
            ))}
          </ol>
        )}
      </section>
    </main>
  )
}

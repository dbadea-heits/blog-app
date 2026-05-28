import { redirect } from "next/navigation"
import Link from "next/link"
import { getCurrentUser } from "@/app/services/session"
import { generateToken } from "@/app/actions/users"
import { CopyTokenButton } from "./copy-token-button"
import { getReadingListForUser } from "@/app/services/reading-list"
import { markAsRead } from "@/app/actions/reading-list"

export default async function MePage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  const readingList = await getReadingListForUser(user.id)
  const unreadEntries = readingList.filter((entry) => !entry.read)
  const readEntries = readingList.filter((entry) => entry.read)

  return (
    <main className="animate-drift mx-auto max-w-[1100px] px-12 pt-20 pb-24 max-[768px]:px-6 max-[768px]:pt-12 max-[768px]:pb-16">
      <header
        data-testid="user-profile"
        className="animate-rise mb-20 [animation-delay:100ms] max-[768px]:mb-12"
      >
        <div className="mb-10 flex items-center gap-4">
          <span className="smallcaps text-[0.68rem]">§ me</span>
          <span className="h-px w-8 bg-copper opacity-50" />
          <span className="smallcaps text-[0.68rem]">Your Profile</span>
        </div>

        <h1
          data-testid="user-name"
          className="mb-10 font-serif text-[clamp(3rem,7vw,6rem)] leading-[0.95] font-medium tracking-[-0.04em] text-cream"
        >
          Hello,{" "}
          <em className="font-normal text-copper italic">{user.name}</em>.
        </h1>

        <p
          data-testid="user-username"
          className="border-t border-hairline pt-8 font-serif text-[1.1rem] italic text-cream-muted"
        >
          @{user.username}
        </p>
      </header>

      <section
        data-testid="api-token-section"
        className="animate-rise border-t border-hairline pt-12 [animation-delay:200ms]"
      >
        <h2 className="mb-2 font-sans text-[0.75rem] font-medium tracking-[0.18em] uppercase text-copper">
          API Token
        </h2>

        <div className="mt-6 rounded-sm border border-hairline bg-ink-raised p-8">
          {user.token ? (
            <div data-testid="token-display" className="flex flex-col gap-4">
              <p className="smallcaps text-[0.68rem] text-warm">
                Current token
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <code
                  data-testid="api-token"
                  className="break-all font-mono text-[0.9rem] text-cream"
                >
                  {user.token}
                </code>
                <CopyTokenButton token={user.token} />
              </div>
            </div>
          ) : (
            <p data-testid="no-token-message" className="font-serif italic text-cream-muted">
              No token has been generated yet.
            </p>
          )}
        </div>

        <form action={generateToken} className="mt-6">
          <button
            type="submit"
            data-testid="generate-token-button"
            className="cursor-pointer border border-copper bg-transparent px-8 py-3 font-sans text-[0.85rem] tracking-[0.1em] uppercase text-copper transition-all duration-[400ms] ease-[var(--ease-base)] hover:bg-copper hover:text-ink"
          >
            {user.token ? "Regenerate token" : "Generate token"}
          </button>
        </form>
      </section>

      <section
        data-testid="reading-list-section"
        className="animate-rise mt-16 border-t border-hairline pt-12 [animation-delay:300ms]"
      >
        <div className="mb-10 flex items-center justify-between gap-4 max-[640px]:items-start max-[640px]:flex-col">
          <div>
            <h2 className="font-sans text-[0.75rem] font-medium tracking-[0.18em] uppercase text-copper">
              Reading list
            </h2>
            <p className="mt-3 max-w-[32rem] font-serif text-[1.05rem] italic text-cream-muted">
              Unread entries stay at the top so the next thing to read is always
              in front of you.
            </p>
          </div>
          <span className="smallcaps text-[0.68rem] text-warm">
            {readingList.length} {readingList.length === 1 ? "entry" : "entries"}
          </span>
        </div>

        {readingList.length === 0 ? (
          <p data-testid="empty-reading-list" className="font-serif italic text-cream-muted">
            No entries have been added to your reading list yet.
          </p>
        ) : (
          <div className="grid gap-10">
            <section data-testid="unread-section" className="rounded-sm border border-hairline bg-ink-raised/70 p-6">
              <div className="mb-6 flex items-center justify-between gap-4">
                <h3 className="font-sans text-[0.7rem] font-medium tracking-[0.2em] uppercase text-copper">
                  Unread
                </h3>
                <span className="smallcaps text-[0.65rem] text-warm">
                  {unreadEntries.length}
                </span>
              </div>

              {unreadEntries.length === 0 ? (
                <p data-testid="no-unread-blogs" className="font-serif italic text-cream-muted">
                  Nothing is waiting to be read.
                </p>
              ) : (
                <ol className="grid gap-4">
                  {unreadEntries.map((entry, index) => (
                    <li
                      key={entry.id}
                      className="animate-rise rounded-sm border border-hairline bg-ink/40 p-5"
                      style={{ animationDelay: `${index * 60}ms` }}
                    >
                      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                        <div className="min-w-0">
                          <Link
                            href={`/blogs/${entry.blogId}`}
                            className="block font-serif text-[clamp(1.2rem,2vw,1.7rem)] leading-[1.1] font-medium tracking-[-0.02em] text-cream transition-colors duration-[400ms] ease-[var(--ease-base)] hover:text-copper-bright"
                          >
                            {entry.title}
                          </Link>
                          <p className="mt-2 font-serif text-base italic text-cream-muted">
                            {entry.author}
                          </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                          <span className="smallcaps text-[0.65rem] text-copper">
                            unread
                          </span>
                          <form action={markAsRead} className="flex">
                            <input type="hidden" name="entryId" value={entry.id} />
                            <button
                              type="submit"
                              data-testid={`mark-read-${entry.id}`}
                              className="cursor-pointer border border-copper px-4 py-2 font-sans text-[0.75rem] tracking-[0.14em] uppercase text-copper transition-colors duration-[400ms] ease-[var(--ease-base)] hover:bg-copper hover:text-ink"
                            >
                              Mark as read
                            </button>
                          </form>
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
              )}
            </section>

            <section className="rounded-sm border border-hairline bg-ink-raised/50 p-6">
              <div className="mb-6 flex items-center justify-between gap-4">
                <h3 className="font-sans text-[0.7rem] font-medium tracking-[0.2em] uppercase text-warm">
                  Read
                </h3>
                <span className="smallcaps text-[0.65rem] text-warm">
                  {readEntries.length}
                </span>
              </div>

              {readEntries.length === 0 ? (
                <p className="font-serif italic text-cream-muted">
                  Nothing has been marked as read yet.
                </p>
              ) : (
                <ol className="grid gap-4">
                  {readEntries.map((entry, index) => (
                    <li
                      key={entry.id}
                      className="animate-rise rounded-sm border border-hairline/80 bg-ink/20 p-5"
                      style={{ animationDelay: `${index * 60}ms` }}
                    >
                      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                        <div className="min-w-0">
                          <Link
                            href={`/blogs/${entry.blogId}`}
                            className="block font-serif text-[clamp(1.1rem,1.8vw,1.55rem)] leading-[1.1] font-medium tracking-[-0.02em] text-cream transition-colors duration-[400ms] ease-[var(--ease-base)] hover:text-copper-bright"
                          >
                            {entry.title}
                          </Link>
                          <p className="mt-2 font-serif text-base italic text-cream-muted">
                            {entry.author}
                          </p>
                        </div>

                        <span className="smallcaps text-[0.65rem] text-warm">
                          read
                        </span>
                      </div>
                    </li>
                  ))}
                </ol>
              )}
            </section>
          </div>
        )}
      </section>
    </main>
  )
}

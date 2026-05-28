import Link from "next/link"
import { notFound } from "next/navigation"
import { db } from "@/db"
import { users } from "@/db/schema"

export default async function UserPage({
  params,
}: {
  params: Promise<{ username: string }>
}) {
  const { username } = await params

  const user = await db.query.users.findFirst({
    where: (u, { eq }) => eq(u.username, username),
    with: {
      blogs: true,
    },
  })

  if (!user) {
    notFound()
  }

  const totalLikes = user.blogs.reduce((sum, b) => sum + (b.likes ?? 0), 0)

  return (
    <main className="animate-drift mx-auto max-w-[1000px] px-8 pt-12 pb-24 max-[768px]:px-6 max-[768px]:pt-8 max-[768px]:pb-16">
      <Link
        href="/users"
        className="group/back animate-rise mb-16 inline-flex items-center gap-3 font-sans text-[0.85rem] text-cream-muted transition-colors duration-[400ms] ease-[var(--ease-base)] hover:text-copper [animation-delay:100ms] max-[768px]:mb-10"
      >
        <span className="transition-transform duration-[400ms] group-hover/back:-translate-x-1">
          ←
        </span>
        <span>back to the masthead</span>
      </Link>

      <header className="animate-rise mb-20 [animation-delay:200ms] max-[768px]:mb-12">
        <div className="mb-8 flex items-center gap-4">
          <span className="smallcaps text-[0.68rem]">Contributor</span>
          <span className="h-px w-8 bg-copper opacity-50" />
          <span className="smallcaps text-[0.68rem]">@{user.username}</span>
        </div>

        <h1 className="mb-12 font-serif text-[clamp(3rem,9vw,7rem)] leading-[0.95] font-medium italic tracking-[-0.04em] text-cream">
          {user.name}
        </h1>

        <div className="flex items-center gap-12 border-t border-hairline pt-10 max-[768px]:gap-8">
          <div className="flex flex-col gap-[0.4rem]">
            <span className="font-serif text-[3rem] leading-none font-medium italic tabular-nums text-copper max-[768px]:text-[2.2rem]">
              {String(user.blogs.length).padStart(2, "0")}
            </span>
            <span className="smallcaps text-[0.65rem] text-warm">
              {user.blogs.length === 1 ? "Entry" : "Entries"}
            </span>
          </div>
          <div className="h-14 w-px bg-hairline" />
          <div className="flex flex-col gap-[0.4rem]">
            <span className="font-serif text-[3rem] leading-none font-medium italic tabular-nums text-copper max-[768px]:text-[2.2rem]">
              {String(totalLikes).padStart(2, "0")}
            </span>
            <span className="smallcaps text-[0.65rem] text-warm">
              Marks of appreciation
            </span>
          </div>
        </div>
      </header>

      <section className="animate-rise [animation-delay:350ms]">
        <div className="mb-8 flex items-center">
          <span className="smallcaps text-[0.68rem]">Selected entries</span>
        </div>

        {user.blogs.length === 0 ? (
          <div className="py-20 text-center">
            <div className="mx-auto mb-8 h-px w-16 bg-copper" />
            <p className="font-serif text-[1.3rem] italic text-cream-muted">
              {user.name} has not{" "}
              <em className="italic text-cream">filed</em> anything yet.
            </p>
          </div>
        ) : (
          <ol className="list-none border-t border-hairline">
            {user.blogs.map((blog, index) => (
              <li
                key={blog.id}
                className="animate-rise border-b border-hairline"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <Link
                  href={`/blogs/${blog.id}`}
                  className="group/e relative grid grid-cols-[auto_1fr_auto] items-baseline gap-10 px-2 py-9 text-cream no-underline transition-all duration-[400ms] ease-[var(--ease-base)] before:absolute before:inset-0 before:bg-[linear-gradient(to_right,transparent,rgba(184,115,51,0.04)_50%,transparent)] before:opacity-0 before:transition-opacity before:duration-[400ms] hover:pl-6 hover:before:opacity-100 max-[768px]:grid-cols-1 max-[768px]:gap-3 max-[768px]:py-7 max-[768px]:hover:pl-2"
                >
                  <span className="font-sans text-[0.75rem] font-medium tracking-[0.18em] whitespace-nowrap tabular-nums text-copper">
                    N° {String(blog.id).padStart(3, "0")}
                  </span>

                  <div className="flex min-w-0 flex-col gap-2">
                    <h2 className="font-serif text-[clamp(1.35rem,2.5vw,1.9rem)] leading-[1.1] font-medium tracking-[-0.015em] text-cream transition-colors duration-[400ms] group-hover/e:text-copper-bright">
                      {blog.title}
                    </h2>
                    <p className="font-sans text-[0.82rem] break-all text-warm opacity-80">
                      {blog.url}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-1 whitespace-nowrap max-[768px]:flex-row max-[768px]:items-baseline max-[768px]:gap-2">
                    <span className="font-serif text-[1.6rem] leading-none font-medium italic tabular-nums text-copper max-[768px]:text-[1.2rem]">
                      {blog.likes}
                    </span>
                    <span className="smallcaps text-[0.6rem] tracking-[0.18em] text-warm">
                      {blog.likes === 1 ? "mark" : "marks"}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ol>
        )}
      </section>
    </main>
  )
}

import Link from "next/link"
import { db } from "@/db"
import { users } from "@/db/schema"

export default async function UsersPage() {
  const allUsers = await db.select().from(users)

  return (
    <main className="animate-drift mx-auto max-w-[1100px] px-12 pt-20 pb-24 max-[768px]:px-6 max-[768px]:pt-12 max-[768px]:pb-16">
      <header className="animate-rise mb-20 [animation-delay:100ms] max-[768px]:mb-12">
        <div className="mb-10 flex items-center gap-4">
          <span className="smallcaps text-[0.68rem]">§ 02</span>
          <span className="h-px w-8 bg-copper opacity-50" />
          <span className="smallcaps text-[0.68rem]">The Masthead</span>
        </div>

        <h1 className="mb-10 font-serif text-[clamp(3.5rem,9vw,7.5rem)] leading-[0.95] font-medium tracking-[-0.04em] text-cream">
          The{" "}
          <em className="font-normal text-copper italic">contributors</em>.
        </h1>

        <p className="border-t border-hairline pt-8 font-serif text-[1.2rem] italic text-cream-muted">
          {allUsers.length}{" "}
          {allUsers.length === 1
            ? "name keeps the press running"
            : "names keep the press running"}
          .
        </p>
      </header>

      {allUsers.length > 0 ? (
        <ul className="list-none border-t border-hairline">
          {allUsers.map((user, index) => (
            <li
              key={user.id}
              className="animate-rise border-b border-hairline"
              style={{ animationDelay: `${index * 90}ms` }}
            >
              <Link
                href={`/users/${user.username}`}
                className="group/c relative grid grid-cols-[auto_1fr_auto] items-baseline gap-12 px-2 py-9 text-cream no-underline transition-all duration-[400ms] ease-[var(--ease-base)] before:absolute before:inset-0 before:bg-[linear-gradient(to_right,transparent,rgba(184,115,51,0.04)_50%,transparent)] before:opacity-0 before:transition-opacity before:duration-[400ms] hover:pl-6 hover:before:opacity-100 max-[768px]:grid-cols-1 max-[768px]:gap-3 max-[768px]:py-7 max-[768px]:hover:pl-2"
              >
                <span className="font-sans text-[0.85rem] font-medium tracking-[0.18em] whitespace-nowrap tabular-nums text-copper">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="flex min-w-0 flex-col gap-[0.4rem]">
                  <h2 className="font-serif text-[clamp(1.5rem,3.5vw,2.4rem)] leading-[1.05] font-medium tracking-[-0.02em] text-cream transition-all duration-[400ms] group-hover/c:italic group-hover/c:text-copper-bright">
                    {user.name}
                  </h2>
                  <span className="font-serif text-base italic text-cream-muted">
                    @{user.username}
                  </span>
                </div>

                <span
                  aria-hidden="true"
                  className="self-center text-[1.3rem] text-cream-muted transition-all duration-[400ms] group-hover/c:translate-x-2 group-hover/c:text-copper max-[768px]:justify-self-end"
                >
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="animate-rise py-24 text-center">
          <div className="mx-auto mb-8 h-px w-16 bg-copper" />
          <p className="font-serif text-[1.4rem] italic text-cream-muted">
            The masthead is <em className="italic text-cream">empty</em>.
          </p>
        </div>
      )}
    </main>
  )
}

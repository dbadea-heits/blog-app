import Link from "next/link"
import { db } from "@/db"
import { users } from "@/db/schema"
import { BlogForm } from "@/app/components/BlogForm"

export default async function NewBlog() {
  const allUsers = await db.select().from(users)

  return (
    <main className="animate-drift mx-auto max-w-[720px] px-8 pt-12 pb-24 max-[640px]:px-6 max-[640px]:pt-8 max-[640px]:pb-16">
      <Link
        href="/blogs"
        className="group/back animate-rise mb-16 inline-flex items-center gap-3 font-sans text-[0.85rem] text-cream-muted transition-colors duration-[400ms] ease-[var(--ease-base)] hover:text-copper [animation-delay:100ms]"
      >
        <span className="transition-transform duration-[400ms] group-hover/back:-translate-x-1">
          ←
        </span>
        <span>back to the reading room</span>
      </Link>

      <header className="animate-rise mb-16 [animation-delay:200ms] max-[640px]:mb-10">
        <div className="mb-8 flex items-center gap-4">
          <span className="smallcaps text-[0.68rem]">§ 03</span>
          <span className="h-px w-8 bg-copper opacity-50" />
          <span className="smallcaps text-[0.68rem]">Submission desk</span>
        </div>

        <h1 className="mb-6 font-serif text-[clamp(2.75rem,7vw,5rem)] leading-none font-medium tracking-[-0.03em] text-cream">
          A new <em className="font-normal text-copper italic">entry</em>.
        </h1>

        <p className="max-w-[28rem] font-serif text-[1.15rem] italic text-cream-muted">
          Add a piece to the collection. Be precise — every field will be set
          on the page in serif.
        </p>
      </header>

      <BlogForm users={allUsers} />
    </main>
  )
}

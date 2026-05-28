import Link from "next/link"
import { getBlogs } from "../services/blogs"

const normalizeSearchText = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim()

const Blogs = async ({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>
}) => {
  const { filter } = await searchParams
  const blogs = await getBlogs()
  const searchTerms = filter ? normalizeSearchText(filter).split(/\s+/) : []
  const filteredBlogs = searchTerms.length
    ? blogs.filter((blog) => {
        const normalizedTitle = normalizeSearchText(blog.title)
        return searchTerms.some((term) => normalizedTitle.includes(term))
      })
    : blogs

  return (
    <main className="animate-drift mx-auto max-w-[1100px] px-12 pt-20 pb-24 max-[768px]:px-6 max-[768px]:pt-12 max-[768px]:pb-16">
      <header className="mb-20 max-[768px]:mb-12">
        <div className="animate-rise mb-8 flex items-center gap-4 [animation-delay:100ms]">
          <span className="smallcaps">§ 01</span>
          <span className="text-[0.6rem] text-copper opacity-50">•</span>
          <span className="smallcaps">The Reading Room</span>
        </div>

        <h1 className="animate-rise mb-14 font-serif text-[clamp(3.5rem,9vw,7.5rem)] leading-[0.95] font-medium tracking-[-0.04em] text-cream [animation-delay:200ms]">
          The <em className="font-normal text-copper italic">archive</em>.
        </h1>

        <div className="animate-rise grid grid-cols-[1fr_auto] items-end gap-12 border-t border-hairline pt-8 [animation-delay:350ms] max-[768px]:grid-cols-1 max-[768px]:gap-8">
          <p className="max-w-[26rem] font-serif text-[1.1rem] italic text-cream-muted">
            {filteredBlogs.length}{" "}
            {filteredBlogs.length === 1 ? "entry" : "entries"} in the
            collection. Read forward, read backward.
          </p>

          <form
            action="/blogs"
            method="GET"
            className="flex min-w-[22rem] items-center gap-4 border-b border-hairline py-2 transition-colors duration-[400ms] ease-[var(--ease-base)] focus-within:border-copper max-[768px]:min-w-0"
          >
            <span className="smallcaps shrink-0 text-[0.62rem] whitespace-nowrap text-warm">
              Find a piece
            </span>
            <input
              type="text"
              name="filter"
              data-testid="filter-input"
              placeholder="by title…"
              defaultValue={filter || ""}
              aria-label="Search articles by title"
              className="flex-1 border-none bg-transparent py-1.5 font-serif text-base italic text-cream outline-none placeholder:text-warm-soft"
            />
            <button
              type="submit"
              data-testid="search-button"
              className="cursor-pointer border-none bg-transparent px-2 py-1.5 text-[1.1rem] text-copper transition-all duration-[400ms] ease-[var(--ease-base)] hover:translate-x-0.5 hover:text-copper-bright"
            >
              ↵
            </button>
          </form>
        </div>
      </header>

      {filteredBlogs.length > 0 ? (
        <ol data-testid="blogs-list" className="list-none border-t border-hairline">
          {filteredBlogs.map((blog, index) => {
            const issueNum = String(filteredBlogs.length - index).padStart(
              3,
              "0"
            )
            return (
              <li
                key={blog.id}
                className="animate-rise border-b border-hairline"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <Link
                  href={`/blogs/${blog.id}`}
                  className="group/entry relative grid grid-cols-[auto_1fr_auto] items-baseline gap-12 px-2 py-10 text-cream no-underline transition-all duration-[400ms] ease-[var(--ease-base)] before:absolute before:inset-0 before:bg-[linear-gradient(to_right,transparent,rgba(184,115,51,0.04)_50%,transparent)] before:opacity-0 before:transition-opacity before:duration-[400ms] hover:pl-6 hover:before:opacity-100 max-[768px]:grid-cols-1 max-[768px]:gap-4 max-[768px]:py-8 max-[768px]:hover:pl-2"
                >
                  <span className="font-sans text-[0.75rem] font-medium tracking-[0.18em] tabular-nums whitespace-nowrap text-copper">
                    N° {issueNum}
                  </span>

                  <div className="flex min-w-0 flex-col gap-[0.6rem]">
                    <h2 className="font-serif text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.1] font-medium tracking-[-0.02em] text-cream transition-colors duration-[400ms] group-hover/entry:text-copper-bright">
                      {blog.title}
                    </h2>
                    <div className="flex flex-wrap items-center gap-[0.8rem] font-sans text-[0.88rem] text-cream-muted">
                      <span>
                        by{" "}
                        <em className="font-serif font-medium italic text-cream">
                          {blog.author}
                        </em>
                      </span>
                      <span>{blog.likes} likes</span>
                      {blog.username && blog.userName && (
                        <>
                          <span className="text-copper opacity-70">—</span>
                          <span className="font-serif italic text-warm">
                            submitted by {blog.userName}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  <span className="self-center text-[1.3rem] text-cream-muted transition-all duration-[400ms] group-hover/entry:translate-x-2 group-hover/entry:text-copper max-[768px]:justify-self-end">
                    →
                  </span>
                </Link>
              </li>
            )
          })}
        </ol>
      ) : (
        <div className="animate-rise py-24 text-center">
          <div className="mx-auto mb-10 h-px w-16 bg-copper" />
          <p className="mb-8 font-serif text-[1.5rem] italic text-cream-muted">
            Nothing found for{" "}
            <em className="italic text-cream">"{filter}"</em>.
          </p>
          <Link
            href="/blogs"
            className="relative pb-1 font-sans text-[0.9rem] tracking-[0.04em] text-copper transition-colors duration-[400ms] ease-[var(--ease-base)] after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-center after:scale-x-[0.3] after:bg-copper after:transition-transform after:duration-[400ms] hover:text-copper-bright hover:after:scale-x-100"
          >
            Clear the search →
          </Link>
        </div>
      )}
    </main>
  )
}

export default Blogs

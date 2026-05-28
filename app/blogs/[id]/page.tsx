import Link from "next/link"
import { notFound } from "next/navigation"
import { getBlogById } from "../../services/blogs"
import { likeBlogPost, addBlogToReadingListPost } from "../../actions/blogs"
import { getCurrentUser } from "@/app/services/session"
import { isBlogInReadingList } from "@/app/services/reading-list"

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const [blog, currentUser] = await Promise.all([
    getBlogById(Number(id)),
    getCurrentUser(),
  ])

  if (!blog) {
    notFound()
  }

  const canAddToReadingList =
    currentUser &&
    blog.userId !== currentUser.id &&
    !(await isBlogInReadingList(currentUser.id, blog.id))

  return (
    <main className="animate-drift mx-auto max-w-[720px] px-8 pt-12 pb-24 max-[640px]:px-6 max-[640px]:pt-8 max-[640px]:pb-16">
      <Link
        href="/blogs"
        className="group/back animate-rise mb-16 inline-flex items-center gap-3 font-sans text-[0.85rem] tracking-[0.02em] text-cream-muted transition-colors duration-[400ms] ease-[var(--ease-base)] hover:text-copper [animation-delay:100ms] max-[640px]:mb-10"
      >
        <span className="text-base transition-transform duration-[400ms] group-hover/back:-translate-x-1">
          ←
        </span>
        <span className="relative after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-right after:scale-x-0 after:bg-copper after:transition-transform after:duration-[400ms] group-hover/back:after:origin-left group-hover/back:after:scale-x-100">
          back to the reading room
        </span>
      </Link>

      <article data-testid="blog-detail">
        <header className="animate-rise mb-16 [animation-delay:200ms] max-[640px]:mb-10">
          <div className="mb-10 flex items-center gap-4">
            <span className="smallcaps text-[0.68rem]">
              Entry N° {String(blog.id).padStart(3, "0")}
            </span>
            <span className="h-px w-8 bg-copper opacity-50" />
            <span className="smallcaps text-[0.68rem]">The Reading Room</span>
          </div>

          <h1
            data-testid="blog-title"
            className="mb-12 font-serif text-[clamp(2.5rem,6.5vw,5rem)] leading-none font-medium tracking-[-0.03em] text-cream"
          >
            {blog.title}
          </h1>

          <div className="flex flex-wrap items-center gap-8 max-[640px]:flex-col max-[640px]:items-start max-[640px]:gap-5">
            <div className="flex flex-col gap-[0.4rem]">
              <span className="smallcaps text-[0.62rem] text-warm">By</span>
              <a
                href={blog.url}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="blog-author"
                className="relative inline-flex items-baseline gap-[0.4rem] font-serif text-[1.4rem] font-medium italic text-cream no-underline transition-colors duration-[400ms] ease-[var(--ease-base)] after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-copper after:transition-transform after:duration-[400ms] hover:text-copper hover:after:scale-x-100"
              >
                {blog.author}
                <span className="text-[0.85rem] text-copper transition-transform duration-[400ms] [a:hover_&]:translate-x-0.5 [a:hover_&]:-translate-y-0.5">
                  ↗
                </span>
              </a>
            </div>

            {blog.username && blog.userName && (
              <>
                <div className="h-10 w-px bg-hairline max-[640px]:hidden" />
                <div className="flex flex-col gap-[0.4rem]">
                  <span className="smallcaps text-[0.62rem] text-warm">
                    Submitted by
                  </span>
                  <Link
                    href={`/users/${blog.username}`}
                    className="relative inline-flex items-baseline font-serif text-[1.4rem] font-medium italic text-cream transition-colors duration-[400ms] ease-[var(--ease-base)] after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-copper after:transition-transform after:duration-[400ms] hover:text-copper hover:after:scale-x-100"
                  >
                    {blog.userName}
                  </Link>
                </div>
              </>
            )}
          </div>
        </header>

        <div className="relative mx-auto h-px bg-[linear-gradient(to_right,transparent,var(--color-hairline)_15%,var(--color-hairline)_85%,transparent)] after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:bg-ink after:px-4 after:text-[0.85rem] after:text-copper after:content-['✦']" />

        <section className="animate-rise py-16 [animation-delay:350ms]">
          <p className="mb-12 font-serif text-[1.3rem] leading-[1.65] tracking-[0.005em] text-cream">
            <span className="float-left mt-1 mr-3 pt-1 font-serif text-[4.5rem] leading-[0.85] font-medium italic text-copper">
              R
            </span>
            ead the full piece at the source. This entry exists as a quiet
            bookmark — a curated reference to a piece worth your attention. Use
            the link above to continue.
          </p>

          <div className="relative ml-auto max-w-[28rem] py-6 pl-8">
            <div className="absolute top-2 bottom-2 left-0 w-px bg-copper opacity-60" />
            <p className="font-serif text-[0.95rem] leading-[1.6] italic text-cream-muted">
              <span className="smallcaps mb-2 inline-block text-copper not-italic">
                Reader's note
              </span>
              <br />
              The link opens in a new window so this page stays where you left
              it. When you return, leave a small mark of approval below.
            </p>
          </div>
        </section>

        <div className="relative mx-auto h-px bg-[linear-gradient(to_right,transparent,var(--color-hairline)_15%,var(--color-hairline)_85%,transparent)] after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:bg-ink after:px-4 after:text-[0.85rem] after:text-copper after:content-['✦']" />

        <footer className="animate-rise flex flex-wrap items-center justify-between gap-8 pt-12 [animation-delay:500ms] max-[640px]:flex-col max-[640px]:items-start">
          <div className="flex items-baseline gap-4">
            <span className="smallcaps text-[0.62rem] text-warm">
              Marks of appreciation
            </span>
            <span className="font-serif text-[3rem] leading-none font-medium italic tabular-nums text-copper">
              {blog.likes}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {canAddToReadingList && (
              <form action={addBlogToReadingListPost} className="flex">
                <input type="hidden" name="blogId" value={blog.id} />
                <button
                  type="submit"
                  data-testid="add-to-reading-list-button"
                  className="group/list relative inline-flex cursor-pointer items-center gap-[0.85rem] overflow-hidden border border-copper bg-transparent px-7 py-4 font-sans text-[0.9rem] tracking-[0.04em] text-copper transition-colors duration-[400ms] ease-[var(--ease-base)] before:absolute before:inset-0 before:-translate-x-[101%] before:bg-copper before:transition-transform before:duration-[400ms] hover:text-ink hover:before:translate-x-0 active:scale-[0.98]"
                >
                  <span className="relative z-10 font-serif text-base italic">
                    Add to reading list
                  </span>
                  <span className="relative z-10 text-[0.95rem] transition-transform duration-[400ms] group-hover/list:translate-x-1">
                    ↗
                  </span>
                </button>
              </form>
            )}

            <form action={likeBlogPost} className="flex">
              <input type="hidden" name="id" value={blog.id} />
              <button
                type="submit"
                className="group/like relative inline-flex cursor-pointer items-center gap-[0.85rem] overflow-hidden border border-copper bg-transparent px-7 py-4 font-sans text-[0.9rem] tracking-[0.04em] text-copper transition-colors duration-[400ms] ease-[var(--ease-base)] before:absolute before:inset-0 before:-translate-x-[101%] before:bg-copper before:transition-transform before:duration-[400ms] hover:text-ink hover:before:translate-x-0 active:scale-[0.98]"
              >
                <span className="relative z-10 text-[0.95rem] transition-transform duration-[400ms] group-hover/like:rotate-[72deg]">
                  ✦
                </span>
                <span className="relative z-10 font-serif text-base italic">
                  Mark this piece
                </span>
              </button>
            </form>
          </div>
        </footer>
      </article>
    </main>
  )
}

export default BlogPage

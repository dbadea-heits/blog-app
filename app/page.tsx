import Link from "next/link"

const Home = () => {
  const now = new Date()
  const issueDate = now
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
    .toLowerCase()

  return (
    <main className="mx-auto max-w-[1400px] px-12 max-[900px]:px-6">
      <section className="animate-drift relative pt-24 pb-20 max-[900px]:pt-12 max-[900px]:pb-16">
        <div className="animate-rise mb-20 flex items-center justify-between border-b border-hairline pb-8 max-[900px]:mb-12 max-[900px]:flex-col max-[900px]:items-start max-[900px]:gap-4 [animation-delay:100ms]">
          <div className="flex items-center gap-4">
            <span className="smallcaps text-copper">Volume I</span>
            <span className="text-[0.6rem] text-copper opacity-50">•</span>
            <span className="smallcaps text-copper">Issue N° 042</span>
          </div>
          <div className="font-serif text-base italic text-cream-muted">
            {issueDate}
          </div>
        </div>

        <h1 className="mb-12 max-w-[90%] font-serif text-[clamp(4rem,14vw,12rem)] leading-[0.92] font-medium tracking-[-0.045em] text-cream max-[900px]:mb-8 max-[900px]:text-[clamp(3rem,16vw,6rem)]">
          <span className="animate-rise block [animation-delay:200ms]">
            Thoughts,
          </span>
          <span className="animate-rise block indent-[6vw] [animation-delay:350ms] max-[900px]:indent-0">
            <em className="font-normal text-copper italic">in long</em>
          </span>
          <span className="animate-rise block indent-[16vw] text-cream-muted [animation-delay:500ms] max-[900px]:indent-0">
            form.
          </span>
        </h1>

        <div className="animate-rise mb-16 ml-auto max-w-[32rem] text-right [animation-delay:700ms] max-[900px]:mb-12 max-[900px]:ml-0 max-[900px]:text-left">
          <p className="font-serif text-[1.35rem] leading-[1.45] font-normal italic text-cream-muted">
            A quiet anthology for writers and readers who believe a sentence
            should earn its place.
          </p>
        </div>

        <div className="animate-rise mb-20 flex items-center gap-10 [animation-delay:850ms] max-[900px]:mb-12 max-[900px]:flex-col max-[900px]:items-start max-[900px]:gap-6">
          <Link
            href="/blogs"
            className="group/cta relative inline-flex items-center gap-4 py-5 text-cream transition-colors duration-[400ms] ease-[var(--ease-base)] before:absolute before:inset-0 before:border-y before:border-cream after:absolute after:inset-0 after:-z-10 after:origin-top after:scale-y-0 after:bg-cream after:transition-transform after:duration-[400ms] hover:text-ink hover:after:scale-y-100"
          >
            <span className="relative z-10 pl-6 font-serif text-[1.1rem] italic">
              Begin reading
            </span>
            <span className="relative z-10 pr-6 text-[1.2rem] transition-transform duration-[400ms] group-hover/cta:translate-x-[6px]">
              →
            </span>
          </Link>
          <Link
            href="/users"
            className="relative pb-1 text-[0.95rem] tracking-[0.02em] text-cream-muted transition-colors duration-[400ms] ease-[var(--ease-base)] after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-copper after:transition-transform after:duration-[400ms] hover:text-copper hover:after:scale-x-100"
          >
            Meet the contributors
          </Link>
        </div>

        <div className="animate-rise flex items-center gap-10 border-t border-hairline pt-12 [animation-delay:1000ms] max-[900px]:flex-wrap max-[900px]:gap-6">
          <div className="flex flex-col gap-[0.4rem]">
            <span className="smallcaps text-[0.62rem] text-warm">Founded</span>
            <span className="font-serif text-[1.1rem] font-medium italic text-cream">
              MMXXVI
            </span>
          </div>
          <div className="h-8 w-px bg-hairline" />
          <div className="flex flex-col gap-[0.4rem]">
            <span className="smallcaps text-[0.62rem] text-warm">
              Published
            </span>
            <span className="font-serif text-[1.1rem] font-medium italic text-cream">
              Quietly
            </span>
          </div>
          <div className="h-8 w-px bg-hairline" />
          <div className="flex flex-col gap-[0.4rem]">
            <span className="smallcaps text-[0.62rem] text-warm">
              Read time
            </span>
            <span className="font-serif text-[1.1rem] font-medium italic text-cream">
              Unhurried
            </span>
          </div>
        </div>
      </section>

      <section className="animate-drift border-t border-hairline pt-24 pb-20 [animation-delay:200ms] max-[900px]:pt-16 max-[900px]:pb-12">
        <div className="mb-16 flex items-baseline gap-4">
          <span className="font-serif text-[1.5rem] font-medium italic text-copper">
            § 01
          </span>
          <span className="smallcaps">From the editor</span>
        </div>

        <div className="grid grid-cols-3 gap-x-20 gap-y-16 max-[900px]:grid-cols-1 max-[900px]:gap-12">
          <div className="relative flex flex-col gap-5 border-t border-hairline pt-8 before:absolute before:-top-px before:left-0 before:h-px before:w-12 before:bg-copper">
            <h2 className="mb-2 font-serif text-[2rem] leading-[1.05] font-medium tracking-[-0.02em] text-cream">
              On <em className="font-normal text-copper italic">slow</em>{" "}
              reading.
            </h2>
            <p className="font-serif text-[1.05rem] leading-[1.6] font-normal text-cream-muted">
              The web rewards velocity. We are interested in the opposite — the
              kind of writing that asks you to sit with it. To circle back. To
              underline.
            </p>
            <p className="font-serif text-[1.05rem] leading-[1.6] font-normal text-cream-muted">
              Every piece here was put down because someone believed it
              mattered enough to put down.
            </p>
          </div>

          <div className="relative flex flex-col gap-5 border-t border-hairline pt-8 before:absolute before:-top-px before:left-0 before:h-px before:w-12 before:bg-copper">
            <h2 className="mb-2 font-serif text-[2rem] leading-[1.05] font-medium tracking-[-0.02em] text-cream">
              On{" "}
              <em className="font-normal text-copper italic">typography</em>.
            </h2>
            <p className="font-serif text-[1.05rem] leading-[1.6] font-normal text-cream-muted">
              We set in Cormorant Garamond and Inter Tight, on a warm cream
              against ink. A paper feeling, rendered in pixels.
            </p>
            <p className="font-serif text-[1.05rem] leading-[1.6] font-normal text-cream-muted">
              The italics are not decoration. They are a writer raising their
              voice, briefly, before settling back into the line.
            </p>
          </div>

          <div className="relative flex flex-col gap-5 border-t border-hairline pt-8 before:absolute before:-top-px before:left-0 before:h-px before:w-12 before:bg-copper">
            <h2 className="mb-2 font-serif text-[2rem] leading-[1.05] font-medium tracking-[-0.02em] text-cream">
              On the{" "}
              <em className="font-normal text-copper italic">archive</em>.
            </h2>
            <p className="font-serif text-[1.05rem] leading-[1.6] font-normal text-cream-muted">
              Nothing here disappears. The newest issue is on the cover; every
              prior issue waits in the reading room, numbered and intact.
            </p>
            <p className="font-serif text-[1.05rem] leading-[1.6] font-normal text-cream-muted">
              You can read forward, or you can read backward. Both are
              encouraged.
            </p>
          </div>
        </div>
      </section>

      <footer className="pt-20 pb-24">
        <div className="mb-12 h-px bg-[linear-gradient(to_right,transparent,var(--color-hairline)_20%,var(--color-copper)_50%,var(--color-hairline)_80%,transparent)]" />
        <div className="flex items-center justify-center gap-6">
          <span className="smallcaps">End of cover</span>
          <span className="font-serif text-copper">—</span>
          <Link
            href="/blogs"
            className="font-serif text-[1.05rem] italic text-cream transition-colors duration-[400ms] ease-[var(--ease-base)] hover:text-copper"
          >
            Continue to the reading room →
          </Link>
        </div>
      </footer>
    </main>
  )
}

export default Home

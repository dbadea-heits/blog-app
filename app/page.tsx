import Homepage from "./homepage.mdx"

const Home = () => {
  return (
    <main className="mx-auto max-w-[1100px] px-12 pt-20 pb-24 max-[768px]:px-6 max-[768px]:pt-12 max-[768px]:pb-16">
      <section className="animate-drift markdown">
        <Homepage />
      </section>
    </main>
  )
}

export default Home

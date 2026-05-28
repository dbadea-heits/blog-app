import Link from "next/link"
import { getBlogs } from "../services/blogs"

const Blogs = async ({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>
}) => {
  const { filter } = await searchParams
  const blogs = await getBlogs()
  const filteredBlogs = filter
    ? blogs.filter((b) => b.title.toLowerCase().includes(filter.toLowerCase()))
    : blogs

  return (
    <div>
      <h2>Blogs</h2>
      <form action="/blogs" method="GET">
        <input
          type="text"
          name="filter"
          placeholder="search by title"
          defaultValue={filter || ""}
        />
        <button type="submit">search</button>
      </form>
      <ul>
        {filteredBlogs.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>
            {" by "}
            {blog.author}
            {blog.username && blog.userName && (
              <>
                {" ("}
                <Link
                  href={`/users/${blog.username}`}
                  className="text-blue-600 hover:underline"
                >
                  {blog.userName}
                </Link>
                {")"}
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
export default Blogs

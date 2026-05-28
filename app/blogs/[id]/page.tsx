import Link from "next/link"
import { notFound } from "next/navigation"
import { getBlogById } from "../../services/blogs"
import { likeBlogPost } from "../../actions/blogs"

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const blog = await getBlogById(Number(id))

  if (!blog) {
    notFound()
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <p>
        by <a href={blog.url}>{blog.author}</a>
      </p>
      {blog.username && blog.userName && (
        <p>
          added by{" "}
          <Link
            href={`/users/${blog.username}`}
            className="text-blue-600 hover:underline"
          >
            {blog.userName}
          </Link>
        </p>
      )}
      <p>likes: {blog.likes}</p>
      <form action={likeBlogPost}>
        <input type="hidden" name="id" value={blog.id} />
        <button type="submit">like</button>
      </form>
    </div>
  )
}

export default BlogPage

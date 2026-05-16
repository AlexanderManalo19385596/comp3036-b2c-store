import type { Post } from "@repo/db/data";

export function BlogListItem({ post }: { post: Post }) {
  return (
    <article
      key={post.id}
      className="border-b py-6"
      data-test-id={`blog-post-${post.id}`}
      style={{ color: "var(--text)" }}
    >
      <div>
      <a href={`/post/${post.urlId}`} className="font-bold">{post.title}</a>
      </div>
      <span>{post.category}</span>
      <span>{post.description}</span>
      <span>{post.date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</span>
      <img src={post.imageUrl} alt={post.title} className="rounded mt-3 w-full h-48 object-cover" style={{ width: "400px", height: "200px"}}/>
      <div className="flex gap-2 mt-2">
        {post.tags.split(",").map(tag => (
          <span key={tag} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm mr-1">#{tag.trim()}</span>
        ))}
      </div>
      <div className="flex gap-4 mt-2">
        <span>{post.likes} likes</span>
        <span>{post.views} views</span>
      </div>
    </article>
  );
}

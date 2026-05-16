import type { Post } from "@repo/db/data";
import { marked } from "marked";
import { LikeButton } from "./LikeButton";

export async function BlogDetail({ post }: { post: Post }) {
  const content = await marked.parse(post.content);

  return (
    <article data-test-id={`blog-post-${post.id}`} style={{ color: "var(--text)" }} className="max-w-3xl mx-auto">
      <a href={`/post/${post.urlId}`} className="text-3xl font-bold mb-2">
        {post.title}
      </a>
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-4 text-sm text-gray-500">
          <span>{post.category}</span>
          <span>{post.date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</span>
          <span>{post.views} views</span>
        </div>
        <LikeButton postId={post.id} initialLikes={post.likes} />
      </div>
      <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover rounded mb-4" />
      <div className="flex gap-2 mb-4">
        {post.tags.split(",").map((tag) => (
          <span key={tag} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">#{tag.trim()}</span>
        ))}
      </div>
      <div
        data-test-id="content-markdown"
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </article>
  );
}
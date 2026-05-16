import { client } from "@repo/db/client";
import { isLoggedIn } from "../utils/auth";
import { AdminPostList } from "./components/AdminPostList";
import { LoginForm } from "./components/LoginForm";
import { LogoutButton } from "./components/LogoutButton";

export default async function Home() {
  const loggedIn = await isLoggedIn();

  if (!loggedIn) {
    return <LoginForm />;
  }

  const posts = await client.db.post.findMany({
    orderBy: { date: "desc" },
  });

  return (
    <main>
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Admin of Full Stack Blog</h1>
          <div className="flex gap-4">
            <a href="/posts/create" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-colors">
              Create Post
            </a>
            <LogoutButton />
          </div>
        </div>
        <AdminPostList posts={posts} />
      </div>
    </main>
  );
}
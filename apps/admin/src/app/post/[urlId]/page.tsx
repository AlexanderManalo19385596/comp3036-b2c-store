import { client } from "@repo/db/client";
import { isLoggedIn } from "../../../utils/auth";
import { PostForm } from "../../components/PostForm";
import { redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ urlId: string }>;
}) {
  const { urlId } = await params;
  const loggedIn = await isLoggedIn();

    if (!loggedIn) {
    redirect("/");
  }

  const post = await client.db.post.findUnique({ where: { urlId } });

  if (!post) {
    return <div>Post not found</div>;
  }

  return <PostForm post={post} />;
}
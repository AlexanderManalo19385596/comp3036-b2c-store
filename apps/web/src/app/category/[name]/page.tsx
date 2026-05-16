import { AppLayout } from "@/components/Layout/AppLayout";
import { Main } from "@/components/Main";
import { client } from "@repo/db/client";
import { toUrlPath } from "@repo/utils/url";

export default async function Page({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;

  const posts = await client.db.post.findMany({
    where: { active: true },
  });

  const filteredPosts= posts.filter(
    (post) => toUrlPath(post.category) === name
  );

  return (
    <AppLayout>
      <Main posts={filteredPosts} />
    </AppLayout>
  );
}

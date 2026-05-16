import { AppLayout } from "@/components/Layout/AppLayout";
import { Main } from "@/components/Main";
import { client } from "@repo/db/client";

export default async function Page({
  params,
}: {
  params: Promise<{ year: string; month: string }>;
}) {

  const {year, month} = await params;

  const posts = await client.db.post.findMany({
    where: { active: true },
  });

  const filteredPosts = posts.filter(
    (post) => 
      post.date.getFullYear() === Number(year) &&
      post.date.getMonth() + 1 === Number(month),
    );

  return (
    <AppLayout>
      <Main posts = {filteredPosts} />
    </AppLayout>
  );
}

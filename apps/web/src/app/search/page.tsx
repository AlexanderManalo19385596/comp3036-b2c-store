import { AppLayout } from "@/components/Layout/AppLayout";
import { Main } from "@/components/Main";
import { client } from "@repo/db/client";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const { q } = await searchParams;

  const posts = await client.db.post.findMany({
    where: {
      active: true,
      OR: [
        { title: { contains: q } },
        { description: { contains: q } },
      ],
    },
  });

  return (
    <AppLayout query={q}>
      <Main posts={posts} />
    </AppLayout>
  );
}

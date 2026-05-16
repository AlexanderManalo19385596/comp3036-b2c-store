import { AppLayout } from "@/components/Layout/AppLayout";
import { BlogDetail } from "@/components/Blog/Detail";
import { client } from "@repo/db/client";

export default async function Page({
  params,
}: {
  params: Promise<{ urlId: string }>;
}) {
  const { urlId } = await params;

  const post = await client.db.post.findUnique({ where: { urlId } });

  if (!post) {
    return <AppLayout>Article not Found</AppLayout>
  }

  // increment views on detail page visit
  await client.db.post.update({
    where: { urlId },
    data: { views: { increment: 1 } },
  });

  return (
    <AppLayout>
      <BlogDetail post ={{ ...post, views: post.views + 1 }} />
    </AppLayout>
  )
}

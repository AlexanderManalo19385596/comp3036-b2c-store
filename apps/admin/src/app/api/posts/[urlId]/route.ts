import { NextRequest, NextResponse } from "next/server";
import { client } from "@repo/db/client";
import { isLoggedIn } from "../../../../utils/auth";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ urlId: string }> }
) {
  if (!(await isLoggedIn())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { urlId } = await params;
  const body = await req.json();

  const post = await client.db.post.update({
    where: { urlId },
    data: body,
  });

  return NextResponse.json(post);
}
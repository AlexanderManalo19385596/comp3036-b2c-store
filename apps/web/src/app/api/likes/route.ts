import { NextRequest, NextResponse } from "next/server";
import { client } from "@repo/db/client";

function getIP(req: NextRequest) {
  return req.headers.get("x-forwarded-for") ?? "unknown";
}

export async function GET(req: NextRequest) {
  const postId = Number(req.nextUrl.searchParams.get("postId"));
  const userIP = getIP(req);

  const like = await client.db.like.findUnique({
    where: { postId_userIP: { postId, userIP } },
  });

  return NextResponse.json({ liked: !!like });
}

export async function POST(req: NextRequest) {
  const { postId } = await req.json();
  const userIP = getIP(req);

  const existing = await client.db.like.findUnique({
    where: { postId_userIP: { postId, userIP } },
  });

  if (existing) {
    return NextResponse.json({ error: "Already liked" }, { status: 409 });
  }

  await client.db.like.create({ data: { postId, userIP } });
  const post = await client.db.post.update({
    where: { id: postId },
    data: { likes: { increment: 1 } },
  });

  return NextResponse.json({ likes: post.likes });
}

export async function DELETE(req: NextRequest) {
  const { postId } = await req.json();
  const userIP = getIP(req);

  const existing = await client.db.like.findUnique({
    where: { postId_userIP: { postId, userIP } },
  });

  if (!existing) {
    return NextResponse.json({ error: "Not liked" }, { status: 404 });
  }

  await client.db.like.delete({
    where: { postId_userIP: { postId, userIP } },
  });
  const post = await client.db.post.update({
    where: { id: postId },
    data: { likes: { decrement: 1 } },
  });

  return NextResponse.json({ likes: post.likes });
}
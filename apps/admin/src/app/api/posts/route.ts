import { NextRequest, NextResponse } from "next/server";
import { client } from "@repo/db/client";
import { isLoggedIn } from "../../../utils/auth";

export async function POST(req: NextRequest) {
  if (!(await isLoggedIn())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { title, description, content, tags, imageUrl, category } = await req.json();

  const urlId = title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

  const post = await client.db.post.create({
    data: {
      title,
      description,
      content,
      tags,
      imageUrl,
      category,
      urlId,
      active: true,
    },
  });

  return NextResponse.json(post);
}
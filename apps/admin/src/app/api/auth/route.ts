import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { env } from "@repo/env/admin";

export async function POST(req: NextRequest) {
  const { password } = await req.json();

  if (password !== env.PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = jwt.sign({ role: "admin" }, env.JWT_SECRET, {
    expiresIn: "7d",
  });

  const response = NextResponse.json({ ok: true });
  response.cookies.set("auth_token", token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.delete("auth_token");
  return response;
}
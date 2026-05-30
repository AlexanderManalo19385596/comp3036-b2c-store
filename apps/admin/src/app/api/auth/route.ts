import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "All fields required" },
        { status: 400 }
      );
    }

    if (
      email !== "admin@techstore.com" ||
      password !== process.env.PASSWORD
    ) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { email, role: "admin" },
      process.env.JWT_SECRET!,
      { expiresIn: "24h" }
    );

    return NextResponse.json({
      token,
      user: { email, name: "Admin", role: "admin" },
    });
  } catch {
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
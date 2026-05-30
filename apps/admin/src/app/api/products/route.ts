import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { client } from "@repo/db/client";

function isAdmin(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (!auth?.startsWith("Bearer ")) return false;
  try {
    const decoded = jwt.verify(auth.slice(7), process.env.JWT_SECRET!) as {
      role: string;
    };
    return decoded.role === "admin";
  } catch {
    return false;
  }
}

export async function GET(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const products = await client.db.product.findMany({
      orderBy: { id: "asc" },
    });
    return NextResponse.json(products);
  } catch {
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const { name, description, price, category, stock, image } =
      await req.json();

    if (!name || !description || !price || !category || !stock) {
      return NextResponse.json(
        { error: "All fields required" },
        { status: 400 }
      );
    }

    const product = await client.db.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        category,
        stock: parseInt(stock),
        image:
          image ||
          "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400",
      },
    });

    return NextResponse.json(product);
  } catch {
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
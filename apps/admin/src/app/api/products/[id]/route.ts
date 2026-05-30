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

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAdmin(req)) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const { id } = await params;
    const { name, description, price, category, stock, image } =
      await req.json();

    const product = await client.db.product.update({
      where: { id: Number(id) },
      data: {
        name,
        description,
        price: parseFloat(price),
        category,
        stock: parseInt(stock),
        image,
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

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAdmin(req)) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const { id } = await params;

    await client.db.orderItem.deleteMany({
      where: { productId: Number(id) },
    });

    await client.db.product.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
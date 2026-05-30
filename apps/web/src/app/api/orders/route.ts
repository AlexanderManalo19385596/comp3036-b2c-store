import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { client } from "@repo/db/client";

function getUserFromToken(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (!auth?.startsWith("Bearer ")) return null;
  try {
    return jwt.verify(auth.slice(7), process.env.JWT_SECRET!) as {
      userId: number;
      email: string;
      role: string;
    };
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest) {
  const user = getUserFromToken(req);
  if (!user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const orders = await client.db.order.findMany({
    where: { userId: user.userId },
    include: {
      items: {
        include: { product: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const formatted = orders.map((o) => ({
    id: `ORD-${String(o.id).padStart(3, "0")}`,
    date: o.createdAt.toLocaleDateString("en-AU", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
    status: o.status,
    total: o.total,
    items: o.items.map((i) => ({
      name: i.product.name,
      quantity: i.quantity,
      price: i.price,
    })),
  }));

  return NextResponse.json(formatted);
}

export async function POST(req: NextRequest) {
  const user = getUserFromToken(req);
  if (!user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const { items } = await req.json() as {
      items: { productId: number; quantity: number; price: number }[];
    };

    const total = items.reduce(
      (sum, i) => sum + i.price * i.quantity,
      0
    );

    const order = await client.db.order.create({
      data: {
        userId: user.userId,
        total,
        status: "Processing",
        items: { create: items },
      },
    });

    return NextResponse.json({
      id: `ORD-${String(order.id).padStart(3, "0")}`,
      total: order.total,
      status: order.status,
    });
  } catch {
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
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
    const orders = await client.db.order.findMany({
      include: {
        user: true,
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
      customer: o.user.name,
      email: o.user.email,
      items: o.items
        .map((i) => `${i.product.name}${i.quantity > 1 ? ` x${i.quantity}` : ""}`)
        .join(", "),
      total: o.total,
      status: o.status,
    }));

    return NextResponse.json(formatted);
  } catch {
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
import { NextResponse } from "next/server";
import { client } from "@repo/db/client";

export async function GET() {
  try {
    const products = await client.db.product.findMany({
      orderBy: { id: "asc" },
    });
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
import { client } from "./client.js";
import bcrypt from "bcryptjs";
import { USERS, PRODUCTS, ORDERS } from "./data.js";

export async function seed() {
  console.log("🌱 Seeding store data");

  // Clear old data (children first)
  await client.db.orderItem.deleteMany();
  await client.db.order.deleteMany();
  await client.db.product.deleteMany();
  await client.db.user.deleteMany();

  // Insert users (hash passwords)
  for (const user of USERS) {
    await client.db.user.create({
      data: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        password: await bcrypt.hash(user.password, 10),
      },
    });
  }

  // Insert products
  for (const product of PRODUCTS) {
    await client.db.product.create({ data: product });
  }

  // Insert orders with their items
  for (const order of ORDERS) {
    await client.db.order.create({
      data: {
        id: order.id,
        userId: order.userId,
        total: order.total,
        status: order.status,
        createdAt: order.createdAt,
        items: {
          create: order.items,
        },
      },
    });
  }

  console.log("✅ Seed complete");
}
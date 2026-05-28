import { sql } from "drizzle-orm";
import { db } from "./db/index.ts";
import { users, blogs } from "./db/schema.ts";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

async function setupData() {
  try {
    // Create a user
    const result = await db
      .insert(users)
      .values({
        username: "author",
        name: "Blog Author",
      })
      .returning();

    const userId = result[0].id;
    console.log(`Created user with ID: ${userId}`);

    // Update all existing blogs to assign to this user
    await db
      .update(blogs)
      .set({ userId })
      .where(sql`user_id IS NULL`);

    console.log("Updated existing blogs with user ID");
    console.log("Setup complete!");
  } catch (error) {
    console.error("Error:", error);
  }
}

setupData();

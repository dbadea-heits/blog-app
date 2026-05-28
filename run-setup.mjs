import postgres from "postgres";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const sql = postgres(process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL);

async function runSetup() {
  try {
    console.log("Creating users table if it doesn't exist...");
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username TEXT NOT NULL UNIQUE,
        name TEXT NOT NULL
      )
    `;
    console.log("✓ Users table ready");

    console.log("\nAdding user_id column to blogs if needed...");
    try {
      await sql`
        ALTER TABLE blogs
        ADD COLUMN user_id INTEGER REFERENCES users(id)
      `;
      console.log("✓ Added user_id column");
    } catch (e) {
      if (e.message.includes("already exists")) {
        console.log("✓ user_id column already exists");
      } else {
        throw e;
      }
    }

    // Create a user
    console.log("\nCreating user...");
    const result = await sql`
      INSERT INTO users (username, name)
      VALUES ('author', 'Blog Author')
      RETURNING id, username, name
    `;

    const userId = result[0].id;
    console.log(`✓ Created user: ${result[0].name} (ID: ${userId})`);

    // Update existing blogs
    console.log("\nUpdating existing blogs...");
    const updated = await sql`
      UPDATE blogs
      SET user_id = ${userId}
      WHERE user_id IS NULL
      RETURNING id, title, user_id
    `;

    console.log(`✓ Updated ${updated.length} blogs with user ID ${userId}`);

    console.log("\n✅ Setup complete! You can now run: npm run build && npm run dev");

    await sql.end();
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

runSetup();

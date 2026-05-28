import postgres from "postgres";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

dotenv.config({ path: ".env.local" });

const sql = postgres(process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL);

async function applyMigration() {
  try {
    console.log("Adding passwordHash column to users table...");

    // Try to add the column with NOT NULL constraint after updating existing rows
    try {
      await sql`
        ALTER TABLE users
        ADD COLUMN password_hash text
      `;
      console.log("✓ Added password_hash column");
    } catch (e) {
      if (e.message.includes("already exists")) {
        console.log("✓ password_hash column already exists");
      } else {
        throw e;
      }
    }

    // Update existing user with a hashed password
    const hashedPassword = await bcrypt.hash("password", 10);

    console.log("\nUpdating existing user with password hash...");
    const result = await sql`
      UPDATE users
      SET password_hash = ${hashedPassword}
      WHERE password_hash IS NULL
      RETURNING id, username
    `;

    if (result.length > 0) {
      console.log("✓ Updated user with password hash");
      console.log("  Default password for existing user: 'password'");
    } else {
      console.log("ℹ No users needed password update");
    }

    console.log("\n✅ Migration applied successfully!");
    await sql.end();
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

applyMigration();

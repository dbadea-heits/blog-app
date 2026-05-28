import { migrate } from "drizzle-orm/neon-http/migrator";
import { drizzle } from "drizzle-orm/neon-http";
import process from "process";

const dbUrl = process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL;
const db = drizzle(dbUrl);

console.log("Applying migrations...");
await migrate(db, { migrationsFolder: "./drizzle" });
console.log("Migrations applied!");

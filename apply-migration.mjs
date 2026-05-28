import { migrate } from "drizzle-orm/neon-http/migrator";
import { drizzle } from "drizzle-orm/neon-http";
import process from "process";
import dotenv from "dotenv";

const envFile = process.env.NODE_ENV === "test" ? ".env.test" : ".env.local";
dotenv.config({ path: envFile });

const dbUrl = process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL;

if (!dbUrl) {
	throw new Error(
		`Missing DATABASE_URL or DATABASE_URL_UNPOOLED in ${envFile}`
	);
}

const db = drizzle(dbUrl);

console.log("Applying migrations...");
await migrate(db, { migrationsFolder: "./drizzle" });
console.log("Migrations applied!");

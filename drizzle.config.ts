import { defineConfig } from "drizzle-kit";
import { config } from "dotenv";
import { getEnv } from "@/lib/utils";
config({ path: ".env.local" });

export default defineConfig({
    schema: "./src/db/drizzle/schemas/index.ts",
    out: "./src/db/drizzle/migrations",
    dialect: "postgresql",
    dbCredentials: {
        url: getEnv("DATABASE_URL"),
    },
    verbose: true,
    strict: true,
});

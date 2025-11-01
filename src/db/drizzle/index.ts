import { getEnv } from "@/lib/utils";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

const sql = neon(getEnv("DATABASE_URL"));
export const db = drizzle({ client: sql });

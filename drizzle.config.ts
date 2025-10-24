import { defineConfig } from "drizzle-kit";

if (!process.env.DATABASE_URL) throw new Error("Missing DATABASE_URL");

export default defineConfig({
  schema: "./src/pkg/integrations/better-auth/lib/auth-schema.ts",
  out: "./drizzle/migrations",
  dialect: "postgresql", // <- required
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});

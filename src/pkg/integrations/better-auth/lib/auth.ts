import { betterAuth } from "better-auth";

import { drizzleAdapter } from "better-auth/adapters/drizzle";
import * as shema from "./auth-schema";
import { db } from "../../drizzle/server";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: shema.user,
      account: shema.account,
      session: shema.session,
      verification: shema.verification,
    },
  }),
  emailAndPassword: {
    enabled: true,
  },
});

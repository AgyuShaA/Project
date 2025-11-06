import { betterAuth } from "better-auth";

import { drizzleAdapter } from "better-auth/adapters/drizzle";
import * as shema from "./auth-schema";
import { db } from "../../drizzle/server";
import { createClient } from "redis";

const redis = createClient({ url: process.env.UPSTASH_REDIS_URL });

await redis.connect();

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
  
  	secondaryStorage: {
    useFor: ["session"],

		get: async (key) => {
			return await redis.get(key);
		},
		set: async (key, value, ttl) => {
      console.log(key,value,ttl)
			if (ttl) await redis.set(key, value, { EX: ttl });
			else await redis.set(key, value);
		},
		delete: async (key) => {
			await redis.del(key);
		}
	},

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
  google: {
      clientId: process.env.GCP_CLIENT_ID!,
      clientSecret: process.env.GCP_CLIENT_SECRET!,
    },
  },
});
